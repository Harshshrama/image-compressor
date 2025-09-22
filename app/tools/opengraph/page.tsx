import OpenGraphTool from "./OpenGraphTool";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Open Graph Preview Tool - MyImageTools</title>
        <meta name="description" content="Preview how your webpage will appear on social media using our free Open Graph Preview Tool." />
        <link rel="canonical" href="https://yourdomain.com/tools/ogpreview" />
        <meta property="og:title" content="Open Graph Preview Tool - MyImageTools" />
        <meta property="og:description" content="Preview how your webpage will appear on social media using our free Open Graph Preview Tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/ogpreview" />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />
      </Head>

      <OpenGraphTool />
    </>
  );
}
