// The GPU easter egg's 3D scene: my ASRock Radeon RX 7900 XTX Phantom Gaming OC,
// built from primitives (no model file to download). Real proportions: 330 x
// 140 x 57.6 mm (1 unit = 1 cm), three fans with the middle one spinning the
// other way, gunmetal accents on a black shroud, an RGB bar and the lit
// PHANTOM GAMING panel on the top edge, three 8-pin plugs, fins and heatpipes
// you can see past the fans, a metal backplate and the I/O bracket.
//
// Loaded only when the egg opens (components/GpuEgg.jsx imports it on demand),
// so three.js costs nothing on a normal visit. mount() returns a small API and
// dispose() frees every GPU resource.
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const L = 33; // length
const H = 14; // height
const FAN_X = [-10.6, 0, 10.6];
const FAN_R = 4.7;

const RGB_MODES = {
  phantom: null,
  rainbow: null,
  ember: new THREE.Color("#ff5a36"),
  ice: new THREE.Color("#dff3ff"),
  off: new THREE.Color("#000000"),
};
const FAN_SPEEDS = { off: 0, game: 10, max: 34 }; // rad/s

// a rounded rectangle with two corners cut at an angle (the shroud's outline)
function shroudShape(w, h, cut, r) {
  const s = new THREE.Shape();
  const x0 = -w / 2;
  const y0 = -h / 2;
  s.moveTo(x0 + r, y0);
  s.lineTo(x0 + w - cut, y0);
  s.lineTo(x0 + w, y0 + cut);
  s.lineTo(x0 + w, y0 + h - r);
  s.quadraticCurveTo(x0 + w, y0 + h, x0 + w - r, y0 + h);
  s.lineTo(x0 + cut, y0 + h);
  s.lineTo(x0, y0 + h - cut);
  s.lineTo(x0, y0 + r);
  s.quadraticCurveTo(x0, y0, x0 + r, y0);
  return s;
}

