import type { ComponentType, ReactNode } from "react";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Droplets, FlaskConical, Leaf, Pill, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeaderNav } from "@/components/HeaderNav";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CBD guide • Top Rankin' Herbs-n-Oils",
  description:
    "Organic THC-free CBD, how cannabinoids work with your body, reference dosage considerations, and product information. General wellness education only—not medical advice.",
  openGraph: {
    title: "CBD guide • Top Rankin' Herbs-n-Oils",
    description:
      "Educational CBD content: ECS basics, THC-free labeling, dosage reference chart, and product attributes.",
    type: "website",
    url: "/learn",
  },
};

const DISCLAIMER = (
  <>
    These materials summarize information from our printed guides and general wellness
    education.{" "}
    <strong className="text-foreground">
      They are not medical advice and are not intended to diagnose, treat, cure, or
      prevent any disease.
    </strong>{" "}
    FDA has not evaluated these statements. Check your local laws. Consult a qualified
    professional for personal guidance—especially if you take medication or have a
    health condition.
  </>
);

const DOSAGE_ROWS = [
  { lbs: "2–25", mild: "4.5mg", medium: "6mg", severe: "9mg" },
  { lbs: "26–45", mild: "6mg", medium: "9mg", severe: "12mg" },
  { lbs: "46–85", mild: "9mg", medium: "12mg", severe: "15mg" },
  { lbs: "86–150", mild: "12mg", medium: "15mg", severe: "18mg" },
  { lbs: "151–240", mild: "18mg", medium: "22.5mg", severe: "27mg" },
  { lbs: "241+", mild: "22.5mg", medium: "30mg", severe: "45mg" },
];

const BENEFIT_SECTIONS = [
  {
    title: "Brain",
    items: [
      "Aids sleep",
      "Anti-anxiety",
      "Antidepressant",
      "Anti-psychotic",
      "Antioxidant",
      "Increase memory",
      "Migraines",
      "Neuroprotective",
    ],
  },
  {
    title: "Eyes",
    items: ["Glaucoma", "Reduce pressure"],
  },
  {
    title: "Heart",
    items: ["Anti-ischemic", "Cardiovascular system", "Vasorelaxant"],
  },
  {
    title: "Skeletal",
    items: ["Cell stimulant", "Immune system", "Promote bone growth"],
  },
  {
    title: "Stomach",
    items: ["Abdominal pain", "Antibacterial", "Bowel control", "Digestion", "Reduce nausea"],
  },
  {
    title: "Joints & muscles",
    items: [
      "Neuropathy",
      "Reduces inflammation",
      "Reduces spasms",
      "Relieves aches & pain",
      "Rheumatoid arthritis",
    ],
  },
] as const;

