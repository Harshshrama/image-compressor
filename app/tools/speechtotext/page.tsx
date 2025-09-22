import SpeechToTextTool from "./SpeechToTextTool";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Speech to Text Tool - MyImageTools</title>
        <meta name="description" content="Convert your speech into text in real-time using our free online Speech to Text Tool." />
        <link rel="canonical" href="https://yourdomain.com/tools/speechtotext" />
        <meta property="og:title" content="Speech to Text Tool - MyImageTools" />
        <meta property="og:description" content="Convert your speech into text in real-time using our free online Speech to Text Tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/speechtotext" />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />
      </Head>

      <SpeechToTextTool />
    </>
  );
}
