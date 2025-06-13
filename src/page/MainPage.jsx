import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/theme";

import Header from "../jsx/Header";
import PostList from "../jsx/PostList";
import BottomNavigation from "../jsx/BottomNavigation";

import Banner from "../jsx/Banner";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase.js";

const ServiceTip = styled.div`
  width: 100%;
  max-width: 362px;
  height: 180px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 10px;
  background-color: #fff;
  border-radius: ${theme.radius.medium};
  margin-top: 20px;
  margin-bottom: 12px;
`;

export default function MainPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let tempData = [];
    db.collection("post")
      .get()
      .then((qs) => {
        qs.forEach((doc) => {
          tempData.push(doc.data());
        });
        setPosts(tempData);
      });
  }, []);

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


  return (
    <>
      <Header type="default" badge={false} />

      <div className="content_wrap">
        <ServiceTip>
          <h1 className="TipTitle">프로젝트 팀원, 간단하게 구하자!</h1>
          <div className="TipWrap">
            <div className="TipItem">
              <img src="/first.svg"></img>
              <h5 className="TipSubText">
                프로젝트
                <br />
                정보등록
              </h5>
            </div>
            <img className="TipImg" src="/nextImg.svg"></img>
            <div className="TipItem">
              <img src="/second.svg"></img>
              <h5 className="TipSubText">
                모집글
                <br />
                작성
              </h5>
            </div>
            <img className="TipImg" src="/nextImg.svg"></img>
            <div className="TipItem">
              <img src="/three.svg"></img>
              <h5 className="TipSubText">
                지원자
                <br />
                확인
              </h5>
            </div>
          </div>
        </ServiceTip>

        <Banner type="dark" onClick={() => navigate("/profile")} />
        <Banner type="light" onClick={() => navigate("/post")} />

        <div className="ConTitleWrap">
          <h2 className="ConTitle">파티 모집</h2>
          <div className="ConBtn" onClick={() => navigate("/post")}>
            <span className="allView">전체보기</span>
            <img className="main_arrow" src="/arrow_right.svg" />
          </div>
        </div>

        <PostList limit={4} type="homeList" posts={posts} />
      </div>

      <BottomNavigation />
    </>
  );
}
