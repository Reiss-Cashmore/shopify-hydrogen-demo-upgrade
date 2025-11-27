#!/usr/bin/env node
import {Command} from 'commander';
import path from 'node:path';
import {NodeIO, Accessor, Primitive} from '@gltf-transform/core';

const io = new NodeIO();

const program = new Command()
  .name('add-rulers')
  .description('Insert X/Y/Z rulers into a GLB/GLTF model and export a GLB')
  .requiredOption('-i, --input <file>', 'input .glb/.gltf file')
  .requiredOption('-o, --output <file>', 'output .glb path')
  .option('--scale <number>', 'offset scale for rulers (relative to diagonal)', '0.05')
  .option('--up <axis>', 'up axis: Y (glTF default) or Z', 'Y');

async function main() {
  const opts = program.parse(process.argv).opts();
  const inputPath = path.resolve(opts.input);
  const outputPath = path.resolve(opts.output);
  const scale = Number(opts.scale);
  const upAxis = opts.up.toUpperCase();

  if (!Number.isFinite(scale) || scale <= 0) {
    throw new Error('Scale must be a positive number');
  }

  if (upAxis !== 'Y' && upAxis !== 'Z') {
    throw new Error('Up axis must be Y or Z');
  }

  const ext = path.extname(inputPath).toLowerCase();
  if (ext !== '.glb' && ext !== '.gltf') {
    throw new Error('Only .glb and .gltf inputs are supported in this demo.');
  }

  const document = await io.read(inputPath);
  const dimensions = addRulers(document, scale, upAxis);
  await io.write(outputPath, document);

  console.log('Rulers added successfully.');
  console.log(
    `Dimensions (model units): X=${dimensions.x.toFixed(3)}, Y=${dimensions.y.toFixed(3)}, Z=${dimensions.z.toFixed(3)}`,
  );
}

