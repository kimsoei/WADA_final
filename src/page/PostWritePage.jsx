import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../jsx/Header';
import ProgressBar from '../jsx/ProgressBar';
import InputText from '../jsx/InputText';
import InputDropdown from '../jsx/InputDropdown';
import SelectBtnWrap from '../jsx/SelectBtnWrap';
import ActionBtn from '../jsx/ActionBtn';

// 여기서부터 파베 추가입니다!
import {db} from '../firebase'
import BottomSheet from '../jsx/BottomSheet';
import PositionCardList from '../jsx/PositionCardList';

const Scrim = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`

const InfoTextWrap = styled.div`
    height: 148px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 0px;
`;

const StepText = styled.p`
    font-size: 14px;
    line-height: 150%;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[500]};
`;

const InfoTitle = styled.p`
    font-size: 24px;
    line-height: 28px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray[800]};
`;

const InfoText = styled.p`
    font-size: 18px;
    line-height: 150%;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[800]};
`;

const InputWrap = styled.div`
    width:100%
`;

const StepOneWrap = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
`

const StepTwoWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`

export default function PostWritePage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    // <= 바텀시트 , 스크림 제어용

    const [formData, setFormData] = useState({
        topic: '',
        category: '',
        purpose: [],
        status: '',
        description: '',
        positions: []
    });

    const isStep1Valid =
        formData.topic.trim() !== '' &&
        formData.category !== '' &&
        formData.purpose.length > 0 &&
        formData.description.trim() !== '';

    const isStep2Valid = formData.positions.length > 0;
    // recruitdetail??이게 먼지 모르겠어서 일단 포지션카드의 개수로 바꿨으여 positions는 포지션별 데이토에요요

    const positionCardLimit = formData.positions.length >= 3;


    const handleNext = () => {
        if (step === 1 && isStep1Valid) {
            setStep(2);
        } else if (step === 2 && isStep2Valid) {
            console.log('신청 데이터:', formData);
            
            // 여기서부터 파베 추가입니다!
            let timestamp = new Date().getTime().toString()
            db.collection('post').doc(timestamp).set({
                id: timestamp,
                date: Date.now(),
            viewCount: 0,
                ...formData,
            }).then(()=>{
                alert('성공이길.. 제발..!')
                navigate('/post'); 
            })
        }
    };

    return (
        <>
            <Header type="back" title="모집글 작성" backTo="/post" />
            <div className="white-bg">
                <ProgressBar step={step} />
            </div>

            <div className="write_content_wrap">
            <InfoTextWrap>
                <StepText>{step}/2</StepText>
                <InfoTitle>
                    {step === 1 ? '기본 정보 입력' : '모집 포지션 입력'}
                </InfoTitle>
                <InfoText> {step === 1 ? '프로젝트의 기본 정보를 입력해주세요' : '필요한 파티원의 포지션을 등록해주세요'}</InfoText>
            </InfoTextWrap>

            <InputWrap key={step}>
                {step === 1 ? (
                    
                <StepOneWrap>
                <InputText
                    title="프로젝트 주제"
                    placeholder="구체적인 프로젝트 주제를 입력해 주세요"
                    type="essential"
                    topic={true}
                    value={formData.topic}
                    onChange={(val) => setFormData({ ...formData, topic: val })}
                />

                <InputDropdown
                    title="카테고리"
                    placeholder="카테고리를 선택해주세요"
                    items={['졸업작품', '사이드 프로젝트', '공모전', '기타']}
                    type="essential"
                    value={formData.category}
                    onSelect={(val) => setFormData({ ...formData, category: val })}
                />
                <div>
                <SelectBtnWrap
                    title="프로젝트 목적"
                    subtext="최대 2개까지 선택할 수 있어요"
                    items={['포트폴리오', '수상', '네트워킹', '실무연습', '졸업', '자기개발', '기타']}
                    mode="multi"
                    essential={true}
                    value={formData.purpose}
                    onChange={(val) => setFormData({ ...formData, purpose: val })}
                />
                </div>

                <div>
                <SelectBtnWrap
                    title="프로젝트 현황"
                    items={['진행전', '진행중']}
                    mode="single"
                    essential={false}
                    value={formData.status}
                    onChange={(val) => setFormData({ ...formData, status: val })}
                />
                </div>

                <InputText
                    title="프로젝트 소개"
                    placeholder="프로젝트 상세 정보를 입력해 주세요."
                    type="essential"
                    topic={false}
                    value={formData.description}
                    onChange={(val) => setFormData({ ...formData, description: val })}
                />
                </StepOneWrap>

                ) :

                (
                    <StepTwoWrap>
                        <PositionCardList
                            cards={formData.positions.map((pos) => ({ title: `${pos.position}`, skills: pos.stack }))} mode="single"/>
                        <ActionBtn 
                        type={positionCardLimit? 'disabled' : 'outline'}
                        btnName='+ 파티원 추가'
                        onClick={()=> {if (!positionCardLimit) setBottomSheetOpen(true);}}
                        />
                    </StepTwoWrap>

                )}
                </InputWrap>

                <div className="writeActionBtn">
                    <ActionBtn
                    btnName={step === 2 ? '완료' : '다음'}
                    onClick={handleNext}
                    type={step === 1 ? (isStep1Valid ? 'default' : 'disabled') : isStep2Valid ? 'default' : 'disabled'}
                    />
                </div>
                
            {bottomSheetOpen && (
                <>
                <Scrim onClick={() => setBottomSheetOpen(false)} />
                <BottomSheet
                    onClose={() => setBottomSheetOpen(false)}
                    onAdd={(newPosition) => {
                            setFormData(prev => ({
                                ...prev, positions: [...prev.positions, newPosition]
                            }));
                        setBottomSheetOpen(false);
                    }}
                />
                </>
)}
            </div>
            </>
);}
