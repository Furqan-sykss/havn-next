import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap" style={{ minHeight: "100vh", paddingTop: "30vh" }}>
      <p className="meta">404</p>
      <h1 className="h2" style={{ marginTop: 16 }}>
        Page not found
      </h1>
      <p className="body" style={{ marginTop: 18, maxWidth: "42ch" }}>
        The page you are looking for does not exist or has moved.
      </p>
      <Link className="link" href="/" style={{ display: "inline-block", marginTop: 32 }}>
        Back to home
      </Link>
    </main>
  );
}
