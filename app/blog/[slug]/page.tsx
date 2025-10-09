// app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

interface Params {
  params: { slug: string };
}

// Generate static params for SSG
export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "app/blog/posts");

  if (!fs.existsSync(postsDir)) return [];

  const filenames = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  return filenames.map((file) => ({
    slug: file.replace(".md", "").toLowerCase(),
  }));
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = params;
  const postsDir = path.join(process.cwd(), "app/blog/posts");

  // Find the file that matches the slug (case-insensitive)
  const filenames = fs.readdirSync(postsDir);
  const matchedFile = filenames.find(
    (file) => file.toLowerCase() === `${slug}.md`
  );

  if (!matchedFile) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Blog post not found</h1>
        <p className="text-gray-500">
          The post you are looking for does not exist.
        </p>
      </div>
    );
  }

  const filePath = path.join(postsDir, matchedFile);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-400 mb-6">{data.date}</p>
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        className="prose max-w-full"
      />
    </div>
  );
}
