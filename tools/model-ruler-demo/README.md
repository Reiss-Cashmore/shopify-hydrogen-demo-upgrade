# Model Ruler Demo

A minimal Node.js CLI that loads a GLB/GLTF file, computes its bounding box, injects three colored rulers (X, Y, Z) just outside the mesh, and writes a new GLB file.

The rulers are exported as glTF `LINES` primitives with vertex colors (red, green, blue). Dimension metadata (lengths in scene units) is stored on the `Rulers` node's `extras` and logged to the console for quick reference.

## Requirements

- Node.js 18+

## Installation

```bash
cd tools/model-ruler-demo
npm install
```

## Usage

```bash
node add-rulers.mjs --input ./path/to/model.glb --output ./path/to/model-with-rulers.glb
```

Options:

- `--input` / `-i`: path to a `.glb` or `.gltf` file.
- `--output` / `-o`: destination `.glb` path.
- `--scale <number>`: optional multiplier applied to the ruler offset (default `0.05`).

Example:

After running, open the generated GLB in any viewer (including Shopify's model-viewer) to see the rulers floating just outside the object.
