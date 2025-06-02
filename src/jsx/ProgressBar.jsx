import styled from 'styled-components';

const ProgressWrap = styled.div`
    padding: 8px 20px;
    display: flex;
    align-items: end;
    justify-content: space-between;
    width: 100%;
    max-width: 402px;
    gap: 2px;
    min-height: 30px;
`;

const Gauge = styled.div`
    flex: 1;
    height: 2px;
    background-color: ${({ theme, $active }) =>
        $active ? theme.colors.primary : theme.colors.gray[300]};
`;


function Progress({ step = 1 }) {
    return (
        <ProgressWrap>
        {[1, 2].map((progressIndex) => (
            <Gauge key={progressIndex} $active={progressIndex <= step} />
        ))}
        </ProgressWrap>
    );
}

export default Progress;
