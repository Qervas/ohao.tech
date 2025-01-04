import createMiddleware from "next-intl/middleware";
import { i18nOptions } from "@/app/resources/config";

export default createMiddleware({
  // Specify the locales you want to support
  locales: i18nOptions.locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)", "/(en|id)/:path*"],
};
