import React, { useState } from "react";
import ComFeed from "./feed/comfeed";
import { useCommunity } from "../../../hooks/useCommunity";
import Loading from "../../../Components/loading/loading";
import { IoIosChatboxes } from "react-icons/io";
import Pagination from "../../../Components/Pagination";

export default function Community() {
  const [page, setPage] = useState(0);
  const size = 12;
  const { posts, loading, error, proxyImageUrls, imagesLoaded } =
    useCommunity();

  if (loading || !imagesLoaded) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="body">
      <div className="feedScroll">
        <div className="pageTitleDiv ml3 mb3">
          <IoIosChatboxes size="2rem" />
          <h1 className="title ml03">커뮤니티</h1>
        </div>

        <div className="feedList mb3">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post, index) => (
              <ComFeed
                key={post.id}
                postId={post.id}
                proxyUrl={proxyImageUrls[index]}
                feedUrl={post.feedUrl}
                content={post.content}
                displayName={post.displayName}
                profilePictureUrl={post.profilePictureUrl}
              />
            ))
          ) : (
            <div>포스트가 없습니다.</div>
          )}
          <div style={{ height: "10px" }} />
        </div>
      </div>
      <Pagination />
    </div>
  );
}
