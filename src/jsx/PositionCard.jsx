import styled from 'styled-components';
import CheckIcon from "../assets/icons/check.svg?react";

const CardWrap = styled.div.attrs({ role: 'button' })`
    max-width: 362px;
    width: 100%;
    border-radius: ${({ theme }) => theme.radius.large};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;

    background-color: ${({ type, theme }) =>
        type === 'selected' ? theme.colors.secondary :
        type === 'disabled' ? theme.colors.gray[50] : '#fff'};

    border: 1px solid
        ${({ type, theme }) =>
        type === 'selected' ? theme.colors.primary :
        type === 'disabled' ? theme.colors.gray[100] : theme.colors.gray[300]};
`;

const TextWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: 700;
    color: ${({ type, theme }) =>
        type === 'disabled' ? theme.colors.gray[300] : theme.colors.gray[800]};
`;

const SubText = styled.p`
    font-size: 14px;
    color: ${({ type, theme }) =>
        type === 'disabled' ? theme.colors.gray[200] : theme.colors.gray[400]};
`;

const StyledCheck = styled.div`
    width: 24px;
    height: 24px;
    color: ${({ type, theme }) =>
        type === 'selected' ? theme.colors.primary : theme.colors.gray[300]};
    transition: color 0.2s ease;

    svg {
        width: 100%;
        height: 100%;
    }
`;

function PositionCard({ type = 'default', title = '', skills = '', onClick }) {
    return (
        <CardWrap type={type} onClick={onClick}>
        <TextWrap>
            <Title type={type}>{title}</Title>
            <SubText type={type}>
                {Array.isArray(skills) ? skills.join(' · ') : skills}
            </SubText>
        </TextWrap>
        <StyledCheck type={type}>
            <CheckIcon />
        </StyledCheck>
        </CardWrap>
    );
}

export default PositionCard;