function textTexture(lines, { w = 1024, h = 256, color = "#fff", bg = null, font = "800 120px system-ui, sans-serif" } = {}) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (bg) {
    g.fillStyle = bg;
    g.fillRect(0, 0, w, h);
  }
  g.fillStyle = color;
  g.textAlign = "center";
  g.textBaseline = "middle";
  lines.forEach(([text, f, y]) => {
    g.font = f || font;
    g.fillText(text, w / 2, y ?? h / 2);
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function radialTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  grad.addColorStop(0, "rgba(0,0,0,0.55)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

// fan hub caps, as on the card: red with the PG mark on the outer fans, dark
// with a silver ring and the maker's name on the middle one
function hubTexture(middle) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(110, 100, 10, 128, 128, 128);
  if (middle) {
    grad.addColorStop(0, "#2a2c31");
    grad.addColorStop(1, "#0d0e10");
  } else {
    grad.addColorStop(0, "#e2283d");
    grad.addColorStop(1, "#8e0c1c");
  }
  g.fillStyle = grad;
  g.beginPath();
  g.arc(128, 128, 128, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "#c9ccd2";
  g.lineWidth = 12;
  g.beginPath();
  g.arc(128, 128, 116, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = "#ffffff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  if (middle) {
    g.font = "italic 800 58px system-ui, sans-serif";
    g.fillText("ASRock", 128, 132);
  } else {
    g.font = "italic 900 118px system-ui, sans-serif";
    g.fillText("PG", 124, 134);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function blade() {
  // a curved, swept blade, root at the hub, wider at the tip
  const s = new THREE.Shape();
  s.moveTo(0.15, 1.1);
  s.bezierCurveTo(0.9, 2.0, 1.5, 3.2, 1.2, 4.35);
  s.bezierCurveTo(0.4, 4.5, -0.6, 4.35, -1.25, 4.05);
  s.bezierCurveTo(-0.6, 3.1, -0.45, 2.0, -0.45, 1.15);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1, curveSegments: 16 });
  g.translate(0, 0, -0.04);
  return g;
}

export function mount(el, { reducedMotion = false, inline = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null; // no WebGL: the caller shows a note instead
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, inline ? 1.75 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute("aria-hidden", "true");
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04).texture;
  scene.environment = env;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 300);
  const HOME = new THREE.Vector3(22, 12, 60);
  camera.position.copy(HOME);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 20;
  controls.maxDistance = 140;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = inline ? 0.6 : 0.9;
  controls.target.set(0, inline ? 0.6 : 1.5, 0);
  if (inline) {
    // on the page: orbit in every direction with a mouse (over the top, underneath,
    // all the way round), never zoom (the wheel keeps scrolling the page), and on
    // touch screens vertical swipes still scroll while sideways ones spin it
    controls.enableZoom = false;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = 2.75;
    controls.rotateSpeed = 0.9;
    if (matchMedia("(pointer: coarse)").matches) renderer.domElement.style.touchAction = "pan-y";
  }
  controls.addEventListener("start", () => (controls.autoRotate = false));

  // --- materials ---
  const textures = [];
  const M = {
    shroud: new THREE.MeshPhysicalMaterial({ color: "#121316", metalness: 0.35, roughness: 0.5, clearcoat: 0.35, clearcoatRoughness: 0.4 }),
    gun: new THREE.MeshStandardMaterial({ color: "#8a8f97", metalness: 1, roughness: 0.3 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: "#1c1d21", metalness: 0.85, roughness: 0.42 }),
    fin: new THREE.MeshStandardMaterial({ color: "#b8bdc4", metalness: 1, roughness: 0.28 }),
    pipe: new THREE.MeshStandardMaterial({ color: "#d8dadf", metalness: 1, roughness: 0.18 }),
    pcb: new THREE.MeshStandardMaterial({ color: "#0f1512", roughness: 0.75 }),
    gold: new THREE.MeshStandardMaterial({ color: "#d9aa4f", metalness: 1, roughness: 0.25 }),
    fan: new THREE.MeshStandardMaterial({ color: "#0b0b0d", metalness: 0.1, roughness: 0.55 }),
    plug: new THREE.MeshStandardMaterial({ color: "#0d0d0e", roughness: 0.6 }),
    bracket: new THREE.MeshStandardMaterial({ color: "#c9ccd2", metalness: 1, roughness: 0.32 }),
    // RGB stays saturated: emissive, outside the tone mapper
    rgb: new THREE.MeshStandardMaterial({ color: "#000000", emissive: "#ff5a36", emissiveIntensity: 1, toneMapped: false }),
  };

  const halos = [];
  const card = new THREE.Group();
  scene.add(card);
  const add = (geo, mat, x = 0, y = 0, z = 0, parent = card) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  // --- shroud (front, fans side = +z) with three fan holes ---
  const outline = shroudShape(L, H - 1, 1.6, 0.7);
  FAN_X.forEach((x) => {
    const hole = new THREE.Path();
    hole.absarc(x, -0.2, FAN_R + 0.15, 0, Math.PI * 2, true);
    outline.holes.push(hole);
  });
  const shroudGeo = new THREE.ExtrudeGeometry(outline, { depth: 0.9, bevelEnabled: true, bevelThickness: 0.18, bevelSize: 0.18, bevelSegments: 3, curveSegments: 64 });
  add(shroudGeo, M.shroud, 0, 0.3, 1.75);
  // side walls of the shroud (top and bottom lips)
  add(new THREE.BoxGeometry(L - 1.2, 0.35, 1.3), M.shroud, 0, 6.85, 2.05);
  add(new THREE.BoxGeometry(L - 1.2, 0.35, 1.3), M.shroud, 0, -6.25, 2.05);

  // gunmetal rings around the fans and slanted accent plates between them
  FAN_X.forEach((x) => {
    const ring = add(new THREE.TorusGeometry(FAN_R + 0.2, 0.16, 16, 96), M.gun, x, 0.1, 2.88);
    ring.scale.z = 0.6;
  });
  const accent = new THREE.Shape();
  accent.moveTo(-0.35, -5.4);
  accent.lineTo(0.55, -5.4);
  accent.lineTo(1.25, 5.4);
  accent.lineTo(0.35, 5.4);
  accent.closePath();
  const accentGeo = new THREE.ExtrudeGeometry(accent, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 1 });
  add(accentGeo, M.gun, -5.8, 0.3, 2.83);
  // the striped trim along the bottom front edge
  for (let i = 0; i < 3; i++) add(new THREE.BoxGeometry(L - 6 - i * 3, 0.12, 0.1), M.gun, 1.5 + i * 1.5, -5.2 - i * 0.32, 2.86);
  // angled gunmetal caps at both ends of the shroud
  const cap = new THREE.Shape();
  cap.moveTo(0, -5.6);
  cap.lineTo(1.1, -4.6);
  cap.lineTo(1.1, 4.4);
  cap.lineTo(0, 5.6);
  cap.closePath();
  const capGeo = new THREE.ExtrudeGeometry(cap, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 1 });
  add(capGeo, M.gun, -16.05, 0.2, 2.82);
  add(capGeo, M.gun, 16.05, 0.2, 2.82).scale.x = -1;
  // the RGB sweep: a lit band that curves from the top edge down and around the
  // right fan (pink into orange on the stock lighting)
  const sweepCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2.6, 6.55, 2.93),
    new THREE.Vector3(4.6, 3.6, 2.93),
    new THREE.Vector3(5.45, 0.1, 2.93),
    new THREE.Vector3(6.6, -3.6, 2.93),
    new THREE.Vector3(9.4, -5.55, 2.93),
    new THREE.Vector3(13.2, -5.95, 2.93),
    new THREE.Vector3(15.6, -5.2, 2.93),
  ]);
  const SWEEP_SEG = 120;
  const sweepGeo = new THREE.TubeGeometry(sweepCurve, SWEEP_SEG, 0.17, 8, false);
  const sweepColors = new Float32Array(sweepGeo.attributes.position.count * 3);
  sweepGeo.setAttribute("color", new THREE.BufferAttribute(sweepColors, 3));
  const sweepMat = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });
  add(sweepGeo, sweepMat).scale.z = 1;
  // a soft halo around it, so it glows like real LEDs (no post-processing: two
  // wider, faint, additive tubes that share the sweep's colours)
  [
    [0.5, 0.2],
    [1.05, 0.065],
  ].forEach(([r, o]) => {
    const g = new THREE.TubeGeometry(sweepCurve, SWEEP_SEG, r, 8, false);
    g.setAttribute("color", sweepGeo.attributes.color);
    const m = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: o, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    halos.push(m);
    add(g, m);
  });
  // the RADEON lettering on the top front edge, over the first fan
  const radTex = textTexture([["RADEON", "italic 800 150px system-ui, sans-serif"]], { w: 1024, h: 200, color: "#9da3ab" });
  textures.push(radTex);
  add(new THREE.PlaneGeometry(5.2, 1.0), new THREE.MeshStandardMaterial({ map: radTex, transparent: true, metalness: 0.8, roughness: 0.35 }), -11.2, 5.85, 2.94);

  // --- fans ---
  const bladeGeo = blade();
  const fans = FAN_X.map((x, i) => {
    const spin = new THREE.Group();
    spin.position.set(x, 0.1, 2.1);
    card.add(spin);
    for (let k = 0; k < 11; k++) {
      const pivot = new THREE.Group();
      pivot.rotation.z = (k / 11) * Math.PI * 2;
      const b = new THREE.Mesh(bladeGeo, M.fan);
      b.rotation.y = 0.38;
      pivot.add(b);
      spin.add(pivot);
    }
    // the striped ring that ties the blade tips together
    spin.add(new THREE.Mesh(new THREE.TorusGeometry(4.25, 0.07, 8, 96), M.gun));
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.55, 48), M.shroud);
    hub.rotation.x = Math.PI / 2;
    spin.add(hub);
    const capTex = hubTexture(i === 1);
    textures.push(capTex);
    const cap = new THREE.Mesh(new THREE.CircleGeometry(1.15, 48), new THREE.MeshStandardMaterial({ map: capTex, metalness: 0.6, roughness: 0.4 }));
    cap.position.z = 0.29;
    spin.add(cap);
    // a faint disc that fills in as the blades blur at speed
    const blur = new THREE.Mesh(new THREE.RingGeometry(1.2, 4.35, 64), new THREE.MeshBasicMaterial({ color: "#050506", transparent: true, opacity: 0, depthWrite: false }));
    blur.position.z = 0.12;
    spin.add(blur);
    return { spin, blur, dir: i === 1 ? -1 : 1, speed: 0 };
  });

  // --- heatsink: fins, heatpipes, the PCB and the gold fingers ---
  const finCount = 118;
  const fins = new THREE.InstancedMesh(new THREE.BoxGeometry(0.06, 12.2, 3.8), M.fin, finCount);
  const mtx = new THREE.Matrix4();
  for (let i = 0; i < finCount; i++) {
    mtx.makeTranslation(-15.6 + (31.2 * i) / (finCount - 1), 0.3, -0.2);
    fins.setMatrixAt(i, mtx);
  }
  card.add(fins);
  [-1.4, -0.4, 0.6, 1.6].forEach((z, i) => {
    const p = add(new THREE.CylinderGeometry(0.3, 0.3, 30 - i, 24), M.pipe, -0.5, 6.55, z);
    p.rotation.z = Math.PI / 2;
  });
  add(new THREE.BoxGeometry(30.6, 12.0, 0.16), M.pcb, 0.4, -0.2, -2.45);
  add(new THREE.BoxGeometry(8.4, 0.95, 0.17), M.gold, -8.6, -6.55, -2.45);

  // --- top edge: the lit PHANTOM GAMING panel and three 8-pin plugs ---
  const logoTex = textTexture([["PHANTOM GAMING", "italic 900 118px system-ui, sans-serif"]], { w: 1400, h: 200 });
  textures.push(logoTex);
  const panel = add(new THREE.BoxGeometry(13, 0.4, 3.6), M.shroud, -5.5, 7.05, 0.6);
  const logoMat = new THREE.MeshStandardMaterial({ color: "#000000", emissive: "#ff5a36", emissiveMap: logoTex, emissiveIntensity: 1, toneMapped: false, transparent: true, alphaMap: logoTex });
  const logo = add(new THREE.PlaneGeometry(11.4, 1.63), logoMat, -5.5, 7.26, 0.6);
  logo.rotation.x = -Math.PI / 2;
  void panel;
  const plugTex = (() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 128;
    const g = c.getContext("2d");
    g.fillStyle = "#151517";
    g.fillRect(0, 0, 256, 128);
    g.fillStyle = "#020202";
    for (let r = 0; r < 2; r++) for (let k = 0; k < 4; k++) g.fillRect(22 + k * 58, 16 + r * 56, 40, 40);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  textures.push(plugTex);
  const plugTop = new THREE.MeshStandardMaterial({ map: plugTex, roughness: 0.7 });
  [9.3, 11.75, 14.2].forEach((x) => {
    const mats = [M.plug, M.plug, plugTop, M.plug, M.plug, M.plug];
    add(new THREE.BoxGeometry(2.2, 0.95, 1.05), mats, x, 7.1, 0.35);
  });

  // --- backplate (-z) with a flow-through window and its lettering ---
  const bp = shroudShape(L, H - 0.6, 1.6, 0.6);
  const win = new THREE.Path();
  win.moveTo(9.5, -3.2);
  win.lineTo(15.2, -3.2);
  win.lineTo(15.2, 4.6);
  win.lineTo(11.0, 4.6);
  win.closePath();
  bp.holes.push(win);
  const back = add(new THREE.ExtrudeGeometry(bp, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 1, curveSegments: 24 }), M.darkMetal, 0, 0.1, -2.92);
  void back;
  const bpTex = textTexture(
    [
      ["PHANTOM GAMING", "italic 900 112px system-ui, sans-serif", 108],
      ["RADEON RX 7900 XTX · 24 GB", "600 54px system-ui, sans-serif", 196],
    ],
    { w: 1400, h: 260, color: "#9aa0a8" },
  );
  textures.push(bpTex);
  const bpText = add(new THREE.PlaneGeometry(13, 2.4), new THREE.MeshStandardMaterial({ map: bpTex, transparent: true, metalness: 0.7, roughness: 0.35 }), -4.5, 0.6, -2.99);
  bpText.rotation.y = Math.PI;

  // --- I/O bracket at the left end: 1x HDMI + 3x DisplayPort ---
  add(new THREE.BoxGeometry(0.12, 12.4, 4.6), M.bracket, -16.75, -0.4, -0.5);
  [-3.2, -1.1, 1.0, 3.1].forEach((y, i) => add(new THREE.BoxGeometry(0.5, i === 0 ? 1.4 : 1.6, 0.62), M.plug, -16.95, y - 0.6, 0.4));

  // --- airflow: faint particles pushed up out of the fins, faster with the fans ---
  const AIR = 150;
  const airPos = new Float32Array(AIR * 3);
  const airSeed = new Float32Array(AIR);
  for (let i = 0; i < AIR; i++) {
    airPos[i * 3] = -15 + Math.random() * 30;
    airPos[i * 3 + 1] = 7 + Math.random() * 6;
    airPos[i * 3 + 2] = -1.6 + Math.random() * 3.2;
    airSeed[i] = 0.6 + Math.random() * 0.8;
  }
  const airGeo = new THREE.BufferGeometry();
  airGeo.setAttribute("position", new THREE.BufferAttribute(airPos, 3));
  const dot = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();
  textures.push(dot);
  const airMat = new THREE.PointsMaterial({ size: 0.42, map: dot, color: "#cfe9ff", transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
  card.add(new THREE.Points(airGeo, airMat));

  // --- lights and a soft contact shadow ---
  const key = new THREE.DirectionalLight("#ffffff", 1.4);
  key.position.set(12, 22, 18);
  scene.add(key);
  const rim = new THREE.DirectionalLight("#cfe3ff", 1.6);
  rim.position.set(-18, 6, -22);
  scene.add(rim);
  const glow = new THREE.PointLight("#ff5a36", 18, 22, 2);
  glow.position.set(-4, 9.5, 2);
  scene.add(glow);
  const shadowTex = radialTexture();
  textures.push(shadowTex);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(46, 16), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -9.5;
  scene.add(shadow);

  card.rotation.set(0.05, -0.35, 0);

  // --- state ---
  let rgbMode = "phantom";
  let fanMode = reducedMotion ? "off" : "game";
  let flipTarget = 0;
  let flip = 0;
  let intro = reducedMotion ? 0 : 1; // the entrance swing, 1 -> 0
  let hover = 0;
  let hoverTarget = 0;
  let rimAngle = 0;
  renderer.domElement.addEventListener("pointerenter", () => (hoverTarget = 1));
  renderer.domElement.addEventListener("pointerleave", () => (hoverTarget = 0));
  let scrollTarget = 0; // -1 (scene below the middle of the screen) .. 1 (above)
  let scrollNow = 0;
  let hue = 0;
  const tmp = new THREE.Color();

  const PINK = new THREE.Color("#ff2f7d");
  const ORANGE = new THREE.Color("#ff7a26");
  const segColor = new THREE.Color();
  function applyRgb(dt) {
    if (rgbMode === "rainbow") hue = (hue + dt * 0.12) % 1;
    const radial = 9; // radialSegments + 1
    for (let i = 0; i <= SWEEP_SEG; i++) {
      const t = i / SWEEP_SEG;
      if (rgbMode === "phantom") segColor.copy(PINK).lerp(ORANGE, t);
      else if (rgbMode === "rainbow") segColor.setHSL((hue + t * 0.45) % 1, 0.95, 0.56);
      else segColor.copy(RGB_MODES[rgbMode]);
      for (let j = 0; j < radial; j++) segColor.toArray(sweepColors, (i * radial + j) * 3);
    }
    sweepGeo.attributes.color.needsUpdate = true;
    const c = rgbMode === "phantom" ? tmp.copy(PINK).lerp(ORANGE, 0.4) : rgbMode === "rainbow" ? tmp.setHSL(hue, 0.95, 0.56) : RGB_MODES[rgbMode];
    M.rgb.emissive.copy(c);
    logoMat.emissive.copy(c);
    glow.color.copy(c);
    glow.intensity = rgbMode === "off" ? 0 : 18;
    halos.forEach((m, k) => (m.visible = rgbMode !== "off"));
  }

  function resize() {
    const w = el.clientWidth || 1;
    const h = el.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (!touched) frameCard();
  }
  // back the camera off on narrow screens so the whole 33 cm card fits
  let touched = false;
  controls.addEventListener("start", () => (touched = true));
  function frameCard() {
    const fit = Math.min(2.4, Math.max(inline ? 0.8 : 1, (inline ? 1.4 : 1.35) / camera.aspect));
    const dir = HOME.clone().sub(controls.target).normalize();
    camera.position.copy(controls.target).add(dir.multiplyScalar(HOME.distanceTo(new THREE.Vector3(0, 1.5, 0)) * fit));
  }
  const ro = new ResizeObserver(resize);
  ro.observe(el);
  resize();

  let raf = 0;
  let active = true;
  let last = performance.now();
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (document.hidden || !active) {
      last = now;
      return;
    }
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    hover += (hoverTarget - hover) * Math.min(1, dt * 3);
    const target = FAN_SPEEDS[fanMode] * (1 + 0.8 * hover);
    fans.forEach((f) => {
      f.speed += (target - f.speed) * Math.min(1, dt * 1.6); // spin up and down smoothly
      f.spin.rotation.z += f.speed * f.dir * dt;
      // when they stop (0 dB), let the hubs settle with the logo upright
      if (target === 0 && f.speed < 0.6) {
        const turn = Math.PI * 2;
        const rest = Math.round(f.spin.rotation.z / turn) * turn;
        f.spin.rotation.z += (rest - f.spin.rotation.z) * Math.min(1, dt * 2.5);
      }
      f.blur.material.opacity = Math.min(0.55, f.speed / 60);
    });
    // airflow follows the average fan speed
    const fanAvg = fans.reduce((a, f) => a + f.speed, 0) / fans.length;
    airMat.opacity = Math.min(0.5, fanAvg / 40);
    if (fanAvg > 0.2) {
      for (let i = 0; i < AIR; i++) {
        airPos[i * 3 + 1] += dt * fanAvg * 0.16 * airSeed[i];
        airPos[i * 3] += dt * Math.sin(now / 900 + i) * 0.4;
        if (airPos[i * 3 + 1] > 13.5) {
          airPos[i * 3 + 1] = 7;
          airPos[i * 3] = -15 + Math.random() * 30;
        }
      }
      airGeo.attributes.position.needsUpdate = true;
    }
    // the rim light drifts round, so highlights travel across the metal
    rimAngle += dt * 0.35;
    rim.position.set(Math.cos(rimAngle) * 24, 8, Math.sin(rimAngle) * 24);
    // entrance: swing in and settle
    if (intro > 0) intro = Math.max(0, intro - dt / 1.6);
    const e = intro * intro * intro;
    card.position.y = -2.5 * e;
    card.scale.setScalar(1 - 0.08 * e);
    flip += (flipTarget - flip) * Math.min(1, dt * 4);
    scrollNow += (scrollTarget - scrollNow) * Math.min(1, dt * 5);
    card.rotation.y = -0.35 + flip + scrollNow * 0.7 - 1.5 * e;
    card.rotation.x = 0.05 + scrollNow * 0.32;
    applyRgb(dt);
    controls.update(dt);
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  const sph = new THREE.Spherical();
  return {
    fanModes: Object.keys(FAN_SPEEDS),
    rgbModes: Object.keys(RGB_MODES),
    get fan() {
      return fanMode;
    },
    get rgb() {
      return rgbMode;
    },
    setFan(m) {
      fanMode = m;
    },
    setRgb(m) {
      rgbMode = m;
    },
    setActive(v) {
      active = v;
    },
    // the inline view turns and tilts as the page scrolls past it
    setScroll(p) {
      scrollTarget = Math.max(-1, Math.min(1, p));
    },
    flip() {
      flipTarget = flipTarget ? 0 : Math.PI;
      return !!flipTarget;
    },
    reset() {
      flipTarget = 0;
      controls.target.set(0, 1.5, 0);
      touched = false;
      frameCard();
    },
    // keyboard: turn around the card and zoom
    nudge(dAz, dPol, zoom = 1) {
      controls.autoRotate = false;
      const off = camera.position.clone().sub(controls.target);
      sph.setFromVector3(off);
      sph.theta += dAz;
      sph.phi = Math.min(Math.PI - 0.15, Math.max(0.15, sph.phi + dPol));
      sph.radius = Math.min(controls.maxDistance, Math.max(controls.minDistance, sph.radius * zoom));
      camera.position.copy(controls.target).add(off.setFromSpherical(sph));
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        mats.forEach((m) => m.dispose());
      });
      Object.values(M).forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      env.dispose();
      pmrem.dispose();
      room.traverse?.((o) => o.geometry?.dispose());
      renderer.dispose();
      renderer.forceContextLoss?.();
      renderer.domElement.remove();
    },
  };
}
