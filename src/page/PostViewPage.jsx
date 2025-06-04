import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

import Header from "../jsx/Header";
import PostContainer from "../jsx/PostContainer";
import ActionBtn from "../jsx/ActionBtn";

import { useState } from "react";
import { useEffect } from "react";

const ActionBtnWrapper = styled.div`
  background-color: #fff;
  padding: 16px 20px;
`;

const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollableArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

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

  const [isPositionSelected, setIsPositionSelected] = useState(false);

  useEffect(() => {
    db.collection("post")
      .doc(postId)
      .get()
      .then((doc) => {
        setPost(doc.data());
      });
  }, []);

  return (
    <PageWrapper>
      <Header type="back" title="모집글" backTo="/post" />
      <ScrollableArea>
        <PostContainer
          post={post}
          setIsPositionSelected={setIsPositionSelected}
        />
      </ScrollableArea>
      <ActionBtnWrapper>
        <ActionBtn
          btnName={"지원하기"}
          type={isPositionSelected ? "default" : "disabled"}
        />
      </ActionBtnWrapper>
    </PageWrapper>
  );
}

export default PostViewpage;