function addRulers(doc, offsetScale, upAxis = 'Y') {
  const {min, max} = computeBounds(doc);
  if (!min || !max) {
    throw new Error('Could not compute bounding box for the model.');
  }

  // Dimensions along each axis
  const sizeX = max[0] - min[0];
  const sizeY = max[1] - min[1];
  const sizeZ = max[2] - min[2];
  // Half-extents from center
  const halfX = (max[0] - min[0]) / 2;
  const halfY = (max[1] - min[1]) / 2;
  const halfZ = (max[2] - min[2]) / 2;

  const diag = Math.hypot(sizeX, sizeY, sizeZ) || 1;
  const offset = diag * offsetScale;
  const arrow = diag * 0.03;

  const dims = { x: sizeX, y: sizeY, z: sizeZ };
  const center = [
    (min[0] + max[0]) / 2,
    (min[1] + max[1]) / 2,
    (min[2] + max[2]) / 2,
  ];

  const positions = [];
  const colors = [];
  const indices = [];

  // Rulers configuration based on up axis
  // Y-up (glTF standard): X=width, Y=height, Z=depth
  // Z-up (some CAD exports): X=width, Z=height, Y=depth
  let rulers;

  if (upAxis === 'Z') {
    // Z-up: height is Z, depth is Y
    rulers = [
      {
        axis: 'x',
        end:   [center[0] + halfX + offset, center[2] - halfZ , center[1] - halfY - offset],
        start: [center[0] - halfX - offset, center[2] - halfZ , center[1] - halfY - offset],
        color: [1, 0.2, 0.2],
        arrowDirA: [0, arrow * 0.5, 0],
        arrowDirB: [0, -arrow * 0.5, 0],
        labelBasisX: [1, 0, 0],
        labelBasisY: [0, 0, 1],
        labelOffset: [0, 0, 2* -offset],
        dimension: dims.x,
      },
      {
        axis: 'y',
        start: [center[0] + halfX + offset, center[2] - halfZ , center[1] - halfY - offset],
        end:   [center[0] + halfX + offset, center[2] - halfZ , center[1] + halfY + offset],
        color: [0.2, 1, 0.2],
        arrowDirA: [arrow * 0.5, 0, 0],
        arrowDirB: [-arrow * 0.5, 0, 0],
        labelBasisX: [0, 0, -1],
        labelBasisY: [-1, 0, 0],
        labelOffset: [2*offset, 0, 0],
        dimension: dims.y,
      },
      {
        axis: 'z',
        start: [center[0] + halfX + offset, center[2] - halfZ, center[1] - halfY - offset],
        end:   [center[0] + halfX + offset, center[2] + halfZ, center[1] - halfY - offset ],
        color: [0.2, 0.5, 1],
        arrowDirA: [arrow * 0.4, 0, 0],
        arrowDirB: [-arrow * 0.4, 0, 0],
        labelBasisX: [0, 1, 0],
        labelBasisY: [1, 0, 0],
        labelOffset: [offset, 0, 0],
        dimension: dims.z,
      },
    ];
  } else {
    // Y-up (default): height is Y, depth is Z
    rulers = [
      {
        axis: 'x',
        start: [center[0] - halfX - offset, center[1] - halfY - offset, center[2] - halfZ],
        end:   [center[0] + halfX + offset, center[1] - halfY - offset, center[2] - halfZ],
        color: [1, 0.2, 0.2],
        arrowDirA: [0, 0, arrow * 0.5],
        arrowDirB: [0, 0, -arrow * 0.5],
        labelBasisX: [1, 0, 0],
        labelBasisY: [0, 0, 1],
        labelOffset: [0, 0, 2* -offset],
        dimension: dims.x,
      },
      {
        axis: 'y',
        start: [center[0] + halfX + offset, center[1] - halfY - offset, center[2] - halfZ],
        end:   [center[0] + halfX + offset, center[1] + halfY + offset, center[2] - halfZ],
        color: [0.2, 1, 0.2],
        arrowDirA: [arrow * 0.5, 0, 0],
        arrowDirB: [-arrow * 0.5, 0, 0],
        labelBasisX: [0, 1, 0],
        labelBasisY: [1, 0, 0],
        labelOffset: [offset, 0, 0],
        dimension: dims.y,
      },
      {
        axis: 'z',
        start: [center[0] + halfX + offset, center[1] - halfY - offset, center[2] + halfZ],
        end:   [center[0] + halfX + offset, center[1] - halfY - offset, center[2] - halfZ],
        color: [0.2, 0.5, 1],
        arrowDirA: [0, arrow * 0.4, 0],
        arrowDirB: [0, -arrow * 0.4, 0],
        labelBasisX: [0, 0, -1],
        labelBasisY: [-1, 0, 0],
        labelOffset: [offset, 0, 0],
        dimension: dims.z,
      },
    ];
  }

  for (const ruler of rulers) {
    const lineMid = scaleVec(addVec(ruler.start, ruler.end), 0.5);
    let outwardNormal = normalize(subtractVec(lineMid, center));
    if (!isFiniteVector(outwardNormal)) {
      outwardNormal = DEFAULT_AXIS_NORMALS[ruler.axis] ?? [0, 0, 1];
    }

    pushRibbon(
      ruler.start,
      ruler.end,
      outwardNormal,
      diag * 0.005,
      ruler.color,
      positions,
      colors,
      indices,
    );

    const tipAEnd = addVec(ruler.end, ruler.arrowDirA);
    const tipBEnd = addVec(ruler.end, ruler.arrowDirB);
    const tailAEnd = addVec(ruler.start, negate(ruler.arrowDirA));
    const tailBEnd = addVec(ruler.start, negate(ruler.arrowDirB));

    pushRibbon(ruler.end, tipAEnd, outwardNormal, diag * 0.004, ruler.color, positions, colors, indices);
    pushRibbon(ruler.end, tipBEnd, outwardNormal, diag * 0.004, ruler.color, positions, colors, indices);
    pushRibbon(ruler.start, tailAEnd, outwardNormal, diag * 0.004, ruler.color, positions, colors, indices);
    pushRibbon(ruler.start, tailBEnd, outwardNormal, diag * 0.004, ruler.color, positions, colors, indices);

    const midpoint = [
      (ruler.start[0] + ruler.end[0]) / 2 + ruler.labelOffset[0],
      (ruler.start[1] + ruler.end[1]) / 2 + ruler.labelOffset[1],
      (ruler.start[2] + ruler.end[2]) / 2 + ruler.labelOffset[2],
    ];
    const textScale = diag * 0.03;
    addLabel(
      `${ruler.dimension.toFixed(1)}mm`,
      midpoint,
      ruler.labelBasisX,
      ruler.labelBasisY,
      textScale,
      ruler.color,
      positions,
      colors,
      indices,
      {flipX: ruler.axis === 'x'},
    );
  }

  const buffer = doc.getRoot().listBuffers()[0] ?? doc.createBuffer('RulerBuffer');
  const positionAccessor = doc
    .createAccessor('RulerPositions')
    .setType(Accessor.Type.VEC3)
    .setBuffer(buffer)
    .setArray(new Float32Array(positions));
  const colorAccessor = doc
    .createAccessor('RulerColors')
    .setType(Accessor.Type.VEC3)
    .setBuffer(buffer)
    .setArray(new Float32Array(colors));

  const indexAccessor = doc
    .createAccessor('RulerIndices')
    .setType(Accessor.Type.SCALAR)
    .setBuffer(buffer)
    .setArray(
      indices.length > 65535 ? new Uint32Array(indices) : new Uint16Array(indices),
    );

  const material = doc
    .createMaterial('RulerMaterial')
    .setBaseColorFactor([1, 1, 1, 1])
    .setMetallicFactor(0)
    .setRoughnessFactor(0.3)
    .setDoubleSided(true);

  const primitive = doc
    .createPrimitive()
    .setMode(Primitive.Mode.TRIANGLES)
    .setAttribute('POSITION', positionAccessor)
    .setAttribute('COLOR_0', colorAccessor)
    .setIndices(indexAccessor)
    .setMaterial(material);

  const mesh = doc.createMesh('RulersMesh').addPrimitive(primitive);
  const node = doc.createNode('Rulers').setMesh(mesh).setExtras({dimensions: dims});

  const scene = doc.getRoot().listScenes()[0] ?? doc.createScene('Scene');
  scene.addChild(node);

  return dims;
}

