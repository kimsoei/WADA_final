import styled from "styled-components";
import PostItem from "./PostItem";
import { useNavigate } from "react-router-dom";

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`;

function PostList({ posts = [], type = "postList", limit = null }) {
  const navigate = useNavigate();
  const sortedData = posts.sort((a, b) => b.id - a.id);
  const postLimit = limit ? sortedData.slice(0, limit) : sortedData;

  return (
    <ListWrap>
      {postLimit.map((item, index) => {
        const post = type === "appliedList" ? item.post : item;

        return (
          <PostItem
            key={index}
            {...post}
            type={type}
            notice={item.notice}
            onClick={() => {
              if (type === "appliedList") {
                navigate(`/post/${post.id}`);
              } else if (type === "partyList") {
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
