import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
import { Inter, Source_Code_Pro } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Background, Flex } from "@/once-ui/components";
import { Footer, Header, RouteGuard } from "@/components";
import { baseURL, style } from "@/app/resources";
import { routing } from "@/i18n/routing";
import { renderContent } from "@/app/resources";
import { unstable_setRequestLocale } from "next-intl/server";

// Optimize font loading
const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();
  const { person, home } = renderContent(t);

  return {
    metadataBase: new URL(`https://${baseURL}/${locale}`),
    title: home.title,
    description: home.description,
    openGraph: {
      title: `${person.firstName}'s Portfolio`,
      description: "Portfolio website showcasing my work.",
      url: baseURL,
      siteName: `${person.firstName}'s Portfolio`,
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Flex
        as="html"
        lang="en"
        background="page"
        data-neutral={style.neutral}
        data-brand={style.brand}
        data-accent={style.accent}
        data-solid={style.solid}
        data-solid-style={style.solidStyle}
        data-theme={style.theme}
        data-border={style.border}
        data-surface={style.surface}
        data-transition={style.transition}
        className={`${primary.variable} ${code.variable}`}
      >
        <Flex
          as="body"
          fillWidth
          margin="0"
          padding="0"
          direction="column"
          style={{ minHeight: "100vh" }}
        >
          <Background /> {/* Simplified background */}
          <Header />
          <Flex
            zIndex={1}
            fillWidth
            paddingY="l"
            paddingX="l"
            justifyContent="center"
            flex={1}
          >
            <RouteGuard>{children}</RouteGuard>
          </Flex>
          <Footer />
        </Flex>
      </Flex>
    </NextIntlClientProvider>
  );
}
