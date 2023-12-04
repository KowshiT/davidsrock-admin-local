import React from "react";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import PostDetailsView from "../../components/Card/features/post/postDetailsView";

export interface PostProps { }

const Post: React.FC<PostProps> = (props) => {
  return (
    <div className="homeMainSec">
      <NavBar />
      <div className="homeMidSec">
        <PostDetailsView />
      </div>
      <Footer />
    </div>
  );
};

export default Post;
