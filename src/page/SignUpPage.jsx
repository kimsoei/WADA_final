import { useLocation, useNavigate } from "react-router-dom";
import Header from "../jsx/Header";
import ActionBtn from "../jsx/ActionBtn";
import styled from "styled-components";
import SignUpContainer from "../jsx/SignUpContainer";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const ActionBtnWrapper = styled.div`
  background-color: #fff;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
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

function SignUpPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { post, selectedPosition } = state;
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);

  
  useEffect(() => {
    db.collection("profile").get().then((qs) => {
      const data = [];
      qs.forEach((doc) => data.push(doc.data()));
      setProfile(data[0] || null);
    });
  }, []);

  const handleApply = () => {
    if (!profile) return alert("프로필 정보를 불러오는 중입니다.");

    db.collection("applications")
      .add({
        postId: post.id,
        applicantName: profile.name,
        profile,
        message,
        position: selectedPosition,
        createdAt: new Date(),
      })
      .then(() => {
        alert("지원이 완료되었습니다.");
        navigate("/post");
      });
  };

  return (
    <PageWrapper>
      <Header type="back" title="모집글" backTo="/post" />
      <ScrollableArea>
        <SignUpContainer
          post={post}
          selectedPosition={selectedPosition}
          profile={profile}
          message={message}
          setMessage={setMessage}
        />
      </ScrollableArea>
      <ActionBtnWrapper>
          <ActionBtn
          btnName={"취소"}
          type="outline"
          onClick={() => navigate("/party")}
        />
        <ActionBtn
          btnName={"지원"}
          type="default"
          onClick={handleApply}
        />
      </ActionBtnWrapper>
    </PageWrapper>
  );
}

export default SignUpPage;
