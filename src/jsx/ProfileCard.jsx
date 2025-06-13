import styled from "styled-components";
import ChipList from "./ChipList";
import { theme } from "../styles/theme";

const CardWrap = styled.div`
  width: 362px;
  height: 572px;
  padding: 0px 20px 32px 20px;
  background-color: ${theme.colors.gray[50]};
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const PersonalBox = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 40px;
`;

const PersonalText = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;

  gap: 2px;
`;

const IconBox = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 36px;
  overflow: hidden;
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.gray[700]};
  margin-bottom: 4px;
`;

const Enroll = styled.p``;

const Major = styled.p``;

const BorderLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.gray[400]};
`;

const PositionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-grow: 1;
`;

const TaskBox = styled.div`
  display: flex;
  gap: 4px;

  align-items: center;
`;

const Task = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const Logo = styled.div`
  font-family: poppins;
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.gray[500]};
  width: 100%;
  text-align: center;
  margin: 12px 0px 0px 0px;
`;

const EmptyWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 572px;
  border-radius: 8px;
  background-color: ${theme.colors.gray[50]};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

  color: ${theme.colors.gray[400]};
  text-align: center;

  & > h1 {
    color: ${theme.colors.gray[600]};
    font-size: 20px;
  }
`;

function ProfileCard({ profileData }) {
  if (!profileData) {
    return (
      <EmptyWrap>
        <h1>프로필 카드가 없어요.</h1>
        <p>아래 버튼을 눌러 프로필을 작성하세요.</p>
      </EmptyWrap>
    );
  }

  const TASK_ICONS = {
    디자이너: import.meta.env.BASE_URL + "/designer.svg",
    개발자: import.meta.env.BASE_URL + "/programmer.svg",
    기획자: import.meta.env.BASE_URL + "/productmanager.svg",
  };

  const PROFILE_ICONS = {
    디자이너: import.meta.env.BASE_URL + "/designerProfile.svg",
    개발자: import.meta.env.BASE_URL + "/programmerProfile.svg",
    기획자: import.meta.env.BASE_URL + "/productmanagerProfile.svg",
  };

  const TaskIcon =
    TASK_ICONS[profileData.task] || import.meta.env.BASE_URL + "/designer.svg";
  const ProfileIcon =
    PROFILE_ICONS[profileData.task] ||
    import.meta.env.BASE_URL + "/designerProfile.svg";

  console.log({ TaskIcon });
  console.log("task:", `"${profileData.task}"`);

  return (
    <>
      <CardWrap>
        <img
          src={import.meta.env.BASE_URL + "/Tag.svg"}
          style={{ width: "24px" }}
        ></img>
        <PersonalBox>
          <IconBox>
            <img
              src={ProfileIcon}
              alt="프로필 아이콘"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </IconBox>
          <PersonalText>
            <Name>{profileData.name}</Name>
            <Enroll>{profileData.enroll}</Enroll>
            <Major>
              {profileData.major}&nbsp;{profileData.grade}
            </Major>
          </PersonalText>
        </PersonalBox>
        <BorderLine></BorderLine>
        <PositionBox>
          <TaskBox>
            <img src={TaskIcon}></img>
            <Task>{profileData.task}</Task>
          </TaskBox>
          <ChipList
            title="선호 포지션"
            type="none"
            size="large"
            chips={profileData.position}
            unLock={false}
          />
          <ChipList
            title="기술 스택"
            type="none"
            size="large"
            chips={profileData.stack}
            unLock={false}
          />
        </PositionBox>
        <Logo>parple</Logo>
      </CardWrap>
    </>
  );
}

export default ProfileCard;
