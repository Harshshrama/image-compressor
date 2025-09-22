import ExcelPdfConverterTool from "./ExcelPdfConverterTool";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Excel to PDF & PDF to Excel Converter - MyImageTools</title>
        <meta name="description" content="Convert Excel files to PDF and PDF files to Excel quickly and securely using our free online converter tool." />
        <link rel="canonical" href="https://yourdomain.com/tools/excelpdf" />
        <meta property="og:title" content="Excel to PDF & PDF to Excel Converter - MyImageTools" />
        <meta property="og:description" content="Convert Excel files to PDF and PDF files to Excel quickly and securely using our free online converter tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/excelpdf" />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />
      </Head>

      <ExcelPdfConverterTool />
    </>
  );
}
