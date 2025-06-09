import styled from "styled-components";
import Header from "../jsx/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../jsx/InputText";
import InputDropdown from "../jsx/InputDropdown";
import ChipList from "../jsx/ChipList";
import ActionBtn from "../jsx/ActionBtn";
import { useEffect } from "react";

import { db } from "../firebase";
import SelectBtnWrap from "../jsx/SelectBtnWrap";

const ProfileWriteWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`

const EmptySpace = styled.div`
    background-color: #fff;
    width: 100%;
    height: 30px;
`

const InfoTextWrap = styled.div`
    height: 148px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 0px;
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

function ProfileWritePage(){

    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: '',
        major: '',
        description: '',
        grade:'',
        enroll: '',
        task: '',
        position: [],
        stack: []
    });

    const positionOptions = {
        디자이너: ['UI 디자이너', 'UX 디자이너', 'BX 디자이너', 'UX 전략가', '서비스 디자이너', '3D 디자이너', '모션 디자이너', '일러스트레이터', 'BI 디자이너'],
        개발자: ['프론트엔드', '백엔드', '풀스택', '퍼블리셔', '개발자', '서버 관리자', 'IOS 개발자', 'Android 개발자', 'SRE', '데브옵스', '데이터 엔지니어'],
        기획자: ['서비스 기획자', 'PM', '콘텐츠 기획자', '마케팅 기획자', '경쟁 분석가', '기능 설계자', '플로우 설계자'],
    };

    const stackOptions = {
        디자이너: ['Figma', ' Adobe XD', 'Photoshop', 'Illustrator', 'Whimsical', 'Affter Effecs', 'Cinema4D'],
        개발자: ['React', 'Node.js', 'J-Queary', 'TypeScript', 'MongoDB', 'Swift', 'Xcode', 'Kotlin', 'Android Studio', 'Expo', 'Python','AWS' ],
        기획자: ['Notion', 'Excel', 'Jira', 'rello', 'Google Analytics', 'PPT'],
    };

const [existingProfileId, setExistingProfileId] = useState(null);


const handleSave = () => {
    const data = { ...profileData };

    if (existingProfileId) {
        db.collection('profile').doc(existingProfileId)
        .update(data)
        .then(() => {
            alert('프로필 수정 완료!');
            navigate('/profile');
        });
    } else {
        const timestamp = new Date().getTime().toString();
        db.collection('profile').doc(timestamp)
        .set({ id: timestamp, ...data })
        .then(() => {
            alert('프로필 저장 완료!');
            navigate('/profile');
        });
    }
};

useEffect(() => {
    db.collection("profile").get().then((qs) => {
        const docs = qs.docs;
        if (docs.length > 0) {
        const doc = docs[0];
        setExistingProfileId(doc.id); // 🔴 기존 문서 ID 기억
        setProfileData(doc.data());
        }
    });
}, []);

    return(
        <>
            <Header type="back" title="프로필 작성" backTo="/profile" />

            <EmptySpace></EmptySpace>

            <div className="write_content_wrap">
                <InfoTextWrap>
                    <InfoTitle>{existingProfileId ? "프로필카드 수정" : "프로필카드 작성"}</InfoTitle>
                    <InfoText>프로필 정보를 입력해 주세요</InfoText>
                </InfoTextWrap>

            <ProfileWriteWrap>
            <InputText
                title="프로필 이름"
                placeholder="원하는 프로필의 이름을 작성해주세요"
                type="essential"
                topic={true}
                value={profileData.name}
                onChange={(val) => setProfileData({ ...profileData, name: val })}
            />

            <InputText
                title="전공"
                placeholder="전공을 입력해주세요"
                type="essential"
                topic={true}
                value={profileData.major}
                onChange={(val) => setProfileData({ ...profileData, major: val })}
            />

                <InputDropdown
                title="학년"
                placeholder="학년을 선택해주세요"
                items={['1학년', '2학년', '3학년', '4학년']}
                type="essential"
                value={profileData.grade}
                onSelect={(val) => setProfileData({ ...profileData, grade: val })}
            />

                <SelectBtnWrap
                title="재학 상태"
                items={['재학', '휴학']}
                mode="single"
                essential={false}
                value={profileData.enroll}
                onChange={(val) => setProfileData({ ...profileData, enroll: val })}
            />

            <SelectBtnWrap
                title="분야"
                items={['디자이너', '개발자', '기획자']}
                mode="single"
                essential={true}
                value={profileData.task}
                onChange={(val) => setProfileData({ ...profileData, task: val })}
            />

            <ChipList
                title="포지션"
                subtext="최대 3개까지 선택할 수 있어요"
                chips={positionOptions[profileData.task] || []}
                size="large"
                selectedChips={profileData.position}
                onChange={(val) => setProfileData({ ...profileData, position: val })}
            />

            <ChipList
                title="기술 스택"
                subtext="최대 3개까지 선택할 수 있어요"
                chips={stackOptions[profileData.task] || []}
                size="large"
                selectedChips={profileData.stack}
                onChange={(val) => setProfileData({ ...profileData, stack: val })}
            />

            </ProfileWriteWrap>

                <div className="writeActionBtn">
                    <ActionBtn btnName ='완료'
                        type={'default'}
                        onClick={handleSave}
                    ></ActionBtn>
                </div>
            </div>
        </>
    )
}

export default ProfileWritePage