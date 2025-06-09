import styled from "styled-components";
import ApplicantListItem from "./ApplicantListItem";

const ListWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export default function ApplicantList({ applicants = [], onClickItem }) {
    return (
        <ListWrap>
        {applicants.length === 0 ? (
            <ApplicantListItem type="not" />
        ) : (
            applicants.map((applicant, index) => {
            let type = "default";
            if (applicant.notice === "rejected") type = "disabled";
            if (applicant.notice === "accepted") type = "default";
            if (!applicant.notice || applicant.notice === "wait") type = "default";

            return (
                <ApplicantListItem
                key={index}
                imageUrl={applicant.profile?.imageUrl}
                name={applicant.profile?.name}
                type={type}
                onClick={() => onClickItem(applicant)}
                />
            );
            })
        )}
        </ListWrap>
    );
}
