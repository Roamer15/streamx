import MediaGridPage from "../components/MediaGridPage";
import { BASE_URL } from "../services/api";

export default function Movies() {
  const url = `${BASE_URL}/discover/movie`;

  return (
    <MediaGridPage
      url={url}
      mediaType="movie"
      titleLead="All "
      titleAccent="Movies"
      seoTitle="Movies - ChwiiX"
      seoDescription="Browse and discover movies across every genre on ChwiiX."
    />
  );
}
