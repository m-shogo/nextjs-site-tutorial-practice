import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getAllBlogs, getSingleBlog } from "../../utils/mdQueries" 

const SingleBlog = async (props) => {
  const { singleDocument } = await getSingleBlog(props);
  return (
    <>
      <div className="img-container">
        <Image
          src={singleDocument.data.image}
          alt="blog-image"
          height={500}
          width={1000}
          quality={90}
          priority={true}
        />
      </div>
      <div className="wrapper">
        <div className="container">
          <h1>{singleDocument.data.title}</h1>
          <p>{singleDocument.data.data}</p>
          <ReactMarkdown>{singleDocument.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;

export async function generateStaticParams() {
  const { blogs } = await getAllBlogs();
  const paths = blogs.map((blog) => `/${blog.slug}`);
  return paths;
}
