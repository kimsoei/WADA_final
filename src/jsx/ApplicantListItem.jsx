import styled from 'styled-components';

const ItemWrap = styled.div`
    width: 100%;
    max-width: 362px;
    padding: 12px;
    max-height: 48px;
    border-radius: ${({ theme }) => theme.radius.small};
    background-color: ${({ theme }) => theme.colors.gray[100]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;

const TextWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.gray[800]};
`;

const ProfileImg = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 999px;
    object-fit: cover;
    overflow: hidden;
`;

const UserName = styled.p`
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
`;

const IconBtn = styled.img`
    width: 20px;
    height: 20px;
`;

const DefaultImg = '/vite.svg'; 

function ApplicantListItem({ imageUrl, name }) {
    return (
        <ItemWrap>
        <TextWrap>
            <ProfileImg src={imageUrl || DefaultImg} />
            <UserName>{name || '신청자'}</UserName>
        </TextWrap>
        <IconBtn src="/arrow_right.svg" alt="보기 버튼" />
        </ItemWrap>
    );
}

export default ApplicantListItem;
