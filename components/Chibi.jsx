// A little cartoon me: messy hair, big glasses, beard, the gold dot, the cream
// shirt and the thin chain from the portrait. Drawn by hand in SVG so it stays
// sharp, weighs nothing and can move: it blinks, breathes, and each pose has
// its own small loop (waving, typing, walking...). Loops are transform-only
// and pause off-screen with the rest of the story (.scene:not(.on)).
//
//   pose: stand | wave | cheer | hold | type | shh | think | point | walk | bow
//   prop: laptop | suitcase | headset | mug | book | pencil | plane | map | paper | wrench
//   face: smile | grin | o | shh | happy
//   head: true draws only the head (for small avatars)

// Arm angles in degrees, 0 = hanging straight down, from each shoulder.
// The left arm is the one on the viewer's left.
const ARMS = {
  stand: [16, -16],
  wave: [16, -150],
  cheer: [150, -150],
  hold: [-38, 38],
  type: [-34, 34],
  shh: [16, 151],
  think: [16, 122],
  point: [16, -88],
  walk: [10, -10],
  bow: [-20, 20],
};

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

function Arm({ x, angle, anim, finger, children }) {
  return (
    <g transform={`translate(${x} 101) rotate(${angle})`}>
      <g className={`ch-arm${anim ? ` ch-${anim}` : ""}`}>
        <path d="M0 0 V20" stroke={INK} strokeWidth="11.5" strokeLinecap="round" fill="none" />
        <path d="M0 0 V20" stroke={SHIRT} strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M-4.2 18.5 H4.2" stroke={SHIRT_SH} strokeWidth="1.6" strokeLinecap="round" />
        {finger ? (
          <>
            <path d="M0 26 V32" stroke={INK} strokeWidth="5.4" strokeLinecap="round" />
            <path d="M0 26 V32" stroke={SKIN} strokeWidth="2.8" strokeLinecap="round" />
          </>
        ) : null}
        <circle cx="0" cy="24" r="5.2" fill={SKIN} stroke={INK} strokeWidth="1.8" />
        {finger ? <path d="M0 26 V32" stroke={SKIN} strokeWidth="2.8" strokeLinecap="round" /> : null}
        {children}
      </g>
    </g>
  );
}