function addVec(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function negate(vec) {
  return vec.map((v) => -v);
}

function addLabel(
  text,
  origin,
  basisX,
  basisY,
  scale,
  color,
  positions,
  colors,
  indices,
  options = {},
) {
  const upperText = [...text.toUpperCase()];
  const widths = upperText.map((char) => (CHAR_WIDTHS[char] ?? 1) + CHAR_SPACING);
  const totalWidth = widths.reduce((sum, value) => sum + value, 0);
  let cursor = -totalWidth / 2;
  const scaleX = scale;
  const scaleY = scale * 0.6;
  const strokeWidth = scale * 0.14;

  for (const char of upperText) {
    const strokes = CHAR_STROKES[char];
    const charWidth = CHAR_WIDTHS[char] ?? 1;

    if (!strokes) {
      cursor += charWidth + CHAR_SPACING;
      continue;
    }

    for (const stroke of strokes) {
      const flipX = Boolean(options && options.flipX);
      const baseStartX = stroke[0][0] + cursor;
      const baseEndX = stroke[1][0] + cursor;
      const start2D = [flipX ? -baseStartX : baseStartX, stroke[0][1]];
      const end2D = [flipX ? -baseEndX : baseEndX, stroke[1][1]];

      pushLabelStroke(
        start2D,
        end2D,
        origin,
        basisX,
        basisY,
        scaleX,
        scaleY,
        strokeWidth,
        color,
        positions,
        colors,
        indices,
      );
    }

    cursor += charWidth + CHAR_SPACING;
  }
}

function pushLabelStroke(
  start,
  end,
  origin,
  basisX,
  basisY,
  scaleX,
  scaleY,
  strokeWidth,
  color,
  positions,
  colors,
  indices,
) {
  const dir2D = [end[0] - start[0], end[1] - start[1]];
  const len = Math.hypot(dir2D[0], dir2D[1]);
  if (len < 1e-5) return;
  const dirNorm = [dir2D[0] / len, dir2D[1] / len];
  const perp2D = [-dirNorm[1], dirNorm[0]];

  const startWorld = toWorld(start, origin, basisX, basisY, scaleX, scaleY);
  const endWorld = toWorld(end, origin, basisX, basisY, scaleX, scaleY);

  const perpWorld = normalize(
    addVec(scaleVec(basisX, perp2D[0] * scaleX), scaleVec(basisY, perp2D[1] * scaleY)),
  );

  const offset = scaleVec(perpWorld, strokeWidth / 2);
  const a = addVec(startWorld, offset);
  const b = subtractVec(startWorld, offset);
  const c = subtractVec(endWorld, offset);
  const d = addVec(endWorld, offset);

  const baseIndex = positions.length / 3;
  positions.push(...a, ...b, ...c, ...d);
  colors.push(...color, ...color, ...color, ...color);
  indices.push(baseIndex, baseIndex + 1, baseIndex + 2, baseIndex, baseIndex + 2, baseIndex + 3);
}

function toWorld(point, origin, basisX, basisY, scaleX, scaleY) {
  return addVec(
    origin,
    addVec(scaleVec(basisX, point[0] * scaleX), scaleVec(basisY, point[1] * scaleY)),
  );
}

function pushRibbon(start, end, normal, thickness, color, positions, colors, indices) {
  const dir = subtractVec(end, start);
  const len = Math.hypot(dir[0], dir[1], dir[2]);
  if (len < 1e-5) return;
  let n = normal && isFiniteVector(normal) ? normalize(normal) : [0, 0, 1];
  const offset = scaleVec(n, thickness);

  const a = addVec(start, offset);
  const b = subtractVec(start, offset);
  const c = subtractVec(end, offset);
  const d = addVec(end, offset);

  const baseIndex = positions.length / 3;
  positions.push(...a, ...b, ...c, ...d);
  colors.push(...color, ...color, ...color, ...color);
  indices.push(baseIndex, baseIndex + 1, baseIndex + 2, baseIndex, baseIndex + 2, baseIndex + 3);
}

function subtractVec(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function normalize(vec) {
  const len = Math.hypot(vec[0], vec[1], vec[2]) || 1;
  return [vec[0] / len, vec[1] / len, vec[2] / len];
}

function scaleVec(vec, scalar) {
  return [vec[0] * scalar, vec[1] * scalar, vec[2] * scalar];
}

function computeBounds(doc) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  const meshes = doc.getRoot().listMeshes();
  for (const mesh of meshes) {
    for (const prim of mesh.listPrimitives()) {
      const positionAccessor = prim.getAttribute('POSITION');
      if (!positionAccessor) continue;
      const array = positionAccessor.getArray();
      if (!array) continue;
      for (let i = 0; i < array.length; i += 3) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];
        if (x < min[0]) min[0] = x;
        if (y < min[1]) min[1] = y;
        if (z < min[2]) min[2] = z;
        if (x > max[0]) max[0] = x;
        if (y > max[1]) max[1] = y;
        if (z > max[2]) max[2] = z;
      }
    }
  }

  if (!Number.isFinite(min[0]) || !Number.isFinite(max[0])) {
    throw new Error('Model does not contain any POSITION attributes.');
  }

  return {min, max};
}

