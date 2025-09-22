import MetaTagTool from "./MetaTagTool";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Meta Tag Generator - MyImageTools</title>
        <meta name="description" content="Generate SEO friendly meta tags for your website easily using our free online Meta Tag Generator Tool." />
        <link rel="canonical" href="https://yourdomain.com/tools/metatag" />
        <meta property="og:title" content="Meta Tag Generator - MyImageTools" />
        <meta property="og:description" content="Generate SEO friendly meta tags for your website easily using our free online Meta Tag Generator Tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/metatag" />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />
      </Head>

      <MetaTagTool />
    </>
  );
}
