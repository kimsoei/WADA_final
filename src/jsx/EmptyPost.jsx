import styled from "styled-components";

const EmptyCon = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.gray[0]};

    & > img{
        width: 64px;
    }
`

function EmptyPost(){

    return(
        <EmptyCon>
            <img src="/second.svg"></img>
        </EmptyCon>
    )
}

export default EmptyPost