function SectionShell({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon?: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-[1.75rem] border border-border/70 bg-card/70 p-6 sm:p-10 shadow-sm"
      style={{ scrollMarginTop: 112 }}
    >
      <div className="flex items-start gap-3">
        {Icon ? (
          <div className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
            <Icon className="size-5" />
          </div>
        ) : null}
        <div className="min-w-0">
          <h2 className="font-heading text-3xl sm:text-4xl tracking-wide">{title}</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function LearnPage() {
  return (
    <div className="min-h-[calc(100vh-1px)]">
      <HeaderNav />

      <main id="main" className="mx-auto max-w-6xl px-4 sm:px-5 pb-36 pt-10 sm:pb-28 sm:pt-16">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-1 size-4" />
              Back to home
            </Link>
          </Button>
          <nav className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <a className="hover:text-foreground underline-offset-4 hover:underline" href="#about-cbd">
              About CBD
            </a>
            <span aria-hidden>•</span>
            <a className="hover:text-foreground underline-offset-4 hover:underline" href="#ecs">
              ECS
            </a>
            <span aria-hidden>•</span>
            <a className="hover:text-foreground underline-offset-4 hover:underline" href="#product-info">
              Product info
            </a>
            <span aria-hidden>•</span>
            <a className="hover:text-foreground underline-offset-4 hover:underline" href="#usage-potency">
              Use &amp; potency
            </a>
            <span aria-hidden>•</span>
            <a className="hover:text-foreground underline-offset-4 hover:underline" href="#dosage">
              Dosage reference
            </a>
            <span aria-hidden>•</span>
            <a className="hover:text-foreground underline-offset-4 hover:underline" href="#benefits">
              Benefits
            </a>
          </nav>
        </div>

        <header className="rounded-[1.75rem] border border-border/70 bg-gradient-to-br from-primary/12 via-card/80 to-accent/10 p-6 sm:p-10 shadow-sm">
          <p className="mt-2 text-xs text-muted-foreground">
            Note: Print materials list established years as early as <strong className="text-foreground">2005</strong> or{" "}
            <strong className="text-foreground">2006</strong>, and some bottle labels use a different design year (e.g.{" "}
            <strong className="text-foreground">ESTD&nbsp;2022</strong>
            ). We use <strong className="text-foreground">Herbs-n-Oils</strong> online; flyers may read{" "}
            <strong className="text-foreground">Herbs &amp; Oils</strong>—same family of products. Always trust your
            batch label for establish dates and supplement facts.
          </p>
          <h1 className="mt-2 font-heading text-4xl sm:text-6xl tracking-wide [text-wrap:balance]">
            Top Rankin&apos; Herbs-n-Oils CBD guide
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg [text-wrap:pretty]">
            Straight talk from our printed materials—what CBD is, how your endocannabinoid
            system fits in, what &ldquo;THC free&rdquo; and organic MCT mean for us, a weight-based
            reference chart, and common wellness conversation starters.
          </p>
        </header>

        <div className="mt-8 flex gap-3 rounded-2xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-950 dark:text-amber-100 dark:border-amber-400/30 dark:bg-amber-500/15">
          <ShieldAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p className="leading-6">{DISCLAIMER}</p>
        </div>

        <div className="mt-10 space-y-10 sm:space-y-14">
          <SectionShell id="about-cbd" icon={FlaskConical} title="About CBD">
            <p>
              The cannabis plant is used by millions of people around the globe for different
              purposes. Some people consume cannabis for its psychoactive effects, while
              others use it for its medicinal properties. Cannabis would not induce a high or
              have medicinal benefits if our bodies didn&apos;t possess a biological system that
              interacts with cannabinoids such as THC and CBD. (Our print used &ldquo;posses&rdquo;; we
              spell it &ldquo;possess&rdquo; here.)
            </p>
            <p>
              <strong className="text-foreground">CBD (cannabidiol)</strong> is one of many
              cannabinoids. Our products are positioned as <strong className="text-foreground">THC free</strong> and built for people who want
              plant-based calm without the high.
            </p>
          </SectionShell>

          <SectionShell id="ecs" icon={Leaf} title="Endocannabinoid system">
            <p>
              Our brochure states: the endocannabinoid system is the{" "}
              <strong className="text-foreground">largest neurotransmitter system</strong> in the human body. It is
              imperative for maintaining health as it regulates bodily functions and maintains{" "}
              <strong className="text-foreground">homeostasis</strong>.
            </p>
            <p>
              Research language varies by source; the field is active and complex. We share the
              pamphlet wording for reference only—refer to the general disclaimer at the top of
              this page.
            </p>
          </SectionShell>

          <SectionShell id="product-info" icon={Pill} title="What is on the label">
            <p>From our product and brochure language, you&apos;ll see these themes:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Certified organic MCT oil</strong> as a
                carrier in applicable formulas
              </li>
              <li>
                <strong className="text-foreground">No THC</strong> — formulated for
                non-intoxicating use
              </li>
              <li>
                <strong className="text-foreground">Dietary supplement</strong> positioning
                where appropriate
              </li>
              <li>
                <strong className="text-foreground">Non-psychoactive</strong> focus for
                everyday routines
              </li>
            </ul>
            <p className="text-xs">
              Exact SKUs and supplement facts appear on each product&apos;s physical label and at
              checkout — always read the label for your batch.
            </p>
          </SectionShell>

          <SectionShell id="usage-potency" icon={Droplets} title="Use, potency &amp; printed pricing">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg tracking-wide text-foreground">Instructions</h3>
                <p className="mt-2 border-l-2 border-primary/40 pl-4">
                  Dispense under tongue or swish through mouth before swallowing. Consume as needed
                  or discussed.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg tracking-wide text-foreground">
                  Potency reference (per ml)
                </h3>
                <p className="mt-2">
                  As listed on our printed materials for common tincture strengths (verify on your
                  bottle):
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-foreground">1000&nbsp;mg</strong> bottle:{" "}
                    <strong className="text-foreground">1&nbsp;ml ≈ 16.3&nbsp;mg</strong> CBD
                  </li>
                  <li>
                    <strong className="text-foreground">2000&nbsp;mg</strong> bottle:{" "}
                    <strong className="text-foreground">1&nbsp;ml ≈ 32.6&nbsp;mg</strong> CBD
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-lg tracking-wide text-foreground">Prices (flyer layout)</h3>
                <p className="mt-2">
                  Brochures list <strong className="text-foreground">1000&nbsp;mg</strong> and{" "}
                  <strong className="text-foreground">2000&nbsp;mg</strong> tiers with price lines filled in at the
                  counter or through your order channel—{" "}
                  <strong className="text-foreground">not</strong> all print runs show dollar amounts.
                </p>
                <p className="mt-3 text-sm border-l-2 border-border pl-4">
                  Wholesale prices, full spectrum petals, topical cream and oils available.
                </p>
              </div>
            </div>
          </SectionShell>

          <section
            id="dosage"
            className="scroll-mt-28 rounded-[1.75rem] border border-border/70 bg-card/70 p-6 sm:p-10 shadow-sm"
            style={{ scrollMarginTop: 112 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl tracking-wide">
              Reference dosage chart
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Reproduced from our printed guide (flyer header: &ldquo;Condition&rdquo;) for{" "}
              <strong className="text-foreground">discussion only</strong>. Individual responses vary. Start low, go
              slow, and involve a clinician if you use prescriptions, are pregnant or nursing, or
              have medical questions.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border/70">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border/70 bg-background/50">
                    <th className="px-4 py-3 font-medium">Person size (lbs)</th>
                    <th className="px-4 py-3 font-medium">Mild range</th>
                    <th className="px-4 py-3 font-medium">Medium range</th>
                    <th className="px-4 py-3 font-medium">Severe range</th>
                  </tr>
                </thead>
                <tbody>
                  {DOSAGE_ROWS.map((row) => (
                    <tr key={row.lbs} className="border-b border-border/50 last:border-0">
                      <td className="px-4 py-3 font-medium text-foreground">{row.lbs}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.mild}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.medium}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.severe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              &ldquo;Mild,&rdquo; &ldquo;medium,&rdquo; and &ldquo;severe&rdquo; on the flyer are shorthand labels—not
              clinical staging. Adjust with professional input.
            </p>
          </section>

          <section
            id="benefits"
            className="scroll-mt-28 rounded-[1.75rem] border border-border/70 bg-card/70 p-6 sm:p-10 shadow-sm"
            style={{ scrollMarginTop: 112 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl tracking-wide">
              Benefits (brochure copy)
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The headings and bullets below are reproduced from printed Top Rankin&apos;
              Herbs &amp; Oils materials for reference.{" "}
              <strong className="text-foreground">
                They are not FDA-evaluated statements and are not promises of therapeutic
                outcome.
              </strong>{" "}
              Serious symptoms (pain, vision changes, GI bleeding, neurologic deficits, chest
              pain, etc.) require urgent medical care—not CBD self-treatment.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {BENEFIT_SECTIONS.map((block) => (
                <div
                  key={block.title}
                  className="rounded-2xl border border-border/60 bg-background/40 p-5"
                >
                  <h3 className="font-heading text-xl tracking-wide text-foreground">{block.title}</h3>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <footer className="rounded-2xl border border-border/70 bg-background/40 px-6 py-8">
            <p className="font-heading text-xl tracking-wide">Questions?</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Email{" "}
              <a
                className="text-foreground underline underline-offset-4"
                href="mailto:toprankin.herbsnoils@gmail.com"
              >
                toprankin.herbsnoils@gmail.com
              </a>
              {" · "}
              <a
                className="text-foreground underline underline-offset-4"
                href={siteUrl}
              >
                {new URL(siteUrl).hostname}
              </a>
              {" · "}
              <span className="text-muted-foreground/90">
                Some print lists{" "}
                <a
                  className="text-foreground underline underline-offset-4"
                  href="https://toprankinherbs.com"
                  rel="noopener noreferrer"
                >
                  TopRankinHerbs.com
                </a>
              </span>
              {" · "}
              <Link href="/#drops" className="text-foreground underline underline-offset-4">
                Shop featured drops
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
