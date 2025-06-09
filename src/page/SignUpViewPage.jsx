import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import Header from "../jsx/Header";
import ActionBtn from "../jsx/ActionBtn";
import ProfileCard from "../jsx/ProfileCard";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    height: 100%;
`;

const Section = styled.div`
    padding: 16px 20px;
`;

const Title = styled.p`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
`;

const Message = styled.p`
    color: ${({ theme }) => theme.colors.gray[900]};
    font-size: 16px;
    line-height: 150%;
    white-space: pre-wrap;
    border-radius: ${({ theme }) => theme.radius.small};
    width: 100%;
    resize: none;
    height: auto;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
    padding: 16px 20px;
    margin-top: 32px;
    position: absolute;
    width: 100%;
    bottom: 0%;
`;

export default function SignUpViewPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { profile, message = "", position, applicationId } = state || {};

    const handleNoticeChange = async (newStatus) => {
        await db.collection("applications").doc(applicationId).update({
        notice: newStatus,
        });
        alert(`지원 상태가 '${newStatus}'로 변경되었습니다.`);
        navigate("/party");
    };

    const stackText  = Array.isArray(position?.stack) ? position.stack.join(" · ") : "";





    return (
        <>
        <Header type="back" title="지원자 확인" backTo="/party" />
        <Container>
            <Section>
            <ProfileCard profileData={profile} />
            </Section>

            <Section>
            <Title>자유로운 한 마디</Title>
            <Message>{message || "입력한 한 마디가 없습니다."}</Message>
            </Section>

            <ButtonGroup>
            <ActionBtn btnName="반려" type="outline" onClick={() => handleNoticeChange("rejected")} />
            <ActionBtn btnName="승인" type="default" onClick={() => handleNoticeChange("accepted")} />
            </ButtonGroup>
        </Container>
        </>
    );
}
