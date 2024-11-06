import { useQuery } from "@tanstack/react-query";
import Header from "../components/layout/DefaultHeader";
import { getUserBookmarks } from "../services/postsService";

const Bookmark = () => {
  const bookmarkQuery = useQuery({
    queryKey: ["posts", "bookmarks"],
    queryFn: () => {
      return getUserBookmarks();
    },
  });

  return (
    <>
      <Header label="Bookmark" />
      <div className="truncate ">
        <h2>Bookmark</h2>
        <p>Bookmark information</p>
        {bookmarkQuery?.data?.posts.map((post) => (
          <pre key={post._id}>{JSON.stringify(post, null, 2)}</pre>
        ))}
      </div>
    </>
  );
};

export default Bookmark;
