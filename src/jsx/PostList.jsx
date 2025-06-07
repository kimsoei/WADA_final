import styled from 'styled-components';
import PostItem from './PostItem';
import { useNavigate } from 'react-router-dom';

const Title = styled.p`
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[800]};
`;

const ListWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
`;

function PostList({ posts = [], type = 'postList', limit=null}) {
    const navigate = useNavigate();
    const postLimit = limit ? posts.slice(0, limit) : posts;
    // limit 프롭스로 렌더링할 post개수 제한

    return (
        <ListWrap>
        {postLimit.map((post, index) => (
        <PostItem 
            key={index} 
            {...post} 
            type={type} 
            onClick={() => {
                if (type === 'partyList') {
                navigate(`/author/${post.id}`); //  모집자 확인 페이지로 이동
                } else {
                navigate(`/post/${post.id}`);   //  기존 상세 페이지
                }
            }} 
        />
        ))}
        </ListWrap>
    );
}

export default PostList;
