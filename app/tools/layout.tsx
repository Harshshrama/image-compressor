// app/tools/layout.tsx
import "../globals.css";
import Header from "../Header";
import OurTools from "../components/OurTools";

export const metadata = {
  title: "Image Tools",
  description: "Free Online Image Tools - Compress, Resize, Convert, Crop",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-20 flex-1 mt-[0px]">
        {/* Main Tool Content */}
        {children}
        <OurTools />
      </main>
    </>
  );
}
