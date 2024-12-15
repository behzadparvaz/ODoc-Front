import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GoogleAnalytics } from '@next/third-parties/google';
const G_ID = 'G-NK3MD5P0TQ';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <GoogleAnalytics gaId={G_ID} />
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
