import type { Metadata } from "next";
import Link from "next/link";
import { guideSlugs, getGuide } from "@/lib/guides";
import { notFound } from "next/navigation";

export function generateStaticParams() { return guideSlugs.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  const seoTitle = guide.appliance === "refrigerator" ? "Refrigerator Repair Cost: When Is It Worth It?" : guide.title;
  return { title: seoTitle, description: guide.description, alternates: { canonical: `/guides/${guide.slug}` } };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: { "@type": "Organization", name: "HomeRepairMath" },
    publisher: { "@type": "Organization", name: "HomeRepairMath" },
    mainEntityOfPage: `https://homerepairmath.com/guides/${guide.slug}`,
  };
  return (
    <main className="shell prose-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <p className="eyebrow">Repair decision guide</p>
      <h1>{guide.title}</h1>
      <p className="lead">{guide.intro}</p>
      <h2>What to look at first</h2>
      <ul>{guide.signs.map((sign) => <li key={sign}>{sign}</li>)}</ul>
      <h2>A practical three-step comparison</h2>
      <ol>{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol>
      <h2>Put the number in context</h2>
      <p>{guide.context}</p>
      <h2>Questions to answer before spending</h2>
      <ul>{guide.questions.map((question) => <li key={question}>{question}</li>)}</ul>
      <aside className="callout"><strong>Useful takeaway</strong><p>{guide.takeaway}</p></aside>
      <p><Link className="primary-link" href={guide.calculator}>Run the {guide.appliance} repair calculator</Link></p>
      <p><Link href="/guides">Browse all repair decision guides</Link> or read the <Link href="/methodology">methodology</Link> to see how the score is calculated.</p>
      <p className="small-note">This guide provides planning context, not a diagnosis or guarantee. Follow safety guidance and use qualified professional help for electrical, gas, structural, refrigerant, combustion, leak, or other hazardous conditions.</p>
    </main>
  );
}
