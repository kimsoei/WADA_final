import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../jsx/Header";
import SearchBar from "../jsx/SearchBar";
import PostList from "../jsx/PostList";
import BottomNavigation from "../jsx/BottomNavigation";
import TabMenu from "../jsx/TabMenu";
import { theme } from "../styles/theme";

// 여기서 부터 파베 추가입니다!
import { db } from "../firebase.js";
import { useEffect, useState } from "react";

const PostContentWrap = styled.div`
  width: 100%;
  height: calc(875px - 52px - 95px - 120px);
  overflow-y: scroll;
  z-index: -1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FloatingBtn = styled.button`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  z-index: 999px;
  bottom: 107px;
  right: 16px;
  background-color: ${theme.colors.primary};
  position: absolute;
`;

const FloatingImg = styled.img`
  width: 24px;
  height: 24px;
`;

const EmptyWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.gray[600]};
`;

export default function PostPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [search, setSearch] = useState("");

useEffect(() => {
  const fetchData = async () => {
    const profileSnap = await db.collection("profile").get();
    const postSnap = await db.collection("post").get();

    const profileMap = {};
    profileSnap.forEach((doc) => {
      const data = doc.data();
      if (data.name) profileMap[data.name] = data.imageUrl;
    });

    const result = [];
    postSnap.forEach((doc) => {
      const data = doc.data();
      result.push({
        id: doc.id,
        ...data,
        authorImageUrl: profileMap[data.author] || null,
      });
    });

    setPosts(result);
  };

  fetchData();
}, []);

  const filteredPosts = posts.filter((post) => {
    const CategoryPosts =
      selectedCategory === "전체" || post.category === selectedCategory;
    const SearchPosts = post.topic.toLowerCase().includes(search.toLowerCase());
    return CategoryPosts && SearchPosts;
  });

  return (
    <>
      <Header type="back" title="파티 모집 목록" />
      <div className="PostTopCon">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <TabMenu
          items={["전체", "졸업작품", "사이드 프로젝트", "공모전", "기타"]}
          onChange={(value) => setSelectedCategory(value)}
        />
      </div>

      <PostContentWrap>
        {filteredPosts.length === 0 ? (
          <EmptyWrap>글이 없습니다</EmptyWrap>
        ) : (
          <PostList type="postList" posts={filteredPosts} />
        )}
      </PostContentWrap>

      <FloatingBtn onClick={() => navigate("/post/write")}>
        <FloatingImg src="/pencil.svg" />
      </FloatingBtn>
      <BottomNavigation />
    </>
  );
}
