import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  BadgeCheck,
  Leaf,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmailSignup } from "@/components/EmailSignup";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { HeaderNav } from "@/components/HeaderNav";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { resolveHomeProducts, resolveUrgencyBanner } from "@/lib/sanity/loadHome";
export default async function Home() {
  const products = await resolveHomeProducts();
  const urgency = await resolveUrgencyBanner();

  return (
    <div className="min-h-[calc(100vh-1px)]">
      <HeaderNav />

      <main
        id="main"
        className="mx-auto max-w-6xl px-4 sm:px-5 pb-36 pt-12 sm:pb-24 sm:pt-20"
      >
        {urgency.visible ? (
          <UrgencyBanner
            endsAtISO={urgency.endsAtISO}
            supportingText={urgency.supportingText}
          />
        ) : null}

        <section
          className="mt-6 sm:mt-7 grid items-center gap-8 sm:gap-10 md:grid-cols-[1.2fr_0.8fr]"
          style={{ scrollMarginTop: 96 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <ShieldCheck className="size-4 text-primary" />
              Clean ingredients. Clear standards. Made for calm.
            </div>

            <h1 className="mt-5 sm:mt-6 font-heading text-4xl max-[360px]:text-[2.05rem] leading-[0.9] max-[360px]:leading-[0.94] tracking-wide sm:text-6xl [text-wrap:balance]">
              <span className="block">Feel the calm.</span>
              <span className="block">Keep the fire.</span>
            </h1>
            <p className="mt-4 sm:mt-5 max-w-xl max-[360px]:max-w-[30ch] text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground [text-wrap:pretty]">
              Small-batch CBD blends inspired by Jamaican roots and crafted for
              everyday balance. Smooth flavors, steady energy, and a vibe that
              stays with you.
            </p>
            <p className="mt-2 text-sm font-medium text-primary">
              Organic THC free CBD ·{" "}
              <Link href="/learn" className="underline underline-offset-4">
                Read the CBD guide
              </Link>
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button size="lg" asChild>
                <a href="#drops">
                  Explore featured drops <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="#faq">Read the FAQ</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/learn">
                  CBD guide <BookOpen className="size-4" />
                </Link>
              </Button>
            </div>

            <dl className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
                <dt className="text-sm font-medium">Fast checkout</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Pay with Cash App — quick and mobile-friendly.
                </dd>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
                <dt className="text-sm font-medium">Transparent quality</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Responsible sourcing and transparent product information.
                </dd>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
                <dt className="text-sm font-medium">Made for daily life</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Balance for focus, recovery, and restorative rest.
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-tr from-primary/20 via-accent/15 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.25rem] border border-border/70 bg-card/80 shadow-sm">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="font-heading text-2xl tracking-wide">
                    Featured blend
                  </div>
                  <div className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    Limited run
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  A smooth, earthy profile with a bright finish—crafted for steady
                  calm while you stay present and productive.
                </p>

                <div className="mt-5 overflow-hidden rounded-2xl border border-border/70 bg-background/40">
                  <Image
                    src="/images/hero.svg"
                    alt="Top Rankin' Herbs-n-Oils product hero"
                    width={1200}
                    height={900}
                    priority
                    className="h-[280px] w-full object-cover"
                  />
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="size-4 text-primary" />
                    Ships from the United States—see FAQ for fulfillment details.
                  </div>
                  <Button size="lg" className="w-full" asChild>
                    <a href="#drops">
                      See all drops <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="why"
          className="mt-12 sm:mt-14"
          style={{ scrollMarginTop: 96 }}
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-border/70 bg-card/70 p-5 sm:p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Leaf className="size-5" />
                </div>
                <div className="font-heading text-2xl tracking-wide">
                  Island-inspired blends
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Jamaican-rooted vibes with a modern wellness edge—crafted for
                calm focus and easy nights.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-border/70 bg-card/70 p-5 sm:p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-accent/20 text-accent-foreground">
                  <BadgeCheck className="size-5" />
                </div>
                <div className="font-heading text-2xl tracking-wide">
                  Quality-first
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Carefully selected ingredients and consistent small-batch quality.
                Lab results and sourcing details appear on product materials as
                they are published.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-border/70 bg-card/70 p-5 sm:p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-background/60 text-primary">
                  <Truck className="size-5" />
                </div>
                <div className="font-heading text-2xl tracking-wide">
                  Easy checkout
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Complete purchases securely with Cash App on your mobile device.
                Each product&apos;s Pay button opens the correct payment request
                for that item.
              </p>
            </div>
          </div>
        </section>

        <section
          id="drops"
          className="mt-16 sm:mt-20"
          style={{ scrollMarginTop: 96 }}
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl tracking-wide">
                Featured drops
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Curated favorites and limited releases from our current lineup.
                Inventory and availability are updated regularly.
              </p>
            </div>
            <Button variant="secondary" asChild className="hidden sm:inline-flex">
              <a href="#faq">Before you buy</a>
            </Button>
          </div>

          <FeaturedProducts products={products} />
        </section>

        <section
          id="proof"
          className="mt-16 sm:mt-20"
          style={{ scrollMarginTop: 96 }}
        >
          <div className="rounded-[2.25rem] border border-border/70 bg-card/70 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl tracking-wide">
                  Voices from customers
                </h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Customers share how Top Rankin&apos; blends fit their day-to-day
                  routines.
                </p>
              </div>
              <Button variant="secondary" asChild>
                <a href="#list">Get drops first</a>
              </Button>
            </div>
            <TestimonialsCarousel />
          </div>
        </section>

        <section
          id="faq"
          className="mt-16 sm:mt-20"
          style={{ scrollMarginTop: 96 }}
        >
          <div className="rounded-[2.25rem] border border-border/70 bg-card/70 p-6 sm:p-10 shadow-sm">
            <h2 className="font-heading text-3xl sm:text-4xl tracking-wide">FAQ</h2>
            <FaqAccordion />
          </div>
        </section>

        <section
          id="list"
          className="mt-16 sm:mt-20"
          style={{ scrollMarginTop: 96 }}
        >
          <div className="overflow-hidden rounded-[2.25rem] border border-border/70 bg-card/70 shadow-sm">
            <div className="grid gap-6 sm:gap-8 p-6 sm:p-10 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl tracking-wide">
                  Get early access
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Limited releases, offers, and product updates by email—only what
                  you need. You can unsubscribe at any time.
                </p>
                <EmailSignup />
                <p className="mt-3 text-xs text-muted-foreground">
                  By joining, you agree to receive emails from Top Rankin&apos;
                  Herbs-n-Oils. Unsubscribe anytime.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-8 rounded-[2.25rem] bg-gradient-to-tr from-primary/25 via-accent/15 to-transparent blur-2xl" />
                <div className="relative rounded-[2.25rem] border border-border/70 bg-background/40 p-6">
                  <div className="font-heading text-3xl tracking-wide">
                    What you&apos;ll get
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li>• First look at limited runs</li>
                    <li>• Subscriber-only bundles</li>
                    <li>• Shipping updates + restocks</li>
                  </ul>
                  <Button className="mt-6 w-full" asChild>
                    <a href="#drops">
                      Shop featured drops <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/70 py-10 sm:flex-row sm:items-center">
          <div>
            <div className="font-heading text-2xl tracking-wide">
              Top Rankin&apos; Herbs-n-Oils
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              © {new Date().getFullYear()} • All rights reserved
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="/privacy">
              Privacy
            </a>
            <a className="hover:text-foreground" href="/terms">
              Terms
            </a>
            <a className="hover:text-foreground" href="#list">
              Email list
            </a>
            <a
              className="hover:text-foreground"
              href="https://www.facebook.com/p/Top-Rankin-Herbs-N-Oils-100047360516163/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              className="hover:text-foreground"
              href="mailto:toprankin.herbsnoils@gmail.com"
            >
              toprankin.herbsnoils@gmail.com
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
