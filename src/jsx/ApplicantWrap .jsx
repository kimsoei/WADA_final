import styled from "styled-components";
import ApplicantList from "./ApplicantList";

const PositionTitle = styled.h3`
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray[800]};
    margin-top: 8px;
`;

const SkillText = styled.p`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[400]};
    margin-bottom: 16px;
    margin-top: 4px;
`;

const ApplicantCount = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    line-height: 150%;
    font-size: 14px;

    & .label {
        font-weight: 500;
        color: ${({ theme }) => theme.colors.gray[800]};
    }

    & .count {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const ApplicantWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px 20px;
    background-color: #fff;
`;

export default function PostContentWrap({ positions = [], applicants = [] }) {
    return (
        <>
            {positions.map((pos, idx) => (
                <ApplicantWrap key={idx}>
                    <ApplicantCount>
                        <span className="label">지원자</span>
                        <span className="count">{applicants.length}명</span>
                    </ApplicantCount>
                    <PositionTitle>{pos.position}</PositionTitle>
                    <SkillText>{pos.stack?.join(" · ")}</SkillText>
                    <ApplicantList applicants={applicants} />
                </ApplicantWrap>
            ))}
        </>
    );
}
