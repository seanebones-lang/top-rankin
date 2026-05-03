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
          when you contact support or pay through Cash App). We use it to
          provide service, fulfill orders, and improve the experience.
        </p>
        <p>
          We do not sell your personal information. Payment details are handled
          by Cash App according to their terms and privacy policy.
        </p>
        <p>
          If you have questions, email{" "}
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
