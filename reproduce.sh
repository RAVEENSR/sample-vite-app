#!/bin/bash
#
# Reproduction script for Choreo non-deterministic build failures
# ================================================================
#
# This script demonstrates how the duplicate "COPY . ." pattern in
# the Choreo-generated Dockerfile causes random build failures when
# a partial/corrupt node_modules exists in the build context.
#
# What happens:
#   1. We run "npm install" locally to generate a real node_modules
#   2. We randomly delete some packages from node_modules (simulating
#      a stale/partial node_modules in the Git repo or build context)
#   3. We build with the buggy Dockerfile (duplicate COPY . .)
#      - npm install succeeds (STEP 5) but the second COPY . . (STEP 6)
#        overwrites node_modules with the corrupt build context version
#      - Vite/Rollup fails on a random missing package
#   4. We repeat multiple times to show different packages fail each time
#
# Prerequisites: Docker (or Podman) installed and running

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

DOCKER_CMD="docker"
if command -v podman &>/dev/null && ! command -v docker &>/dev/null; then
  DOCKER_CMD="podman"
fi

echo "=============================================="
echo "  Choreo Build Failure Reproduction"
echo "=============================================="
echo ""
echo "Using: $DOCKER_CMD"
echo ""

# Step 1: Generate a valid package-lock.json if not present
if [ ! -f "package-lock.json" ]; then
  echo "[Setup] Generating package-lock.json..."
  npm install --package-lock-only 2>/dev/null
  echo ""
fi

# Step 2: Install full node_modules locally
echo "[Setup] Installing full node_modules locally..."
rm -rf node_modules
npm install 2>/dev/null
echo ""

# Packages that the app imports (these are the ones that randomly fail)
PACKAGES=(
  "@radix-ui/react-avatar"
  "tailwind-merge"
  "@tanstack/react-table"
  "date-fns"
  "clsx"
  "class-variance-authority"
  "lucide-react"
  "@radix-ui/react-dialog"
  "@radix-ui/react-dropdown-menu"
)

NUM_BUILDS=${1:-3}
echo "Will run $NUM_BUILDS builds with the BUGGY Dockerfile..."
echo "(Each build randomly corrupts node_modules differently)"
echo ""

for i in $(seq 1 "$NUM_BUILDS"); do
  echo "=============================================="
  echo "  Build attempt $i / $NUM_BUILDS"
  echo "=============================================="

  # Step 3: Randomly delete 3-5 packages from node_modules
  # This simulates a stale/partial node_modules in the build context
  NUM_TO_DELETE=$((RANDOM % 3 + 3))
  SHUFFLED=($(printf '%s\n' "${PACKAGES[@]}" | sort -R))
  DELETED=()

  for j in $(seq 0 $((NUM_TO_DELETE - 1))); do
    PKG="${SHUFFLED[$j]}"
    PKG_PATH="node_modules/$PKG"
    if [ -d "$PKG_PATH" ]; then
      rm -rf "$PKG_PATH"
      DELETED+=("$PKG")
    fi
  done

  echo "  Deleted from node_modules: ${DELETED[*]}"
  echo ""

  # Step 4: Build with the buggy Dockerfile
  echo "  Building with Dockerfile.buggy..."
  BUILD_OUTPUT=$($DOCKER_CMD build --no-cache -f Dockerfile.buggy . 2>&1) || true

  # Check if build failed
  if echo "$BUILD_OUTPUT" | grep -q "Rollup failed to resolve import"; then
    FAILED_PKG=$(echo "$BUILD_OUTPUT" | grep "Rollup failed to resolve import" | sed 's/.*import "\(.*\)" from.*/\1/')
    echo "  RESULT: FAILED - Could not resolve: $FAILED_PKG"
  elif echo "$BUILD_OUTPUT" | grep -q "Build failed"; then
    echo "  RESULT: FAILED - Build error (see below)"
    echo "$BUILD_OUTPUT" | tail -5
  else
    echo "  RESULT: PASSED (the random deletion didn't hit a critical package)"
  fi
  echo ""

  # Restore node_modules for next iteration
  npm install 2>/dev/null
done

echo ""
echo "=============================================="
echo "  Now building with FIXED Dockerfile"
echo "=============================================="
echo ""

# Even with corrupt node_modules, the fixed Dockerfile works
# because it copies package.json first, runs npm install, then copies source
NUM_TO_DELETE=$((RANDOM % 3 + 3))
SHUFFLED=($(printf '%s\n' "${PACKAGES[@]}" | sort -R))
for j in $(seq 0 $((NUM_TO_DELETE - 1))); do
  PKG="${SHUFFLED[$j]}"
  rm -rf "node_modules/$PKG" 2>/dev/null || true
done

echo "  (node_modules is intentionally corrupted)"
echo "  Building with Dockerfile.fixed..."
BUILD_OUTPUT=$($DOCKER_CMD build --no-cache -f Dockerfile.fixed . 2>&1) || true

if echo "$BUILD_OUTPUT" | grep -q "Rollup failed to resolve import"; then
  echo "  RESULT: FAILED (unexpected!)"
else
  echo "  RESULT: PASSED - Fixed Dockerfile handles corrupt build context correctly"
fi

echo ""
echo "=============================================="
echo "  Conclusion"
echo "=============================================="
echo ""
echo "  The BUGGY Dockerfile (matching Choreo's pattern) fails because:"
echo "    1. COPY . .  → copies source + corrupt node_modules"
echo "    2. npm install → installs correct node_modules"
echo "    3. COPY . .  → OVERWRITES node_modules with corrupt version"
echo "    4. npm run build → fails on random missing package"
echo ""
echo "  The FIXED Dockerfile avoids this by:"
echo "    1. COPY package.json package-lock.json → only copies manifests"
echo "    2. npm install → installs correct node_modules"
echo "    3. COPY . .  → copies source (node_modules intact if .dockerignore used)"
echo ""
echo "  Fix options:"
echo "    - User: Add 'node_modules' to .dockerignore"
echo "    - Platform: Fix the Choreo buildpack Dockerfile template (dp-cicd)"
