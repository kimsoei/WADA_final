import styled from "styled-components";
import { theme } from "../styles/theme";

const ItemWrap = styled.div`
  width: 100%;
  max-width: 362px;
  padding: 12px;
  max-height: 48px;
  border-radius: ${theme.radius.small};
  background-color: ${theme.colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ type }) => (type === "not" ? "default" : "pointer")};
  opacity: ${({ type }) => (type === "disabled" ? 0.2 : 1)};
`;

const TextWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.gray[800]};
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  object-fit: cover;
  overflow: hidden;
`;

const UserName = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
`;

const IconBtn = styled.img`
  width: 20px;
  height: 20px;
`;

const getImagePath = (filename) => `${import.meta.env.BASE_URL}${filename}`;
const DefaultImg = getImagePath("/designerProfile.svg");

function ApplicantListItem({ imageUrl, name, onClick, type = "default" }) {
  if (type === "not") {
    return (
      <ItemWrap type="not">
        <p style={{ color: "#999", margin: "0 auto" }}>아직 지원자가 없어요</p>
      </ItemWrap>
    );
  }

  return (
    <ItemWrap onClick={type !== "disabled" ? onClick : undefined} type={type}>
      <TextWrap>
        <ProfileImg src={imageUrl ? getImagePath(imageUrl) : DefaultImg} />
        <UserName>{name || "신청자"}</UserName>
      </TextWrap>
      <IconBtn
        src={import.meta.env.BASE_URL + "/arrow_right.svg"}
        alt="보기 버튼"
      />
    </ItemWrap>
  );
}

export default ApplicantListItem;
