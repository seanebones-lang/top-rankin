export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-20 pt-14">
      <h1 className="font-heading text-5xl tracking-wide">Terms of Service</h1>
      <p className="mt-4 text-muted-foreground">
        This is a starter terms page. Replace this content with your official
        terms before launch.
      </p>
      <div className="mt-8 space-y-4 text-sm leading-7 text-muted-foreground">
        <p>
          Purchases are completed through Cash App. Order confirmations and
          receipts are issued according to Cash App&apos;s flows.
        </p>
        <p>
          Product availability and prices are subject to change. Effects vary by
          person; we do not provide medical advice or make health claims.
        </p>
        <p>
          Questions? Email{" "}
          <a
            className="text-foreground underline"
            href="mailto:toprankin.herbsnoils@gmail.com"
          >
            toprankin.herbsnoils@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