function Face({ face }) {
  const happy = face === "happy" || face === "grin";
  return (
    <g className="ch-face">
      {/* eyes (blink together) */}
      <g className="ch-eyes">
        {happy ? (
          <>
            <path d="M38.5 59.5 Q43 54 47.5 59.5" stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <path d="M72.5 59.5 Q77 54 81.5 59.5" stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <ellipse cx="43" cy="58" rx="4.6" ry="5.6" fill="#261a13" />
            <ellipse cx="77" cy="58" rx="4.6" ry="5.6" fill="#261a13" />
            <circle cx="44.7" cy="55.6" r="1.8" fill="#fff" />
            <circle cx="78.7" cy="55.6" r="1.8" fill="#fff" />
            <circle cx="41.7" cy="60.3" r="0.8" fill="#fff" />
            <circle cx="75.7" cy="60.3" r="0.8" fill="#fff" />
          </>
        )}
      </g>
      {/* glasses */}
      <g fill="rgba(255,255,255,0.16)" stroke="#17110d" strokeWidth="3">
        <rect x="29.5" y="48" width="26" height="19.5" rx="7" />
        <rect x="64.5" y="48" width="26" height="19.5" rx="7" />
      </g>
      <path d="M55.5 55.5 Q60 52.5 64.5 55.5 M29.5 54 L24.5 53 M90.5 54 L95.5 53" stroke="#17110d" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M33 52 L37 50.5 M68 52 L72 50.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      {/* brows */}
      <path d="M33.5 46 Q42 41.5 50.5 44.5 M69.5 44.5 Q78 41.5 86.5 46" stroke={HAIR} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      {/* nose */}
      <path d="M59 64.5 Q61.5 67.5 63.5 65" stroke={SKIN_SH} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* mouth sits on the beard */}
      {face === "grin" ? (
        <path d="M52.5 80.5 Q60 92 67.5 80.5 Z" fill="#7a3328" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      ) : face === "o" ? (
        <ellipse cx="60" cy="83" rx="3.4" ry="4" fill="#7a3328" stroke={INK} strokeWidth="1.4" />
      ) : face === "shh" ? (
        <ellipse cx="60" cy="82.5" rx="2.6" ry="2.2" fill="#c98466" stroke={INK} strokeWidth="1.2" />
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

// Things he can hold. Hand-held props are drawn in the arm's own frame
// (hand at 0,24) so they move with the arm.
function HandProp({ prop }) {
  if (prop === "pencil")
    return (
      <g transform="translate(0 24) rotate(200)">
        <path d="M-3 -4 H3 V22 H-3 Z" fill="#f2c76b" stroke={INK} strokeWidth="1.6" />
        <path d="M-3 22 L0 30 L3 22 Z" fill="#f1d9b5" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M-1 27 L0 30 L1 27 Z" fill={INK} />
        <path d="M-3 -4 H3 V-9 H-3 Z" fill="#f4a3a3" stroke={INK} strokeWidth="1.6" />
      </g>
    );
  if (prop === "wrench")
    return (
      <g transform="translate(0 24) rotate(180)">
        <path d="M-2.6 0 V20" stroke={INK} strokeWidth="7.5" strokeLinecap="round" />
        <path d="M-2.6 0 V20" stroke="#c9ccd1" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M-2.6 21 m-7 0 a7 7 0 1 0 14 0 l-4 0 l0 -4 l-6 0 l0 4 Z" fill="#c9ccd1" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      </g>
    );
  if (prop === "plane")
    return (
      <g transform="translate(4 18) rotate(80)">
        <path d="M0 -6 L28 0 L0 6 L5 0 Z" fill="#fffaf0" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M5 0 L28 0" stroke={INK} strokeWidth="1.2" />
      </g>
    );
  if (prop === "suitcase")
    return (
      <g transform="translate(0 24) rotate(-16)" className="ch-suitcase">
        <path d="M-6 3 V-1 Q-6 -3 -4 -3 H4 Q6 -3 6 -1 V3" stroke={INK} strokeWidth="2.4" fill="none" />
        <rect x="-15" y="3" width="30" height="24" rx="4" fill="#d9603f" stroke={INK} strokeWidth="2" />
        <path d="M-8 3 V27 M8 3 V27" stroke="#f2c76b" strokeWidth="2.6" />
        <circle cx="-9" cy="29.5" r="2.4" fill={INK} />
        <circle cx="9" cy="29.5" r="2.4" fill={INK} />
      </g>
    );
  return null;
}

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
  if (prop === "mug")
    return (
      <g>
        <g className="ch-steam" stroke="#b3a590" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M55 105 Q52 100 55 96 Q58 92 55 88" />
          <path d="M63 105 Q60 100 63 96 Q66 92 63 88" />
        </g>
        <path d="M71 112 Q78 112 78 118 Q78 124 71 124" stroke={INK} strokeWidth="2.2" fill="none" />
        <path d="M49 108 H71 V126 Q71 131 66 131 H54 Q49 131 49 126 Z" fill="#e9a934" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        <path d="M53 116 h14" stroke="#fffaf0" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  if (prop === "book")
    return (
      <g>
        <path d="M33 108 L60 112 L87 108 V132 L60 136 L33 132 Z" fill="#fffaf0" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        <path d="M60 112 V136" stroke={INK} strokeWidth="1.6" />
        <path d="M38 115 L54 117.5 M38 120 L54 122.5 M38 125 L50 127 M66 117.5 L82 115 M66 122.5 L82 120 M66 127 L78 125" stroke="#b3a590" strokeWidth="1.4" strokeLinecap="round" />
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

export default function Chibi({ pose = "stand", prop, face = "smile", head = false, className = "", style, title }) {
  const [la, ra] = ARMS[pose] || ARMS.stand;
  const front = prop === "laptop" || prop === "mug" || prop === "book" || prop === "map" || prop === "paper";
  const rightProp = prop === "pencil" || prop === "wrench" || prop === "plane";
  const leftProp = prop === "suitcase";
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
  if (head)
    return (
      <svg className={`chibi chibi-head ${className}`} viewBox="15 -3 90 104" style={style} {...a11y}>
        <Head face={face} />
      </svg>
    );
  const rAnim = { wave: "wave", type: "type-r", cheer: "cheer-r", point: "point", walk: "swing-r", shh: null, think: null }[pose];
  const lAnim = { type: "type-l", cheer: "cheer-l", walk: "swing-l" }[pose];
  return (
    <svg className={`chibi pose-${pose} ${className}`} viewBox="8 -4 104 168" style={style} {...a11y}>
      <ellipse className="ch-shadow" cx="60" cy="158" rx="28" ry="4.5" fill="rgba(35,28,21,0.18)" />
      <g className="ch-all">
        <Body walk={pose === "walk"} />
        {front ? null : (
          <>
            <Arm x={42.5} angle={la} anim={lAnim}>
              {leftProp ? <HandProp prop={prop} /> : null}
            </Arm>
          </>
        )}
        <Head face={face} headset={prop === "headset"} />
        {front ? (
          <>
            <Arm x={42.5} angle={la} anim={lAnim} />
            <Arm x={77.5} angle={ra} anim={rAnim} />
            <FrontProp prop={prop} />
          </>
        ) : (
          <Arm x={77.5} angle={ra} anim={rAnim} finger={pose === "shh" || (pose === "point" && !prop)}>
            {rightProp ? <HandProp prop={prop} /> : null}
          </Arm>
        )}
      </g>
    </svg>
  );
}
