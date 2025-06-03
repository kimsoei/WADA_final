import styled from "styled-components";
import ChipList from "./ChipList";


const CardWrap = styled.div`
    width: 362px;
    height: 572px;
    padding: 0px 20px 32px 20px;
    background-color: ${({ theme }) => theme.colors.gray[50]};
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    gap: 28px;
`

const PersonalBox = styled.div`
    padding: 0px 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 40px;
`

const PersonalText = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;

    gap: 2px;
`

const IconBox = styled.div`
    width: 70px;
    height: 70px;
    background-color: #222;
    border-radius: 36px;

    background-image: url("/DesignerProfile.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`

const Name = styled.p`
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray[700]};
    margin-bottom: 4px;
`

const Enroll = styled.p`
`

const Major = styled.p`
`

const BorderLine = styled.div`
    width: 100%;
    height: 1px;
    background-color:${({ theme }) => theme.colors.gray[400]};
`

const PositionBox = styled.div`
    display:flex;
    flex-direction: column;
    gap: 24px;
    flex-grow: 1;
`

const TaskBox = styled.div`
    display: flex;
    gap: 4px;

    align-items: center;
`

const Task = styled.p`
    font-size: 18px;
    font-weight: 700;
`

const Logo = styled.div`
    font-family: poppins;
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray[500]};
    width: 100%;
    text-align: center;
    margin: 12px 0px 0px 0px;
`

const EmptyWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 572px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.gray[50]};
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

    color: ${({ theme }) => theme.colors.gray[400]};
    text-align: center;

    & > h1{
    color: ${({ theme }) => theme.colors.gray[600]};
    font-size: 20px;
    }
`

function ProfileCard({profileData}){

      if (!profileData) {
        return (
            <EmptyWrap>
               <h1>프로필 카드가 없어요.</h1>
               <p>아래 버튼을 눌러 프로필을 작성하세요.</p>
            </EmptyWrap>
        );
    }

    let TaskIcon = '/designer.svg'
    if (profileData.task === '디자이너') {
        TaskIcon = '/designer.svg';
    } else if (profileData.task === '개발자') {
        TaskIcon = '/programmer.svg';
    } else if (profileData.task === '기획자') {
        TaskIcon = '/productmanager.svg';
    }   

    console.log({TaskIcon})

    return(
        <>
            <CardWrap>
                <img src="/Tag.svg" style={{width: '24px'}}></img>
                <PersonalBox>
                    <IconBox></IconBox>
                    <PersonalText>
                        <Name>{profileData.name}</Name> 
                        <Enroll>{profileData.enroll}</Enroll>
                        <Major>{profileData.major}&nbsp;{profileData.grade}</Major>
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
                        type='none'
                        size="large"
                        chips={profileData.position}
                        unLock={false}
                    />
                     <ChipList
                        title="기술 스택"
                        type='none'
                        size="large"
                        chips={profileData.stack}
                        unLock={false}
                    />
                </PositionBox>
                <Logo>
                    parple
                </Logo>
            </CardWrap>
        </>
    )
}

export default ProfileCard