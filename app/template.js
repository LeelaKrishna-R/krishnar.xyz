// Re-mounts on every navigation, so each page fades up as it arrives.
export default function Template({ children }) {
  return <div className="page-in">{children}</div>;
}
