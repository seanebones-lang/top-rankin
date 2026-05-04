import { BackToTopButton } from "@/components/BackToTopButton";
import { ChatWidget } from "@/components/ChatWidget";
import { DesktopStickyCta } from "@/components/DesktopStickyCta";
import { MobileStickyCta } from "@/components/MobileStickyCta";

/** Mounted only from `(storefront)` and `(legal)` layouts — never from /studio. */
export function SiteGlobalOverlays() {
  return (
    <>
      <DesktopStickyCta />
      <MobileStickyCta />
      <BackToTopButton />
      <ChatWidget />
    </>
  );
}
