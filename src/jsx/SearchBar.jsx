import styled from 'styled-components';

const SearchBarWrap = styled.div`
    width: 100%;
    max-width: 362px;
    min-height: 44px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0px 20px;

    border-radius: ${({ theme }) => theme.radius.small};
    background-color: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[300]};
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
`;

const Input = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[900]};

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray[300]};
    }
`;

function SearchBar({ value, onChange }) {
    return (
        <SearchBarWrap>
        <Icon src="/search.svg" />
        <Input
            type="text"
            placeholder="프로젝트를 검색해보세요"
            value={value}
            onChange={onChange}
        />
        </SearchBarWrap>
    );
}

export default SearchBar;
