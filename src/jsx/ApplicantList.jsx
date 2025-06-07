import styled from "styled-components";
import ApplicantListItem from "./ApplicantListItem";

const ListWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export default function ApplicantList({ applicants = [] }) {
    return (
        <ListWrap>
        {applicants.length === 0 ? (
            <div style={{
            padding: "16px",
            backgroundColor: "#F0F0F0",
            borderRadius: "8px",
            color: "#999",
            textAlign: "center"
            }}>
            아직 지원자가 없어요
            </div>
        ) : (
            applicants.map((applicant, index) => (
            <ApplicantListItem
                key={index}
                imageUrl={applicant.imageUrl}
                name={applicant.name}
            />
            ))
        )}
        </ListWrap>
    );
}
