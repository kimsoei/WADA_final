import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

import Header from "../jsx/Header";
import TabMenu from "../jsx/TabMenu";
import PostContainer from "../jsx/PostContainer";
import BottomNavigation from "../jsx/BottomNavigation";
import PositionCardList from "../jsx/PositionCardList";
import ActionBtn from "../jsx/ActionBtn";
import { useState } from "react";
import { useEffect } from "react";

function PostViewpage() {
  const postId = useParams().id;
  const [post, setPost] = useState({
    id: 0,
    topic: "",
    category: "",
    purpose: [],
    status: "",
    description: "",
    positions: [],
    projectDate: [],
  });

  useEffect(() => {
    db.collection("post")
      .doc(postId)
      .get()
      .then((doc) => {
        setPost(doc.data());
      });
  }, []);

  return (
    <>
      <Header type="back" title="모집글" backTo="/post" />
      <PostContainer post={post} />
    </>
  );
}

export default PostViewpage;
