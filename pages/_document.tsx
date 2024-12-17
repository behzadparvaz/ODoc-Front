import Document, { Head, Html, Main, NextScript } from 'next/document';
const GTM_ID = 'GTM-WTGQQVQW';
import { GoogleTagManager } from '@next/third-parties/google';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <GoogleTagManager gtmId={GTM_ID} />
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
