/**
 * Site-wide settings. Values come from build-time environment variables
 * (set them in Cloudflare Pages → Settings → Environment variables) so
 * nothing personal is hard-coded in the repository.
 */
const digitsOnly = (value: string | undefined) => (value ?? "").replace(/\D/g, "");

export const site = {
  name: "Sand & Silk",
  tagline: "Luxury in every drop",
  description:
    "Sand & Silk — luxury fragrances for Zimbabwe. Join the list to be first to shop our launch collection.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sandandsilk.co.zw",
  /** International format without "+", e.g. 263771234567. Empty hides the WhatsApp button. */
  whatsapp: digitsOnly(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  /** Handle without "@". Empty hides the Instagram link. */
  instagram: (process.env.NEXT_PUBLIC_INSTAGRAM ?? "").replace(/^@/, ""),
  /** Facebook page slug, e.g. "sandandsilk". Empty hides the link. */
  facebook: process.env.NEXT_PUBLIC_FACEBOOK ?? "",
} as const;

export const whatsappLink = (message: string) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}` : null;
