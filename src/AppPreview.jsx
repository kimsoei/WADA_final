import styled from 'styled-components';

const AppLayout = styled.div`
    width: 402px;
    height: 875px;
    margin: 0 auto;
    border: 1px solid #ddd;
    box-shadow: 0 0 8px rgba(0,0,0,0.05);
    overflow: hidden;
    position: relative;
`;

export default function AppPreview({ children }) {
    return <AppLayout>{children}</AppLayout>;
}