const CHAR_STROKES = {
  '0': [
    [[0, 0], [1, 0]],
    [[1, 0], [1, 2]],
    [[1, 2], [0, 2]],
    [[0, 2], [0, 0]],
  ],
  '1': [
    [[0.5, 0], [0.5, 2]],
  ],
  '2': [
    [[0, 2], [1, 2]],
    [[1, 2], [1, 1]],
    [[1, 1], [0, 0]],
    [[0, 0], [1, 0]],
  ],
  '3': [
    [[0, 2], [1, 2]],
    [[1, 2], [1, 0]],
    [[0, 1], [1, 1]],
    [[0, 0], [1, 0]],
  ],
  '4': [
    [[0, 2], [0, 1]],
    [[0, 1], [1, 1]],
    [[1, 2], [1, 0]],
  ],
  '5': [
    [[1, 2], [0, 2]],
    [[0, 2], [0, 1]],
    [[0, 1], [1, 1]],
    [[1, 1], [1, 0]],
    [[1, 0], [0, 0]],
  ],
  '6': [
    [[1, 2], [0, 2]],
    [[0, 2], [0, 0]],
    [[0, 0], [1, 0]],
    [[1, 0], [1, 1]],
    [[1, 1], [0, 1]],
  ],
  '7': [
    [[0, 2], [1, 2]],
    [[1, 2], [0.2, 0]],
  ],
  '8': [
    [[0, 0], [1, 0]],
    [[1, 0], [1, 2]],
    [[1, 2], [0, 2]],
    [[0, 2], [0, 0]],
    [[0, 1], [1, 1]],
  ],
  '9': [
    [[0, 0], [1, 0]],
    [[1, 0], [1, 2]],
    [[1, 2], [0, 2]],
    [[0, 2], [0, 1]],
    [[0, 1], [1, 1]],
  ],
  '.': [
    [[0.4, 0], [0.6, 0]],
  ],
  'M': [
    [[0, 0], [0, 2]],
    [[0, 2], [0.5, 1]],
    [[0.5, 1], [1, 2]],
    [[1, 2], [1, 0]],
  ],
};

const CHAR_WIDTHS = {
  '0': 1,
  '1': 0.7,
  '2': 1,
  '3': 1,
  '4': 1,
  '5': 1,
  '6': 1,
  '7': 1,
  '8': 1,
  '9': 1,
  '.': 0.5,
  M: 1.4,
};

const CHAR_SPACING = 0.35;

const DEFAULT_AXIS_NORMALS = {
  x: [0, 0, 1],
  y: [0, 0, 1],
  z: [1, 0, 0],
};

function isFiniteVector(vec) {
  return Number.isFinite(vec[0]) && Number.isFinite(vec[1]) && Number.isFinite(vec[2]);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
