import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SignUpContainer from "../jsx/SignUpContainer";
import Header from "../jsx/Header";
import ActionBtn from "../jsx/ActionBtn";
import styled from "styled-components";

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

function SignUpPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { post, selectedPosition } = state;

  return (
    <PageWrapper>
      <Header type="back" title="모집글" backTo="/post" />
      <ScrollableArea>
        <SignUpContainer post={post} selectedPosition={selectedPosition} />
      </ScrollableArea>
      <ActionBtnWrapper>
        <ActionBtn
          btnName={"지원하기"}
          type="default"
          onClick={() => {
            navigate(`/post`);
          }}
        />
      </ActionBtnWrapper>
    </PageWrapper>
  );
}

export default SignUpPage;
