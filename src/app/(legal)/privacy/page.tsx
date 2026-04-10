export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-20 pt-14">
      <h1 className="font-heading text-5xl tracking-wide">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">
        This is a starter privacy policy page. Replace this content with your
        official policy before launch.
      </p>
      <div className="mt-8 space-y-4 text-sm leading-7 text-muted-foreground">
        <p>
          We collect the information you choose to share with us (for example,
          when you contact support or place an order via Square). We use it to
          provide service, fulfill orders, and improve the experience.
        </p>
        <p>
          We do not sell your personal information. Payment details are handled
          by our checkout provider (Square).
        </p>
        <p>
          If you have questions, email{" "}
          <a className="text-foreground underline" href="mailto:hello@toprankinherb.com">
            hello@toprankinherb.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}

