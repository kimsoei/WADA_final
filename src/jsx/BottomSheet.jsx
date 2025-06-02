import styled from "styled-components";
import { useState } from "react";

import SelectBtnWrap from "./SelectBtnWrap";
import InputDropdown from "./InputDropdown";
import ChipList from "./ChipList";
import ActionBtn from "./ActionBtn";


const SheetCon = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 40px;
    border-radius: 24px 24px 0px 0px;
    width: 402px;
    height: auto;
    padding: 0px 20px 36px 20px;

    position: absolute;
    bottom: 0;
    left: 0;

    z-index: 1000;

    transform: translateY(100%);
        animation: BottomSheet 0.3s ease-out forwards;

    @keyframes BottomSheet {
        to {
        transform: translateY(0);
        }
    }
`

const ControllBar = styled.div`
    background-color: ${({ theme }) => theme.colors.gray[400]};
    width: 72px;
    height: 4px;
`

const ControllBarBox = styled .div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const InfoTextWrap = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 0px 0px 0px;
`

const InfoTitle = styled.p`
    font-size: 20px;
    line-height: 28px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray[800]};
`;

const InfoText = styled.p`
    font-size: 16px;
    line-height: 150%;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[500]};
`;

function BottomSheet( {onAdd, onClose} ){

    const [partyPosition, setpartyPosition] = useState({ task: '', position: '', stack: [], });

    const positionOptions = {
        디자인: ['UI 디자이너', 'UX 디자이너', 'BX 디자이너', '좀 더 추가하기'],
        개발: ['프론트엔드', '백엔드', '풀스택', '좀 더 추가하기'],
        기획: ['서비스 기획', 'PM', '콘텐츠 기획', '좀 더 추가하기'],
    };

    const stackOptions = ['Figma', 'Photoshop', 'React', 'Vue', 'Blender', 'Node.js', 'css'];

  const handleTaskChange = (val) => {
    setpartyPosition((prev) => ({
      ...prev,
      task: val,
      position: '',
    }));
  };

  const handlePositionSelect = (val) => {
    setpartyPosition((prev) => ({
      ...prev,
      position: val,
    }));
  };

    return(
        <>
            <SheetCon>
                <InfoTextWrap>
                    <ControllBarBox>
                        <ControllBar></ControllBar>
                    </ControllBarBox>
                    <InfoTitle>파티원추가</InfoTitle>
                    <InfoText> 모집하려는 파티원의 정보를 추가해주세요</InfoText>
                </InfoTextWrap>

                <SelectBtnWrap
                    title="모집분야"
                    items={['디자인','개발','기획']}
                    mode="single"
                    essential={true}
                    value={partyPosition.task}
                    onChange={handleTaskChange}
                />

                <InputDropdown
                    title="포지션"
                    placeholder="포지션을 선택해주세요"
                    items={positionOptions[partyPosition.task] || []}
                    type="essential"
                    value={partyPosition.position}
                    onSelect={handlePositionSelect}
                />

                <ChipList
                    title="기술 스택"
                    subtext="최대 3개까지 선택할 수 있어요"
                    chips={stackOptions}
                    size="large"
                    onChange={(selectedStacks) =>
                        setpartyPosition((prev) => ({
                            ...prev,
                            stack: selectedStacks,
                        }))
                    }
                />

                <ActionBtn btnName ='추가하기'
                type={partyPosition.stack.length > 0 ? 'default' : 'disabled'}
                onClick={() => {onAdd(partyPosition)}}
                ></ActionBtn>
            </SheetCon>
        </>
    )
}

export default BottomSheet;