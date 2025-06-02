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

function PostList({ posts = [], type = 'postList',}) {
    const navigate = useNavigate();

    return (
        <ListWrap>
        {posts.map((post, index) => (
            <PostItem 
            key={index} 
            {...post} 
            type={type} 
            onClick={() => navigate(`/post/${post.id}`)
        } />
        ))}
        </ListWrap>
    );
}

export default PostList;
