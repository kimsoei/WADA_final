import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import backIcon from "../assets/icons/back_header.svg";
import noticeIcon from "../assets/icons/notice.svg";
import noticeActiveIcon from "../assets/icons/notice_active.svg";

import { theme } from "../styles/theme";

const HeaderWrap = styled.div`
  width: 100%;
  max-width: 402px;
  height: 52px;
  padding: 8px 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const IconImg = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  height: 24px;
  cursor: pointer;
`;

const HeaderTitle = styled.h3`
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;
`;

const EmptyBlock = styled.div`
  width: 24px;
  height: 24px;
  opacity: 0;
`;

function Header({ type = "default", badge = false, title = "", backTo = "/" }) {
  const navigate = useNavigate();

  if (type === "default") {
    return (
      <HeaderWrap>
        <LogoImg src="/logo.svg" />
        <IconImg src={badge ? noticeActiveIcon : noticeIcon} />
      </HeaderWrap>
    );
  }

  return (
    <HeaderWrap>
      <IconImg src={backIcon} onClick={() => navigate(backTo)} />
      <HeaderTitle>{title}</HeaderTitle>
      <EmptyBlock />
    </HeaderWrap>
  );
}

export default Header;
