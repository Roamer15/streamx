import MediaGridPage from "../components/MediaGridPage";
import { BASE_URL } from "../services/api";

export default function Series() {
  const url = `${BASE_URL}/discover/tv`;

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
