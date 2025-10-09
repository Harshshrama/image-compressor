import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  description: string;
  image?: string;
}

export const metadata = {
  title: "Our Blog | Image Tools",
  description: "Read our tutorials, tips and guides on using online image tools.",
};

export default async function BlogPage() {
  const postsDir = path.join(process.cwd(), "app/blog/posts");
  const filenames = fs.readdirSync(postsDir);

  const posts: BlogPost[] = filenames.map((file) => {
    const filePath = path.join(postsDir, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      title: data.title,
      slug: file.replace(".md", ""),
      date: data.date,
      description: data.description,
      image: data.image,
    };
  });

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Latest Blog Posts</h1>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        Explore our latest tutorials, guides, and tips to make the most of online image tools.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {post.image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}

            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-2">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.description}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs">{post.date}</span>
                <span className="text-blue-600 text-sm font-medium group-hover:underline">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
