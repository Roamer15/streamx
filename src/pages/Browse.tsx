import { Link, useParams } from "react-router";
import MediaGridPage from "../components/MediaGridPage";
import { buildCategoryUrl, getCategory } from "../data/catalog";

export default function Browse() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategory(slug);

  if (!category) {
    return (
      <div
        className="min-h-screen text-white flex items-center justify-center px-6"
        style={{ background: "#0e0e0e" }}
      >
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4">
            Category not found
          </h1>
          <Link to="/" style={{ color: "#ff8d8f" }}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <MediaGridPage
      url={buildCategoryUrl(category)}
      mediaType={category.mediaType}
      titleLead=""
      titleAccent={category.title}
      seoTitle={`${category.title} - ChwiiX`}
      seoDescription={`Browse ${category.title} on ChwiiX.`}
    />
  );
}
