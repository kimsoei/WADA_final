import styled from 'styled-components';
import PostItem from './PostItem';
import { useNavigate } from 'react-router-dom';

const ListWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
`;

function PostList({ posts = [], type = 'postList', limit = null }) {
    const navigate = useNavigate();
    const sortedData = posts.sort((a, b) => b.id - a.id);
    const postLimit = limit ? sortedData.slice(0, limit) : sortedData;

return (
    <ListWrap>
        {postLimit.map((item, index) => {
        // 지원한 파티는 item 내부에 post, applicationId, status 등 포함
        const post = type === 'appliedList' ? item.post : item;

        return (
            <PostItem
            key={index}
            {...post}
            type={type}
            notice={item.notice} // <- 이거 있어야 ActionBtn 렌더링에 사용됨
            onClick={() => {
                // 지원한 파티일 경우 PostViewPage로 이동하도록 수정
                if (type === 'appliedList') {
                navigate(`/post/${post.id}`);
                } else if (type === 'partyList') {
                navigate(`/author/${item.id}`);
                } else {
                navigate(`/post/${item.id}`);
                }
            }}
            />
            );
        })}
        </ListWrap>
    );
}

export default PostList;
