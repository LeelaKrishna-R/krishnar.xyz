// A little cartoon me: messy hair, big glasses, beard, the gold dot, the cream
// shirt and the thin chain from the portrait. Drawn by hand in SVG so it stays
// sharp, weighs nothing and can act: arms bend at the elbow, he blinks (now and
// then twice), his eyes follow the pointer (ScrollFx sets --lx/--ly), and each
// pose has its own loop with squash and stretch. Loops are transform-only and
// pause off-screen with the rest of the story (.scene:not(.on)).
//
//   pose: stand | wave | cheer | hold | type | raise | point | walk | zip | ko
//   prop: laptop | suitcase | headset | book | pencil | plane | map | paper | wrench
//   face: smile | grin | o | happy | talk | zip | ko (curious, then X-eyed with
//         stars once the NDA stamp lands: see #s-side in globals.css)
//   head: true draws only the head (for small avatars)

// Each arm is [shoulder, elbow] in degrees: 0 hangs straight down, positive
// swings toward the viewer's left. The elbow angle is relative to the upper arm.
const ARMS = {
  stand: [
    [12, 4],
    [-12, -4],
  ],
  zip: [
    [10, 2],
    [-10, -2],
  ],
  ko: [
    [16, 10],
    [-16, -10],
  ],
  wave: [
    [12, 4],
    [-110, -50],
  ],
  cheer: [
    [105, 40],
    [-105, -40],
  ],
  hold: [
    [8, -20],
    [-8, 20],
  ],
  type: [
    [-4, -62],
    [4, 62],
  ],
  raise: [
    [12, 4],
    [-70, -90],
  ],
  point: [
    [12, 4],
    [-82, -8],
  ],
  walk: [
    [8, 2],
    [-8, -2],
  ],
};

const UPPER = 12;
const HAND = 15;

const INK = "#2a1f18";
const SKIN = "#c2855a";
const SKIN_SH = "#a5694a";
const HAIR = "#1f1814";
const HAIR_HI = "#4a3c33";
const BEARD = "#2f241e";
const SHIRT = "#f2e9d7";
const SHIRT_SH = "#dccfb6";
const PANTS = "#5b4a3e";
const GOLD = "#f0b429";

const rad = (d) => (d * Math.PI) / 180;

// Upper arm and forearm, each its own group so CSS can move the shoulder and
// the elbow separately. A strip of sleeve drawn back over the elbow hides the
// seam where the two outlines meet.
function Arm({ side, x, angles: [a1, a2], grip, children }) {
  const px = Math.sin(rad(-a2)) * 4.5;
  const py = -Math.cos(rad(-a2)) * 4.5;
  return (
    <g className={`arm-${side}`} transform={`translate(${x} 101) rotate(${a1})`}>
      <g className="ch-up">
        <path d={`M0 0 V${UPPER}`} stroke={INK} strokeWidth="11.5" strokeLinecap="round" />
        <path d={`M0 0 V${UPPER}`} stroke={SHIRT} strokeWidth="8" strokeLinecap="round" />
        <g transform={`translate(0 ${UPPER}) rotate(${a2})`}>
          <g className="ch-fore">
            <path d="M0 0 V11" stroke={INK} strokeWidth="11.5" strokeLinecap="round" />
            <path d={`M0 0 L${px.toFixed(2)} ${py.toFixed(2)}`} stroke={SHIRT} strokeWidth="8" strokeLinecap="round" />
            <path d="M0 0 V11" stroke={SHIRT} strokeWidth="8" strokeLinecap="round" />
            <path d="M-4.2 10 H4.2" stroke={SHIRT_SH} strokeWidth="1.6" strokeLinecap="round" />
            {grip}
            <circle cx="0" cy={HAND} r="5.2" fill={SKIN} stroke={INK} strokeWidth="1.8" />
            {children}
          </g>
        </g>
      </g>
    </g>
  );
}

