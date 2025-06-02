import styled from 'styled-components';

const ActionButton = styled.button`
    width: 100%;
    max-width: 362px;
    max-height: 54px;
    padding: 16px 10px;
    border-radius: ${({ theme }) => theme.radius.small};
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    cursor: pointer;

    ${({ theme, $btntype }) => {
        switch ($btntype) {
        case 'outline':
            return `
            background-color: ${theme.colors.secondary};
            color: ${theme.colors.primary};
            border: 1px solid ${theme.colors.primary};
            `;
        case 'outline-disabled':
            return `
            background-color: ${theme.colors.gray[50]};
            color: ${theme.colors.gray[400]};
            border: 1px solid ${theme.colors.gray[300]};
            cursor: not-allowed;
            `;
        case 'disabled':
            return `
            background-color: ${theme.colors.disabled};
            color: #fff;
            cursor: not-allowed;
            `;
        case 'default':
        default:
            return `
            background-color: ${theme.colors.primary};
            color: #fff;
            `;
        }
    }}
`;

export default function ActionBtn({ type = 'default', btnName = '버튼', onClick }) {
    return (
        <ActionButton
        $btntype={type}
        disabled={type === 'disabled'}
        onClick={type === 'disabled' ? undefined : onClick}
        >
        {btnName}
        </ActionButton>
    );
}
