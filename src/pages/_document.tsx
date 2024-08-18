import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
      <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicons/favicon2.ico" />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="aaa"
        />
        <meta
          name="keywords"
          content="aaa,aaa,aaa"
        />
        <meta
          property="og:title"
          content="Next.js - headlessCMS"
        />
        <meta
          property="og:description"
          content="aaa"
        />
        <meta
          property="og:image"
          content="https://domain.com/main.jpg"
        />
        <meta property="og:url" content="https://domain.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Next.js - headlessCMS"
        />
        <meta
          name="twitter:description"
          content="aaa"
        />
        <meta
          name="twitter:image"
          content="https://domain.com/main.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "aaa",
              description:
                "aaaaaaa",
              image: "https://domain.com/main.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "aaa町a番地a",
                addressLocality: "a市",
                addressRegion: "a県",
                postalCode: "aaa-aaaa",
                addressCountry: "JP",
              },
              telephone: "aaa-aaa-aaaa",
              email: "aaaaaa@aaaa.aaa",
              url: "https://domain.com",
              foundingDate: "9999-99",
              founder: {
                "@type": "Person",
                name: "aaaa",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "aaaaa責任者",
                name: "aaaa",
              },
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
