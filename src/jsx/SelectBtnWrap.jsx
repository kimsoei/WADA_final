import { useState } from "react";
import styled from "styled-components";
import SelectBtn from "./SelectBtn";
import { theme } from "../styles/theme";

const BtnCon = styled.div`
  gap: 12px;
`;

const BtnWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 6px;
  margin-top: 16px;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.gray[800]};
`;

const SubText = styled.p`
  font-size: 14px;
  color: ${theme.colors.gray[600]};
`;

const EssentialIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const ErrorMsg = styled.p`
  font-size: 12px;
  color: ${theme.colors.error};
  margin-top: 8px;
`;

export default function SelectBtnWrap({
  title = "제목",
  subtext = "",
  items = [],
  mode = "multi",
  essential = false,
  value = [],
  onChange = () => {},
}) {
  const selectedItems = value;
  const [touched, setTouched] = useState(false);

  const hasError = essential && touched && selectedItems.length === 0;

  const handleClick = (item) => {
    setTouched(true);

    if (mode === "multi") {
      if (selectedItems.includes(item)) {
        onChange?.(selectedItems.filter((i) => i !== item));
      } else if (selectedItems.length < 2) {
        onChange?.([...selectedItems, item]);
      }
    } else if (mode === "single") {
      onChange?.([item]);
    }
  };

  return (
    <>
      <BtnCon>
        <TitleWrap>
          <Title>{title}</Title>
          {essential && <EssentialIcon src="/essential.svg" alt="필수" />}
        </TitleWrap>
        {mode === "multi" && <SubText>{subtext}</SubText>}

        <BtnWrap>
          {items.map((item, index) => {
            const isSelected = selectedItems.includes(item);
            const isDisabled =
              mode === "multi" && !isSelected && selectedItems.length >= 2;

            return (
              <SelectBtn
                key={index}
                label={item}
                selected={isSelected}
                disabled={isDisabled}
                onClick={() => handleClick(item)}
              />
            );
          })}
        </BtnWrap>
      </BtnCon>
      {hasError && <ErrorMsg>최소 1개 이상 선택해주세요.</ErrorMsg>}
    </>
  );
}
