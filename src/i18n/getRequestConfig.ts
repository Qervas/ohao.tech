import { getRequestConfig } from "next-intl/server";
import { i18nOptions } from "@/app/resources/config";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../../messages/${locale}.json`)).default,
  timeZone: "Europe/Stockholm",
  now: new Date(),
  locale: locale || i18nOptions.defaultLocale,
}));
