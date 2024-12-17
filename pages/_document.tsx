import Document, { Head, Html, Main, NextScript } from 'next/document';
import { GoogleTagManager } from '@next/third-parties/google';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
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
