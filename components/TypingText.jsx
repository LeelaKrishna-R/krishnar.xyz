"use client";
import { useEffect, useState } from "react";

// Types `text` out once on mount. The full text is always present (the untyped
// tail is just transparent), so the box keeps its final height from the start
// and nothing around it reflows while typing. aria-label exposes the full text.
export default function TypingText({ text, className, speed = 34 }) {
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [count, done, speed]);

  return (
    <h1 className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className="type-caret" aria-hidden="true" />
      <span aria-hidden="true" style={{ opacity: 0 }}>
        {text.slice(count)}
      </span>
    </h1>
  );
}