function Eye({ cx, closed }) {
  if (closed) return <path d={`M${cx - 4.5} 59.5 Q${cx} 54 ${cx + 4.5} 59.5`} stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />;
  return (
    <g className="ch-look">
      <ellipse cx={cx} cy="58" rx="4.6" ry="5.6" fill="#261a13" />
      <circle cx={cx + 1.7} cy="55.6" r="1.8" fill="#fff" />
      <circle cx={cx - 1.3} cy="60.3" r="0.8" fill="#fff" />
    </g>
  );
}

function Face({ face }) {
  const happy = face === "happy" || face === "grin";
  return (
    <g className="ch-face">
      {/* eyes: blink together; the pupils inside follow the pointer */}
      <g className="ch-eyes">
        <g className="ko-pre">
          <Eye cx={43} closed={happy || face === "zip"} />
          <Eye cx={77} closed={happy} />
        </g>
      </g>
      {face === "ko" ? (
        <g className="ko-post" stroke={INK} strokeWidth="2.8" strokeLinecap="round">
          <path d="M38.5 53.5 L47.5 62.5 M47.5 53.5 L38.5 62.5" />
          <path d="M72.5 53.5 L81.5 62.5 M81.5 53.5 L72.5 62.5" />
        </g>
      ) : null}
      {/* glasses */}
      <g fill="rgba(255,255,255,0.16)" stroke="#17110d" strokeWidth="3">
        <rect x="29.5" y="48" width="26" height="19.5" rx="7" />
        <rect x="64.5" y="48" width="26" height="19.5" rx="7" />
      </g>
      <path d="M55.5 55.5 Q60 52.5 64.5 55.5 M29.5 54 L24.5 53 M90.5 54 L95.5 53" stroke="#17110d" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M33 52 L37 50.5 M68 52 L72 50.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      {/* brows */}
      <g className="ch-brows">
        <path d="M33.5 46 Q42 41.5 50.5 44.5 M69.5 44.5 Q78 41.5 86.5 46" stroke={HAIR} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      </g>
      {/* nose */}
      <path d="M59 64.5 Q61.5 67.5 63.5 65" stroke={SKIN_SH} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* mouth sits on the beard */}
      {face === "grin" ? (
        <path d="M52.5 80.5 Q60 92 67.5 80.5 Z" fill="#7a3328" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      ) : face === "o" ? (
        <ellipse className="ch-o" cx="60" cy="83" rx="3.4" ry="4" fill="#7a3328" stroke={INK} strokeWidth="1.4" />
      ) : face === "talk" ? (
        <ellipse className="ch-talk" cx="60" cy="83" rx="5" ry="4.2" fill="#7a3328" stroke={INK} strokeWidth="1.4" />
      ) : face === "ko" ? (
        <g>
          <ellipse className="ko-pre" cx="60" cy="83" rx="3.2" ry="3.8" fill="#7a3328" stroke={INK} strokeWidth="1.4" />
          <path className="ko-post" d="M51.5 83 q2.1 -3 4.2 0 t4.2 0 t4.2 0 t4.2 0" stroke="#d39274" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </g>
      ) : face === "zip" ? (
        <g className="ch-zip">
          <path d="M51 82.5 H69" stroke="#c9ccd1" strokeWidth="3.6" strokeLinecap="round" />
          <path d="M53 81 v3 M56 81 v3 M59 81 v3 M62 81 v3 M65 81 v3" stroke={INK} strokeWidth="0.9" />
          <g className="ch-zip-tab">
            <rect x="67.5" y="82" width="4" height="7" rx="1.6" fill="#e9a934" stroke={INK} strokeWidth="1.2" />
          </g>
          <path className="ch-sweat" d="M88 34 Q91 39 88.5 41.5 Q85.5 41 86 37.5 Z" fill="#bfe3f2" stroke={INK} strokeWidth="1" />
        </g>
      ) : (
        <path d="M53 81 Q60 87.5 67 81" stroke="#d39274" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      )}
    </g>
  );
}

