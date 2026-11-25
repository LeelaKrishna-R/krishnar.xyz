// My two homelab nodes in 3D for /homelab: Dell OptiPlex 7050 Micros at real
// size (18.2 x 17.8 x 3.6 cm, 1 unit = 1 cm), stacked on their feet with
// label-maker tape on the front, the perforated grille, power button, USB
// ports and headset jack, the round logo on the lid, and network + power
// cables out the back. Each power LED follows the live lab status (white =
// up, amber = down).
//
// Built from primitives, loaded only near the section (components/LabNodes3D.jsx).
// Nothing moves on its own except a slow turn when it first appears, so it
// draws only while something changes (a drag, the scroll tilt, that first
// turn) and otherwise stops completely.
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const W = 18.2;
const H = 3.6;
const D = 17.8;
const GAP = 1.1; // rubber feet between the two units

function canvasTexture(w, h, draw, srgb = true) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export function mount(el, { reducedMotion = false, status = {} } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  const coarse = matchMedia("(pointer: coarse)").matches;
  renderer.setPixelRatio(coarse ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(Math.max(window.devicePixelRatio || 1, 1.25), 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.opacity = "0";
  renderer.domElement.style.transition = "opacity 0.6s ease";
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  let env = null;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 300);
  const target = new THREE.Vector3(0, (H * 2 + GAP) / 2, 0);
  const HOME = new THREE.Vector3(17, 15, 34);
  camera.position.copy(HOME);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minPolarAngle = 0.25;
  controls.maxPolarAngle = 1.9;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.7;
  if (coarse) renderer.domElement.style.touchAction = "pan-y";

  const textures = [];
  const grain = canvasTexture(256, 256, (g) => {
    const img = g.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const n = 128 + (Math.random() - 0.5) * 60;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = n;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  }, false);
  grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  grain.repeat.set(4, 4);
  textures.push(grain);

  const M = {
    body: new THREE.MeshStandardMaterial({ color: "#141517", metalness: 0.25, roughness: 0.62, bumpMap: grain, bumpScale: 0.25, envMapIntensity: 0.6 }),
    lid: new THREE.MeshStandardMaterial({ color: "#1b1c1f", metalness: 0.35, roughness: 0.5, bumpMap: grain, bumpScale: 0.2, envMapIntensity: 0.7 }),
    port: new THREE.MeshStandardMaterial({ color: "#050506", roughness: 0.8 }),
    usb3: new THREE.MeshStandardMaterial({ color: "#2d63c8", roughness: 0.5 }),
    button: new THREE.MeshStandardMaterial({ color: "#2a2b2f", metalness: 0.6, roughness: 0.35 }),
    foot: new THREE.MeshStandardMaterial({ color: "#0b0b0c", roughness: 0.95 }),
    cable: new THREE.MeshStandardMaterial({ color: "#2f6fd6", roughness: 0.55 }),
    power: new THREE.MeshStandardMaterial({ color: "#0e0e10", roughness: 0.6 }),
  };

  // the front grille: rows of small round holes over the right two thirds
  const grille = canvasTexture(1024, 200, (g, w, h) => {
    g.fillStyle = "#1a1b1e";
    g.fillRect(0, 0, w, h);
    g.fillStyle = "#050506";
    for (let y = 22; y < h - 14; y += 16) {
      for (let x = 330 + ((y / 16) % 2) * 8; x < w - 18; x += 16) {
        g.beginPath();
        g.arc(x, y, 4.6, 0, Math.PI * 2);
        g.fill();
      }
    }
  });
  textures.push(grille);
  const logo = canvasTexture(256, 256, (g) => {
    g.clearRect(0, 0, 256, 256);
    g.strokeStyle = "#9aa0a8";
    g.lineWidth = 9;
    g.beginPath();
    g.arc(128, 128, 104, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = "#9aa0a8";
    g.font = "800 62px system-ui, sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("DELL", 128, 132);
  });
  textures.push(logo);
  const tape = (text) =>
    canvasTexture(512, 112, (g, w, h) => {
      g.fillStyle = "#f4f1e8";
      g.fillRect(0, 0, w, h);
      g.fillStyle = "#101010";
      g.font = "800 84px ui-monospace, Consolas, monospace";
      g.textBaseline = "middle";
      g.fillText(text, 34, h / 2 + 5);
    });

  const scene3 = new THREE.Group();
  scene.add(scene3);
  const add = (geo, mat, x, y, z, parent) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };

  const leds = [];
  const unit = (name, y) => {
    const g = new THREE.Group();
    g.position.y = y;
    scene3.add(g);
    add(new RoundedBoxGeometry(W, H, D, 4, 0.32), M.body, 0, H / 2, 0, g);
    // lid: a slightly lighter top skin with the round logo
    const lid = add(new THREE.PlaneGeometry(W - 0.8, D - 0.8), M.lid, 0, H + 0.005, 0, g);
    lid.rotation.x = -Math.PI / 2;
    const lg = add(new THREE.PlaneGeometry(3.6, 3.6), new THREE.MeshStandardMaterial({ map: logo, transparent: true, metalness: 0.8, roughness: 0.35 }), 0, H + 0.01, 0.4, g);
    lg.rotation.x = -Math.PI / 2;
    // front face (+z): grille, power button + LED, ports, headset jack, label tape
    const fz = D / 2 + 0.005;
    add(new THREE.PlaneGeometry(W - 0.7, H - 0.7), new THREE.MeshStandardMaterial({ map: grille, roughness: 0.7, metalness: 0.2 }), 0, H / 2, fz, g);
    const btn = add(new THREE.CylinderGeometry(0.42, 0.42, 0.14, 40), M.button, -W / 2 + 1.25, H / 2, fz + 0.06, g);
    btn.rotation.x = Math.PI / 2;
    const ledMat = new THREE.MeshBasicMaterial({ color: "#ffffff", toneMapped: false });
    const led = add(new THREE.TorusGeometry(0.46, 0.055, 10, 48), ledMat, -W / 2 + 1.25, H / 2, fz + 0.1, g);
    leds.push({ name, mat: ledMat, mesh: led });
    add(new THREE.CylinderGeometry(0.17, 0.17, 0.06, 24), M.port, -W / 2 + 2.6, H / 2, fz + 0.02, g).rotation.x = Math.PI / 2;
    [-W / 2 + 3.9, -W / 2 + 5.4].forEach((x) => {
      add(new THREE.BoxGeometry(1.25, 0.5, 0.08), M.port, x, H / 2, fz + 0.03, g);
      add(new THREE.BoxGeometry(1.0, 0.13, 0.09), M.usb3, x, H / 2 + 0.07, fz + 0.04, g);
    });
    const tapeTex = tape(name);
    textures.push(tapeTex);
    add(new THREE.PlaneGeometry(4.2, 0.92), new THREE.MeshStandardMaterial({ map: tapeTex, roughness: 0.6 }), W / 2 - 2.9, H / 2 + 0.5, fz + 0.02, g);
    // rubber feet
    [[-7.2, -7], [7.2, -7], [-7.2, 7], [7.2, 7]].forEach(([x, z]) => add(new THREE.CylinderGeometry(0.75, 0.85, GAP * 0.9, 24), M.foot, x, -GAP * 0.45, z, g));
    // network and power out the back, curving down off the shelf
    const cable = (x, mat, r) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x, H / 2, -D / 2),
        new THREE.Vector3(x, H / 2, -D / 2 - 2.2),
        new THREE.Vector3(x + 0.6, H / 2 - 2.4, -D / 2 - 3.4),
        new THREE.Vector3(x + 1.4, -y - 2.5, -D / 2 - 3.8),
      ]);
      add(new THREE.TubeGeometry(curve, 40, r, 10, false), mat, 0, 0, 0, g);
    };
    cable(-3.5, M.cable, 0.28);
    cable(5.5, M.power, 0.32);
    return g;
  };
  unit("node1", 0);
  unit("node2", H + GAP);

  // soft contact shadow
  const shadowTex = canvasTexture(256, 256, (g) => {
    const grad = g.createRadialGradient(128, 128, 10, 128, 128, 128);
    grad.addColorStop(0, "rgba(0,0,0,0.5)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
  }, false);
  textures.push(shadowTex);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(34, 30), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -GAP - 0.02;
  scene.add(shadow);

  const key = new THREE.DirectionalLight("#ffffff", 1.6);
  key.position.set(14, 24, 18);
  scene.add(key);
  const rim = new THREE.DirectionalLight("#d6e8ff", 1.2);
  rim.position.set(-20, 8, -18);
  scene.add(rim);

  const AMBER = new THREE.Color("#ffb347");
  const WHITE = new THREE.Color("#ffffff");
  function setStatus(s) {
    leds.forEach((l) => {
      const up = s?.[l.name] !== false;
      l.mat.color.copy(up ? WHITE : AMBER);
    });
    wake(800);
  }

  function resize() {
    const w = el.clientWidth || 1;
    const h = el.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const fit = Math.min(2.6, Math.max(1.12, 1.75 / camera.aspect));
    const dir = HOME.clone().sub(target).normalize();
    camera.position.copy(target).add(dir.multiplyScalar(HOME.distanceTo(target) * fit));
    wake(300);
  }

  // draw only while something changes: awake for a while after it appears,
  // while dragging, during the scroll tilt; asleep (no frames at all) otherwise
  let ready = false;
  let raf = 0;
  let awakeUntil = 0;
  let active = true;
  let dragging = false;
  let last = 0;
  let scrollTarget = 0;
  let scrollNow = 0;
  const loop = (now) => {
    raf = 0;
    if (!ready || !active || document.hidden) return;
    const minGap = coarse ? 1000 / 31 : 1000 / 61;
    if (now - last >= minGap) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      scrollNow += (scrollTarget - scrollNow) * Math.min(1, dt * 5);
      scene3.rotation.y = scrollNow * 0.5;
      controls.update(dt);
      renderer.render(scene, camera);
    }
    if (dragging || now < awakeUntil || Math.abs(scrollTarget - scrollNow) > 0.002) raf = requestAnimationFrame(loop);
    else controls.autoRotate = false; // settle: the first slow turn is over
  };
  function wake(ms) {
    awakeUntil = Math.max(awakeUntil, performance.now() + ms);
    if (!raf && ready && active) raf = requestAnimationFrame(loop);
  }
  controls.addEventListener("start", () => {
    dragging = true;
    controls.autoRotate = false;
    wake(1500);
  });
  controls.addEventListener("end", () => {
    dragging = false;
    wake(1500); // let the damping finish
  });

  const ro = new ResizeObserver(resize);
  ro.observe(el);
  resize();
  setStatus(status);

  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 50));
  new Promise((res) => idle(res, { timeout: 800 }))
    .then(() => {
      env = pmrem.fromScene(room, 0.04, 0.1, 100, { size: 128 }).texture;
      scene.environment = env;
      return renderer.compileAsync ? renderer.compileAsync(scene, camera) : null;
    })
    .catch(() => {})
    .then(() => {
      ready = true;
      renderer.domElement.style.opacity = "1";
      wake(reducedMotion ? 400 : 9000);
    });

  return {
    setStatus,
    setActive(v) {
      active = v;
      if (v) wake(600);
    },
    setScroll(p) {
      scrollTarget = Math.max(-1, Math.min(1, p));
      wake(200);
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
      env?.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss?.();
      renderer.domElement.remove();
    },
  };
}
