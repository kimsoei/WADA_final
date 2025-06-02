import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ApplicantListItem from './ApplicantListItem';

/* import { getApplicants } from '../utils/firebase';  */

const ListWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

function ApplicantList() {
    const [applicants, setApplicants] = useState([]);

    /* useEffect(() => {
        async function fetchApplicants() {
        const data = await getApplicants();
        setApplicants(data);
        }

        fetchApplicants();
    }, []); */

    useEffect(() => {

    const mockData = [
        {
            name: '김지원',
            imageUrl: 'https://i.postimg.cc/SNDGP9x1/image.png',
        },
        {
            name: '박하늘',
            imageUrl: '',
        },
        {
            name: '',
            imageUrl: 'https://i.postimg.cc/SNDGP9x1/image.png',
        },
    ];
        setApplicants(mockData);
    }, []);

    return (
        <ListWrap>
        {applicants.map((applicant, index) => (
            <ApplicantListItem
            key={index}
            imageUrl={applicant.imageUrl}
            name={applicant.name}
            />
        ))}
        </ListWrap>
    );
}

export default ApplicantList;
