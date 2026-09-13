import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = { title: "Repair Decision Guides", description: "Useful homeowner questions and practical analysis for repair-or-replace decisions.", alternates: { canonical: "/guides" } };

export default function GuidesPage() {
  return <main className="shell prose-page tools-page"><p className="eyebrow">Search-targeted guidance</p><h1>Repair decisions with the assumptions in view.</h1><p className="lead">These guides answer common homeowner questions and point to a calculator when the numbers are ready.</p><div className="tool-grid">{guides.map((guide) => <Link className="tool-card linked-card" href={`/guides/${guide.slug}`} key={guide.slug}><h2>{guide.title}</h2><p>{guide.description}</p></Link>)}</div></main>;
}
