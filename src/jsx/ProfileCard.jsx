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
    width: 154px;
    display: flex;
    flex-direction: column;

    gap: 2px;
`

const IconBox = styled.div`
    width:68px;
    height: 68px;
    background-color: #222;
    border-radius: 36px;
`

const Name = styled.p`
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray[700]};
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
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 572px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.gray[0]};
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`

function ProfileCard({profileData}){

      if (!profileData) {
        return (
            <EmptyWrap>
               <img src="/empty.svg"></img>
            </EmptyWrap>
        );
    }

    return(
        <>
            <CardWrap>
                <img src="/Tag.svg" style={{width: '24px'}}></img>
                <PersonalBox>
                    <IconBox></IconBox>
                    <PersonalText>
                        <Name>{profileData.name}</Name> 
                        <Enroll>{profileData.enroll}</Enroll>
                        <Major>{profileData.major}{profileData.grade}</Major>
                    </PersonalText>
                </PersonalBox>
                <BorderLine></BorderLine>
                <PositionBox>
                    <TaskBox>
                        <img src="/pencil.svg"></img>
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