function Head({ face, headset }) {
  return (
    <g className="ch-head">
      <g className="ch-rim" fill="none" strokeWidth="5" strokeLinejoin="round">
        <path d="M27 66 C 22.5 58, 21.5 46, 24 37 C 22.5 31, 24 24, 29.5 20 C 29 14, 32 9.5, 37 8.5 L 34.5 2 C 41.5 4, 46 4.5, 50 7 C 53 2, 58.5 -0.5, 65 0.5 C 64 3.5, 65 5, 66.5 6.5 C 72.5 3, 80 4, 84.5 8.5 L 91.5 5.5 C 91.5 10, 92.5 13.5, 94.5 17 C 98.5 20.5, 99.5 27, 97.5 32.5 C 99.5 42, 98.5 56, 93 66 L 93 62 C 94 80, 79 97.5, 60 97.5 C 41 97.5, 26 80, 27 62 Z" />
        <ellipse cx="25.5" cy="61" rx="6" ry="8" />
        <ellipse cx="94.5" cy="61" rx="6" ry="8" />
      </g>
      {/* ears */}
      <ellipse cx="25.5" cy="61" rx="6" ry="8" fill={SKIN} stroke={INK} strokeWidth="2" />
      <ellipse cx="94.5" cy="61" rx="6" ry="8" fill={SKIN} stroke={INK} strokeWidth="2" />
      <path d="M26.5 57 Q23.5 61 26.5 65 M93.5 57 Q96.5 61 93.5 65" stroke={SKIN_SH} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* face */}
      <ellipse cx="60" cy="59" rx="34.5" ry="32.5" fill={SKIN} stroke={INK} strokeWidth="2.2" />
      {/* cheeks */}
      <ellipse cx="37" cy="70.5" rx="5" ry="2.6" fill="#e0785e" opacity="0.38" />
      <ellipse cx="83" cy="70.5" rx="5" ry="2.6" fill="#e0785e" opacity="0.38" />
      {/* beard + moustache */}
      <path
        d="M27 62 C 26 80, 41 97.5, 60 97.5 C 79 97.5, 94 80, 93 62 C 91.5 70, 87 76, 80.5 77.5 C 74 79, 68 75.5, 60 75.5 C 52 75.5, 46 79, 39.5 77.5 C 33 76, 28.5 70, 26.5 61 Z"
        fill={BEARD}
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M46.5 78.5 C 52 74.5, 68 74.5, 73.5 78.5 C 68 81, 52 81, 46.5 78.5 Z" fill={HAIR} />
      <path d="M44 92 l1 2 M52 95.5 l0.6 2 M68 95.5 l-0.6 2 M76 92 l-1 2" stroke={HAIR_HI} strokeWidth="1.3" strokeLinecap="round" />
      {/* hair */}
      <path
        d="M27 66 C 22.5 58, 21.5 46, 24 37 C 22.5 31, 24 24, 29.5 20 C 29 14, 32 9.5, 37 8.5 L 34.5 2 C 41.5 4, 46 4.5, 50 7 C 53 2, 58.5 -0.5, 65 0.5 C 64 3.5, 65 5, 66.5 6.5 C 72.5 3, 80 4, 84.5 8.5 L 91.5 5.5 C 91.5 10, 92.5 13.5, 94.5 17 C 98.5 20.5, 99.5 27, 97.5 32.5 C 99.5 42, 98.5 56, 93 66 C 92 58, 91 51, 89.5 45.5 C 86 44, 82 41, 79.5 36.5 C 76.5 40.5, 71.5 41.5, 66.5 41 C 65 38, 63.5 35.5, 61.5 33 C 57.5 38, 51.5 40.5, 45.5 40.5 C 44 39, 42.5 37.5, 41.5 35.5 C 37.5 39.5, 33.5 43, 31 48 C 30 56, 29 61, 27 66 Z"
        fill={HAIR}
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M37 15 C 43 12, 49 13, 53 16 M71 10 C 76 12, 80 15, 82 19 M49 27 C 53 25, 57 26, 59 29" stroke={HAIR_HI} strokeWidth="1.9" strokeLinecap="round" fill="none" />
      {/* the gold dot */}
      <circle cx="60.5" cy="41.5" r="2.3" fill={GOLD} stroke="#b98014" strokeWidth="0.8" />
      <Face face={face} />
      {headset ? (
        <g className="ch-headset">
          <path d="M22 60 C 20 22, 100 22, 98 60" stroke={INK} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M22 60 C 20 22, 100 22, 98 60" stroke="#e9a934" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="15.5" y="52" width="11" height="18" rx="5" fill="#e9a934" stroke={INK} strokeWidth="2" />
          <rect x="93.5" y="52" width="11" height="18" rx="5" fill="#e9a934" stroke={INK} strokeWidth="2" />
          <path d="M21 68 C 24 84, 34 88, 46 86" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <circle cx="47" cy="86" r="3.6" fill="#3a2c22" stroke={INK} strokeWidth="1.6" />
          <g className="ch-waves" stroke="#e9a934" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M14 82 Q10 88 14 94" />
            <path d="M8 79 Q2 88 8 97" />
          </g>
        </g>
      ) : null}
    </g>
  );
}

