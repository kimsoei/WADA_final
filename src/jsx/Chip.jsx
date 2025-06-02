import styled from 'styled-components';

const BasicChip = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    line-height: 150%;
    border-radius: ${({ theme }) => theme.radius.small};
    cursor: pointer;

    ${({ theme, selected }) =>
    selected
        ? `
            background-color: ${theme.colors.secondary};
            color: ${theme.colors.primary};
        `
        : `
            background-color: ${theme.colors.gray[200]};
            color: ${theme.colors.gray[600]};
        `}
`;

export const SmallChip = styled(BasicChip)`
    font-size: 12px;
    font-weight: 400;
    padding: 3px 8px;
`;

export const MediumChip = styled(BasicChip)`
    font-size: 14px;
    padding: 4px 10px;
`;

export const LargeChip = styled(BasicChip)`
    padding: 4px 12px;
    font-size: 16px;
`;
