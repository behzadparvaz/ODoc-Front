import Document, { Head, Html, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifast.json" />
          <link rel="robots" href="/robots.txt" />
          <meta name="application-name" content="تپسی دکتر" />
          <meta
            name="description"
            content="تپسی دکتر؛ داروخانه آنلاین با تحویل سریع دارو در کمتر از دو ساعت. خرید دارو از داروخانه‌های معتبر به صورت آنلاین، بدون نیاز به مراجعه حضوری. تجربه‌ای نوین از خدمات دارویی راحت و امن. سفارش آنلاین دارو با سریع‌ترین زمان تحویل"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#e5f8f8" />
          <meta name="msapplication-TileColor" content="#e5f8f8" />
          <meta name="msapplication-tap-highlight" content="no" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://tapsi.doctor/" />
          <meta
            property="og:title"
            content="تپسی دکتر - داروهای مورد نیاز را به سرعت دریافت کنید"
          />
          <meta
            property="og:description"
            content="دو ساعت. خرید دارو از داروخانه‌های معتبر به صورت آنلاین، بدون نیاز به مراجعه حضوری. تجربه‌ای نوین از خدمات دارویی راحت و امن. سفارش آنلاین دارو با سریع‌ترین زمان تحویل."
          />
          <meta
            property="og:image"
            content="/images/logo/apple-touch-icon-180x180.png"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://tapsi.doctor/" />
          <meta
            property="twitter:title"
            content="تپسی دکتر - داروهای مورد نیاز را به سرعت دریافت کنید"
          />
          <meta
            property="twitter:description"
            content="دو ساعت. خرید دارو از داروخانه‌های معتبر به صورت آنلاین، بدون نیاز به مراجعه حضوری. تجربه‌ای نوین از خدمات دارویی راحت و امن. سفارش آنلاین دارو با سریع‌ترین زمان تحویل."
          />
          <meta
            property="twitter:image"
            content="/images/logo/apple-touch-icon-120x120.png"
          />

          <link
            rel="shortcut icon"
            href="/images/logo/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="48x48"
            href="/images/logo/favicon-48x48.png"
          />

          <link
            rel="apple-touch-icon"
            href="/images/logo/apple-touch-icon.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/images/logo/apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/images/logo/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/images/logo/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/images/logo/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/images/logo/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/images/logo/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/images/logo/apple-touch-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/logo/apple-touch-icon-180x180.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