function Body({ walk }) {
  return (
    <g className="ch-body">
      {/* legs */}
      <g className={walk ? "ch-leg ch-leg-l" : "ch-leg"}>
        <rect x="45" y="128" width="12.5" height="25" rx="4" fill={PANTS} stroke={INK} strokeWidth="2" />
        <path d="M43 156.5 C 43 151, 59 151, 59.5 156.5 C 59.5 159.5, 43 159.5, 43 156.5 Z" fill="#fffaf0" stroke={INK} strokeWidth="2" />
      </g>
      <g className={walk ? "ch-leg ch-leg-r" : "ch-leg"}>
        <rect x="62.5" y="128" width="12.5" height="25" rx="4" fill={PANTS} stroke={INK} strokeWidth="2" />
        <path d="M60.5 156.5 C 61 151, 77 151, 77 156.5 C 77 159.5, 60.5 159.5, 60.5 156.5 Z" fill="#fffaf0" stroke={INK} strokeWidth="2" />
      </g>
      {/* neck + shirt */}
      <rect x="53" y="86" width="14" height="14" fill={SKIN_SH} />
      <path
        d="M41 104 C 41 98, 46 94.5, 52 94.5 L 68 94.5 C 74 94.5, 79 98, 79 104 L 81 131 C 81 134, 79 135.5, 76 135.5 L 44 135.5 C 41 135.5, 39 134, 39 131 Z"
        fill={SHIRT}
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M44 125 H76 M45 115 H75" stroke={SHIRT_SH} strokeWidth="1" opacity="0.8" />
      <path d="M50 99 V134 M70 99 V134" stroke={SHIRT_SH} strokeWidth="1" opacity="0.8" />
      {/* open collar, the chain, buttons, pocket */}
      <path d="M53 94.5 L 60 104 L 67 94.5 Z" fill={SKIN} />
      <path d="M54 95.5 Q 60 103 66 95.5" stroke={GOLD} strokeWidth="1.1" fill="none" />
      <path d="M51.5 93 L 60 104 L 52.5 109 L 46 97 Z M68.5 93 L 60 104 L 67.5 109 L 74 97 Z" fill="#fffaf0" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="60" cy="113" r="1.5" fill={SHIRT_SH} stroke={INK} strokeWidth="0.9" />
      <circle cx="60" cy="123" r="1.5" fill={SHIRT_SH} stroke={INK} strokeWidth="0.9" />
      <path d="M65.5 108 H74 V116.5 Q 69.75 118.5 65.5 116.5 Z" fill="none" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  );
}

