import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";

export const metadata = {
  title: "Image Tools",
  description: "Free Online Image Tools - Compress, Resize, Convert, Crop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 mt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
