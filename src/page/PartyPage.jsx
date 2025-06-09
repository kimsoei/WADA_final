import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/theme";

import Header from "../jsx/Header";
import BottomNavigation from "../jsx/BottomNavigation";

import TabMenu from "../jsx/TabMenu";
import PostList from "../jsx/PostList";

import { useEffect, useState } from "react";
import { db } from "../firebase";

const PostContentWrap = styled.div`
  width: 100%;
  height: calc(875px - 52px - 58px - 95px);
  overflow-y: scroll;
  z-index: -1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const EmptyWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.gray[600]};
`;

export default function PartyPage() {
  const [profile, setProfile] = useState(null);
  const [myPosts, setMyPosts] = useState([]);

  const [selectedTab, setSelectedTab] = useState("모집한 파티");
  const [appliedPosts, setAppliedPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!profile?.name) return;

    const fetchApplications = async () => {
      const snapshot = await db
        .collection("applications")
        .where("profile.name", "==", profile.name)
        .get();

      const appData = [];
      for (const doc of snapshot.docs) {
        const data = doc.data();
        const postDoc = await db.collection("post").doc(data.postId).get();
        if (postDoc.exists) {
          appData.push({
            applicationId: doc.id,
            ...data,
            post: postDoc.data(),
          });
        }
      }
      setAppliedPosts(appData);
    };

    if (selectedTab === "지원한 파티") {
      fetchApplications();
    }
  }, [profile?.name, selectedTab]);

  useEffect(() => {
    const fetch = async () => {
      const profileSnap = await db.collection("profile").get();
      const profileData = profileSnap.docs[0]?.data();
      setProfile(profileData);
      if (!profileData?.name) return;

      const postSnap = await db.collection("post").get();
      const result = [];

      postSnap.forEach((doc) => {
        const data = doc.data();
        const alreadyIncluded = result.some((item) => item.id === doc.id);
        if (data.author === profileData.name && !alreadyIncluded) {
          result.push({ id: doc.id, ...data });
        }
      });

      setMyPosts(result);
    };

    fetch();
  }, []);

  return (
    <>
      <Header type="back" title="내 파티" />
      <div className="PostTopCon">
        <TabMenu
          items={["모집한 파티", "지원한 파티"]}
          onChange={(value) => setSelectedTab(value)}
        />
      </div>

      <PostContentWrap>
        <PostContentWrap>
          {selectedTab === "모집한 파티" ? (
            myPosts.length === 0 ? (
              <EmptyWrap>글이 없습니다</EmptyWrap>
            ) : (
              <PostList
                type="partyList"
                posts={myPosts}
                onItemClick={(post) => navigate(`/author/${post.id}`)}
              />
            )
          ) : appliedPosts.length === 0 ? (
            <EmptyWrap>지원한 글이 없습니다</EmptyWrap>
          ) : (
            <PostList
              type="appliedList"
              posts={appliedPosts}
              onItemClick={(app) =>
                navigate(`/signup/view/${app.applicationId}`, {
                  state: app,
                })
              }
            />
          )}
        </PostContentWrap>
      </PostContentWrap>
      <BottomNavigation />
    </>
  );
}