// Things he can hold, drawn in the forearm's own frame (the hand is at 0,13 and
// the arm points along +y), so they move with the arm. "Grip" props go under
// the hand so the fist closes over them.
function GripProp({ prop }) {
  if (prop === "pencil")
    return (
      <g transform={`translate(0 ${HAND}) rotate(22)`}>
        <path d="M-3 -10 H3 V16 H-3 Z" fill="#f2c76b" stroke={INK} strokeWidth="1.6" />
        <path d="M-3 16 L0 24 L3 16 Z" fill="#f1d9b5" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M-1 21 L0 24 L1 21 Z" fill={INK} />
        <path d="M-3 -10 H3 V-15 H-3 Z" fill="#f4a3a3" stroke={INK} strokeWidth="1.6" />
      </g>
    );
  if (prop === "wrench")
    return (
      <g transform={`translate(0 ${HAND}) rotate(18)`}>
        <path d="M0 -6 V17" stroke={INK} strokeWidth="7.5" strokeLinecap="round" />
        <path d="M0 -6 V17" stroke="#c9ccd1" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M0 18 m-7 0 a7 7 0 1 0 14 0 l-4 0 l0 4 l-6 0 l0 -4 Z" fill="#c9ccd1" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" transform="rotate(180 0 22)" />
        <g className="ch-sparks" fill="#f2c76b" stroke={INK} strokeWidth="0.9" strokeLinejoin="round">
          <path d="M9 30 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6 Z" />
          <path d="M-11 26 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2 Z" />
        </g>
      </g>
    );
  if (prop === "suitcase")
    return (
      <g className="ch-case">
        <g transform={`translate(0 ${HAND}) rotate(-8)`}>
          <path d="M-6 3 V-1 Q-6 -3 -4 -3 H4 Q6 -3 6 -1 V3" stroke={INK} strokeWidth="2.4" fill="none" />
          <rect x="-15" y="3" width="30" height="24" rx="4" fill="#d9603f" stroke={INK} strokeWidth="2" />
          <path d="M-8 3 V27 M8 3 V27" stroke="#f2c76b" strokeWidth="2.6" />
          <circle cx="-9" cy="29.5" r="2.4" fill={INK} />
          <circle cx="9" cy="29.5" r="2.4" fill={INK} />
        </g>
      </g>
    );
  return null;
}

function HeldProp({ prop }) {
  if (prop === "plane")
    return (
      <g transform={`translate(-2 ${HAND - 2}) rotate(84)`}>
        <path d="M0 -6 L28 0 L0 6 L5 0 Z" fill="#fffaf0" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M5 0 L28 0" stroke={INK} strokeWidth="1.2" />
      </g>
    );
  return null;
}

// Where the hands sit on props held in front with both hands.
const GRIPS = {
  book: [
    [35, 121],
    [85, 121],
  ],
  map: [
    [31, 119],
    [89, 119],
  ],
  paper: [
    [45, 121],
    [75, 119],
  ],
};

