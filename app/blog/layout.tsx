import Header from "../Header";
import Footer from "../Footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-20 flex-1 mt-[0px] bg-gray-50">{children}</main>
      
    </>
  );
}
