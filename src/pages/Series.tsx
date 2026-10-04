import MediaGridPage from "../components/MediaGridPage";
import { API_KEY, BASE_URL } from "../services/api";

export default function Series() {
  const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}`;

  return (
    <MediaGridPage
      url={url}
      mediaType="tv"
      titleLead="TV "
      titleAccent="Series"
      seoTitle="TV Series - ChwiiX"
      seoDescription="Browse and discover TV series across every genre on ChwiiX."
    />
  );
}
