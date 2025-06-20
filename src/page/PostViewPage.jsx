import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

import Header from "../jsx/Header";
import PostContainer from "../jsx/PostContainer";
import SignUpContainer from "../jsx/SignUpContainer";
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
  const navigate = useNavigate();

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

  const [authorImageUrl, setAuthorImageUrl] = useState(null);
  const [isPositionSelected, setIsPositionSelected] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    db.collection("post")
      .doc(postId)
      .get()
      .then((doc) => {
        setPost(doc.data());

        const data = doc.data();
        if (data?.author) {
          db.collection("profile")
            .where("name", "==", data.author)
            .get()
            .then((profileSnap) => {
              if (!profileSnap.empty) {
                const profileData = profileSnap.docs[0].data();
                setAuthorImageUrl(profileData.imageUrl || null);
              }
            });
        }
      });
  }, []);

  return (
    <PageWrapper>
      <Header type="back" title="파티 모집" backTo="/post" />
      <ScrollableArea>
        <PostContainer
          post={post}
          authorImageUrl={authorImageUrl}
          setIsPositionSelected={setIsPositionSelected}
          setSelectedPosition={setSelectedPosition}
        />
      </ScrollableArea>
      <ActionBtnWrapper>
        <ActionBtn
          btnName={"지원"}
          type={isPositionSelected ? "default" : "disabled"}
          onClick={() => {
            if (isPositionSelected) {
              navigate(`/post/${postId}/signup`, {
                state: {
                  post,
                  selectedPosition,
                },
              });
            }
          }}
        />
      </ActionBtnWrapper>
    </PageWrapper>
  );
}

export default PostViewpage;
