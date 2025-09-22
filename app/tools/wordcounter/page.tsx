import WordCounterTool from "./WordCounterTool";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Word Counter Tool - MyImageTools</title>
        <meta name="description" content="Count words and characters in your text quickly and accurately using our free Word Counter Tool." />
        <link rel="canonical" href="https://yourdomain.com/tools/wordcounter" />
        <meta property="og:title" content="Word Counter Tool - MyImageTools" />
        <meta property="og:description" content="Count words and characters in your text quickly and accurately using our free Word Counter Tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/wordcounter" />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />
      </Head>

      <WordCounterTool />
    </>
  );
}
