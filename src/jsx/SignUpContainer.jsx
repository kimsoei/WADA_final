import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import InputText from "./InputText";

const PositionWrapper = styled.div`
  background: #fff;
  padding: 24px 20px;

  & > h6 {
    color: ${({ theme }) => theme.colors.gray[400]};
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 8px;
  }

  & > h1 {
    color: #444;
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 700;
    line-height: 150%;
    margin-bottom: 4px;
  }

  & > p {
    color: ${({ theme }) => theme.colors.gray[500]};
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
  }
`;

const ProfileWrapper = styled.div`
  background: #fff;
  padding: 24px 20px;

  & > p {
    color: #444;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    line-height: 150%;
    margin-bottom: 24px;
  }
`;

const InputWrapper = styled.div`
  background: #fff;
  padding: 24px 20px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;


function SignUpContainer({ selectedPosition, profile, message, setMessage }) {
  return (
    <PageWrapper>
      <PositionWrapper>
        <h6>지원 포지션</h6>
        <h1>{selectedPosition?.title}</h1>
        <p>{selectedPosition?.skills?.join(" • ")}</p>
      </PositionWrapper>

      <ProfileWrapper>
        <p>내 프로필</p>
        <ProfileCard profileData={profile} />
      </ProfileWrapper>

      <InputWrapper>
        <InputText
          title="자유로운 한 마디"
          placeholder="자유로운 한 마디를 적어주세요."
          type="default"
          topic={false}
          value={message}
          onChange={setMessage}
        />
      </InputWrapper>
    </PageWrapper>
  );
}


export default SignUpContainer;
