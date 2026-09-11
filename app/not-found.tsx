import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell prose-page">
      <p className="eyebrow">404</p>
      <h1>That repair page isn’t here.</h1>
      <p className="lead">The calculator or guide you requested may have moved or may not exist yet.</p>
      <p><Link className="primary-link" href="/">Go to HomeRepairMath</Link></p>
    </main>
  );
}
