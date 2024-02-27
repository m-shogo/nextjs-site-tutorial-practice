import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

async function getAllBlogs() {
  const files = fs.readdirSync(path.join("data"));
  const blogs = files.map((fileName) => {
    const slug = fileName.replace(".md","");
    const fileData = fs.readFileSync(path.join("data", fileName), "utf-8");
    const { data } = matter(fileData);
    return {
      frontmatter: data,
      slug: slug,
    };
  });
  return {
    blogs: blogs,
  };
}

const Blog = async() => {
  const{blogs} = await getAllBlogs();
  return (
    <div>
      <h1>ブログページ</h1>
      {blogs.map((blog,index) => 
      <div key={index}>
        <h2>{blog.frontmatter.title}</h2>
        <p>{blog.frontmatter.date}</p>
        <Link href={`/blog/${blog.slug}`}>Read More</Link>
      </div>
      )}
    </div>
  );
};

export default Blog;
