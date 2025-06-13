import styled from "styled-components";
import { theme } from "../styles/theme";

const EmptyCon = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.gray[0]};

  & > img {
    width: 64px;
  }
`;

function EmptyPost() {
  return (
    <EmptyCon>
      <img src={import.meta.env.BASE_URL + "/second.svg"}></img>
    </EmptyCon>
  );
}

export default EmptyPost;