// Props held in front with both hands (pose hold / type).
function FrontProp({ prop }) {
  if (prop === "laptop")
    return (
      <g className="ch-laptop">
        <path d="M28 112 Q28 108 32 108 H88 Q92 108 92 112 V138 H28 Z" fill="#6b5a4c" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M22 138 H98 Q98 144 92 144 H28 Q22 144 22 138 Z" fill="#8a776a" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
        <circle className="ch-glow" cx="60" cy="123" r="6" fill="#f2c76b" stroke={INK} strokeWidth="1.6" />
        <path d="M57.5 120 L60.5 123 L57.5 126 M61.5 126 H64" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>
    );
  if (prop === "book")
    return (
      <g>
        <path d="M33 108 L60 112 L87 108 V132 L60 136 L33 132 Z" fill="#fffaf0" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        <path d="M38 115 L54 117.5 M38 120 L54 122.5 M38 125 L50 127 M66 117.5 L82 115 M66 122.5 L82 120 M66 127 L78 125" stroke="#b3a590" strokeWidth="1.4" strokeLinecap="round" />
        <g className="ch-page">
          <path d="M60 112 L85 108.5 V131.5 L60 135.5 Z" fill="#fffaf0" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M66 118 L80 116 M66 123 L80 121" stroke="#d6c7ad" strokeWidth="1.3" strokeLinecap="round" />
        </g>
        <path d="M60 112 V136" stroke={INK} strokeWidth="1.6" />
      </g>
    );
  if (prop === "map")
    return (
      <g>
        <path d="M30 106 L44 110 L60 106 L76 110 L90 106 V132 L76 136 L60 132 L44 136 L30 132 Z" fill="#f6eedf" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        <path d="M44 110 V136 M60 106 V132 M76 110 V136" stroke="#d6c7ad" strokeWidth="1.4" />
        <path d="M36 128 C 44 116, 52 128, 62 118 S 78 114, 84 112" stroke="#d9603f" strokeWidth="1.8" strokeDasharray="3 3" fill="none" />
        <path d="M80 116 l6 -6 M80 110 l6 6" stroke="#d9603f" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  if (prop === "paper")
    return (
      <g transform="rotate(-4 60 120)">
        <path d="M44 103 H76 V137 H44 Z" fill="#fffaf0" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        <path d="M49 110 H66 M49 116 H71 M49 121 H69 M49 126 H64 M49 131 H70" stroke="#b3a590" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M49 110 H62" stroke="#e9a934" strokeWidth="3" strokeLinecap="round" />
      </g>
    );
  return null;
}

// Knocked out: three little stars circling over his head. Each one rides the
// same elliptical orbit (keyframes ko-orbit in globals.css), a third of a lap
// apart, and stays upright.
function KoStars() {
  const star = "M0 -5.5 L1.6 -1.7 5.5 -1.5 2.5 1.1 3.4 5 0 2.9 -3.4 5 -2.5 1.1 -5.5 -1.5 -1.6 -1.7 Z";
  return (
    <g className="ko-post ko-stars" transform="translate(60 4)">
      {[0, 1, 2].map((k) => (
        <g key={k} className="ko-star" style={{ "--k": k }}>
          <path d={star} fill="#f2c76b" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
        </g>
      ))}
    </g>
  );
}

function Confetti() {
  return (
    <g className="ch-confetti" strokeWidth="1" stroke={INK}>
      <rect x="14" y="20" width="5" height="8" rx="1" fill="#f2c76b" />
      <rect x="101" y="26" width="5" height="8" rx="1" fill="#f4b8a4" />
      <circle cx="30" cy="2" r="3" fill="#bfe0c8" />
      <circle cx="92" cy="0" r="3" fill="#c9d7f2" />
    </g>
  );
}

export default function Chibi({ pose = "stand", prop, face = "smile", head = false, className = "", style, title }) {
  const [la, ra] = ARMS[pose] || ARMS.stand;
  const front = prop === "laptop" || prop === "book" || prop === "map" || prop === "paper";
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
  if (head)
    return (
      <svg className={`chibi chibi-head ${className}`} viewBox="15 -3 90 104" style={style} {...a11y}>
        <Head face={face} />
      </svg>
    );
  const left = (
    <Arm side="l" x={42.5} angles={la} grip={prop === "suitcase" ? <GripProp prop={prop} /> : null} />
  );
  const right = (
    <Arm side="r" x={77.5} angles={ra} grip={prop === "pencil" || prop === "wrench" ? <GripProp prop={prop} /> : null}>
      {prop === "plane" ? <HeldProp prop={prop} /> : null}
    </Arm>
  );
  const hands = GRIPS[prop] || [];
  return (
    <svg
      className={`chibi pose-${pose} face-${face}${prop ? ` prop-${prop}` : ""} ${className}`}
      viewBox="8 -4 104 168"
      style={style}
      {...a11y}
    >
      <ellipse className="ch-shadow" cx="60" cy="158" rx="28" ry="4.5" fill="rgba(35,28,21,0.18)" />
      <g className="ch-all">
        <Body walk={pose === "walk"} />
        {front ? null : left}
        <Head face={face} headset={prop === "headset"} />
        {front ? (
          <>
            {left}
            {right}
            <g className="ch-front">
              <FrontProp prop={prop} />
              {hands.map(([hx, hy], i) => (
                <circle key={i} cx={hx.toFixed(1)} cy={hy.toFixed(1)} r="5.2" fill={SKIN} stroke={INK} strokeWidth="1.8" />
              ))}
            </g>
          </>
        ) : (
          right
        )}
        {pose === "cheer" ? <Confetti /> : null}
        {face === "ko" ? <KoStars /> : null}
      </g>
    </svg>
  );
}
