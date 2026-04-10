import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  Leaf,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmailSignup } from "@/components/EmailSignup";
import { TrackedLink } from "@/components/TrackedLink";
import { featuredProducts } from "@/content/products";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-1px)]">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="size-5" />
            </div>
            <div className="leading-tight">
              <div className="font-heading text-2xl tracking-wide">
                Top Rankin&apos; Herb
              </div>
              <div className="text-sm text-muted-foreground">
                CBD with island soul
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="ghost" asChild>
              <a href="#drops">Featured drops</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#list">Email list</a>
            </Button>
            <Button asChild>
              <a href="#drops">
                Shop now <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-14 sm:pt-20">
        <section
          className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]"
          style={{ scrollMarginTop: 96 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <ShieldCheck className="size-4 text-primary" />
              Clean ingredients. Clear vibes. Built for calm.
            </div>

            <h1 className="mt-6 font-heading text-5xl leading-[0.92] tracking-wide sm:text-6xl">
              Feel the calm.
              <br />
              Keep the fire.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              Small-batch CBD blends inspired by Jamaican roots and crafted for
              everyday balance. Smooth flavors, steady energy, and a vibe that
              stays with you.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#drops">
                  Explore featured drops <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="#faq">Read the FAQ</a>
              </Button>
            </div>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
                <dt className="text-sm font-medium">Fast checkout</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Secure hosted payment via Square.
                </dd>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
                <dt className="text-sm font-medium">Transparent quality</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Clear sourcing and straight talk.
                </dd>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm">
                <dt className="text-sm font-medium">Made for daily life</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Calm focus, recovery, and chill.
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-tr from-primary/20 via-accent/15 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.25rem] border border-border/70 bg-card/80 shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="font-heading text-2xl tracking-wide">
                    Featured blend
                  </div>
                  <div className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    Limited run
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  A smooth, earthy profile with a bright finish. Designed for a
                  steady calm without killing your momentum.
                </p>

                <div className="mt-5 overflow-hidden rounded-2xl border border-border/70 bg-background/40">
                  <Image
                    src="/images/hero.svg"
                    alt="Top Rankin' Herb product hero"
                    width={1200}
                    height={900}
                    priority
                    className="h-[280px] w-full object-cover"
                  />
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="size-4 text-primary" />
                    Ships fast from the U.S. (details in FAQ)
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

        <section id="why" className="mt-14" style={{ scrollMarginTop: 96 }}>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-border/70 bg-card/70 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
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
            <div className="rounded-[1.75rem] border border-border/70 bg-card/70 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-accent/20 text-accent-foreground">
                  <BadgeCheck className="size-5" />
                </div>
                <div className="font-heading text-2xl tracking-wide">
                  Quality-first
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Clean ingredients and straight talk. Add COAs and sourcing info
                when your product images land.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-border/70 bg-card/70 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-background/60 text-primary">
                  <Truck className="size-5" />
                </div>
                <div className="font-heading text-2xl tracking-wide">
                  Easy checkout
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Hosted checkout via Square—simple, secure, and fast to complete
                from mobile.
              </p>
            </div>
          </div>
        </section>

        <section id="drops" className="mt-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-heading text-4xl tracking-wide">
                Featured drops
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Start with these best-sellers. Each “Buy” button will link to
                your Square checkout (we’ll wire in your real URLs next).
              </p>
            </div>
            <Button variant="secondary" asChild className="hidden sm:inline-flex">
              <a href="#faq">Before you buy</a>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredProducts.map((p) => (
              <article
                key={p.name}
                className="group overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/70 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="h-44 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent" />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-2xl tracking-wide">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {p.note}
                      </p>
                    </div>
                    <div className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-sm font-medium">
                      {p.priceLabel}
                    </div>
                  </div>
                  <div className="mt-5 flex gap-3">
                    <Button className="flex-1" asChild>
                      <TrackedLink
                        href={p.squareCheckoutUrl}
                        aria-label={`Buy ${p.name}`}
                        eventName="SquareBuyClick"
                        eventData={{ slug: p.slug }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy (Square) <ExternalLink className="size-4" />
                      </TrackedLink>
                    </Button>
                    <Button className="flex-1" variant="secondary" asChild>
                      <a href="#list">Get updates</a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="mt-20">
          <div className="rounded-[2.25rem] border border-border/70 bg-card/70 p-8 shadow-sm sm:p-10">
            <h2 className="font-heading text-4xl tracking-wide">FAQ</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-base font-semibold">
                  Is this legal / will it get me high?
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  We’re focused on CBD products. Effects vary by person. We
                  don’t make medical claims—check local laws and consult a
                  professional if you’re unsure.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold">Shipping & returns</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Checkout is handled securely via Square. Shipping timelines
                  and return policies will be shown at checkout and on your
                  receipt.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="list" className="mt-20">
          <div className="overflow-hidden rounded-[2.25rem] border border-border/70 bg-card/70 shadow-sm">
            <div className="grid gap-8 p-8 sm:p-10 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="font-heading text-4xl tracking-wide">
                  Get early access
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Drops, deals, and new blends—straight to your inbox. No spam,
                  just vibes.
                </p>
                <EmailSignup />
                <p className="mt-3 text-xs text-muted-foreground">
                  By joining, you agree to receive emails from Top Rankin&apos;
                  Herb. Unsubscribe anytime.
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
              Top Rankin&apos; Herb
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
