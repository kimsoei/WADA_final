import styled from "styled-components";
import CheckIcon from "../assets/icons/check.svg?react";
import XIcon from "../assets/icons/X.svg?react";
import { theme } from "../styles/theme";

const CardWrap = styled.div.attrs({ role: "button" })`
  max-width: 362px;
  width: 100%;
  border-radius: ${theme.radius.large};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;

  background-color: ${({ type }) =>
    type === "selected"
      ? theme.colors.secondary
      : type === "disabled"
      ? theme.colors.gray[50]
      : "#fff"};

  border: 1px solid
    ${({ type }) =>
      type === "selected"
        ? theme.colors.primary
        : type === "disabled"
        ? theme.colors.gray[100]
        : theme.colors.gray[300]};
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${({ type }) =>
    type === "disabled" ? theme.colors.gray[300] : theme.colors.gray[800]};
`;

const SubText = styled.p`
  font-size: 14px;
  color: ${({ type }) =>
    type === "disabled" ? theme.colors.gray[200] : theme.colors.gray[400]};
`;

const StyledCheck = styled.div`
  width: 24px;
  height: 24px;
  color: ${({ type }) =>
    type === "selected" ? theme.colors.primary : theme.colors.gray[300]};
  transition: color 0.2s ease;

  svg {
    width: 100%;
    height: 100%;
  }
`;

function PositionCard({
  type = "default",
  title = "",
  skills = "",
  onClick,
  onDelete,
  purpose = "default",
}) {
  const handlePurpose = () => {
    if (purpose === "default") {
      onClick();
    } else if (purpose === "show") {
      onDelete();
    }
  };

  return (
    <CardWrap type={type} onClick={handlePurpose}>
      <TextWrap>
        <Title type={type}>{title}</Title>
        <SubText type={type}>
          {Array.isArray(skills) ? skills.join(" · ") : skills}
        </SubText>
      </TextWrap>
      <StyledCheck type={type}>
        {purpose === "show" ? <XIcon /> : <CheckIcon />}
      </StyledCheck>
    </CardWrap>
  );
}

export default PositionCard;
