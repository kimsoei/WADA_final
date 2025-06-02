import styled from 'styled-components';

const SelectButton = styled.button`
    width: 100%;
    max-width: 177px;
    padding: 12px 16px;
    border-radius: ${({ theme }) => theme.radius.small};
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    background-color: ${({ theme, selected }) =>
        selected ? theme.colors.secondary : '#fff'};
    color: ${({ theme, selected, disabled }) => {
        if (disabled) return theme.colors.gray[400];
        return selected ? theme.colors.primary : theme.colors.gray[700];
    }};
    border: 1px solid
        ${({ theme, selected, disabled }) => {
        if (disabled) return theme.colors.gray[400];
        return selected ? theme.colors.primary : theme.colors.gray[400];
        }};
`;

export default function SelectBtn({ label, selected, disabled, onClick }) {
    return (
        <SelectButton onClick={onClick} selected={selected} disabled={disabled}>
        {label}
        </SelectButton>
    );
}
