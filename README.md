# Choreo Non-Deterministic Build Failure — Reproduction

Reproduces the issue where Choreo builds fail with random "Rollup failed to resolve import" errors. Same code, same commit, but a different package fails each time.

## Root Cause

The Choreo-generated Dockerfile has a **duplicate `COPY . .`** after `npm install`:

```dockerfile
COPY . .          # Step 1: copy source + node_modules from build context
RUN npm install   # Step 2: install correct dependencies
COPY . .          # Step 3: BUG — overwrites node_modules with build context version!
RUN npm run build # Step 4: fails — node_modules is now corrupt/partial
```

## Reproduction

```bash
chmod +x reproduce.sh
./reproduce.sh        # runs 3 builds by default
./reproduce.sh 5      # or specify number of builds
```

The script:
1. Installs a full `node_modules` locally
2. Randomly deletes 3-5 packages (simulating stale build context)
3. Builds with `Dockerfile.buggy` — fails on random packages each time
4. Builds with `Dockerfile.fixed` — always succeeds

## Fix Options

**User-side (immediate):** Add a `.dockerignore`:
```
node_modules
```

**Platform-side (dp-cicd):** Update the Dockerfile template:
```dockerfile
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
```
