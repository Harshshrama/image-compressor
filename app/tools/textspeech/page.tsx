import TextToSpeechTool from "./TextToSpeechTool";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Text to Speech (TTS) Tool - MyImageTools</title>
        <meta name="description" content="Convert your text into natural speech using our free online Text to Speech (TTS) Tool with multiple languages." />
        <link rel="canonical" href="https://yourdomain.com/tools/tts" />
        <meta property="og:title" content="Text to Speech (TTS) Tool - MyImageTools" />
        <meta property="og:description" content="Convert your text into natural speech using our free online Text to Speech (TTS) Tool with multiple languages." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/tts" />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />
      </Head>

      <TextToSpeechTool />
    </>
  );
}
