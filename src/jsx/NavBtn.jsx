import styled from "styled-components";

const IconCon = styled.div`
    display: flex;
    flex-direction: column;
    width: 72px;
    align-items: center;
    cursor: pointer;
`;

const StyledIcon = styled.div`
    width: 24px;
    height: 24px;
    color: ${({ selected, theme }) =>
        selected ? theme.colors.gray[800] : theme.colors.gray[300]};
    transition: color 0.2s ease;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const Menu = styled.p`
    font-size: 12px;
    font-weight: 500;
    line-height: 150%;
    margin-top: 4px;
    color: ${({ selected }) => (selected ? "#222222" : "#eeeeee")};
`;

function NavBtn({ menu, icon: Icon, selected, onClick }) {

    /* vsCode 표기 오류 떄문에 넣은 코드 */
    const Icons = Icon;

    return (
        <IconCon onClick={onClick}>
        <StyledIcon selected={selected}>
            <Icons />
        </StyledIcon>
        <Menu selected={selected}>{menu}</Menu>
        </IconCon>
    );
}

export default NavBtn;
