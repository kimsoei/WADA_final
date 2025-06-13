import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Header from "../jsx/Header";
import BottomNavigation from "../jsx/BottomNavigation";
import ApplicantWrap from "../jsx/ApplicantWrap";
import styled from "styled-components";
import PostList from "../jsx/PostList";

const PostContentWrap = styled.div`
  width: 100%;
  height: calc(875px - 52px - 58px);
  overflow-y: scroll;
  z-index: -1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AuthorTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  background-color: #fff;
  padding: 24px 0 0 20px;
  margin-top: 12px;
`;

export default function AuthorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [groupedApplicants, setGroupedApplicants] = useState({});
  const [authorImageUrl, setAuthorImageUrl] = useState(null);

  useEffect(() => {
    db.collection("post")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const postData = { id: doc.id, ...doc.data() };
          setPost(postData);

          if (postData?.author) {
            db.collection("profile")
              .where("name", "==", postData.author)
              .get()
              .then((profileSnap) => {
                if (!profileSnap.empty) {
                  const profileData = profileSnap.docs[0].data();
                  setAuthorImageUrl(profileData.imageUrl || null);
                }
              });
          }
        }
      });
  }, [id]);

  useEffect(() => {
    const fetchApplicants = async () => {
      const snapshot = await db
        .collection("applications")
        .where("postId", "==", id)
        .get();

      const applicants = snapshot.docs.map((doc) => ({
        applicationId: doc.id,
        ...doc.data(),
      }));

      const grouped = {};
      applicants.forEach((app) => {
        const title = app.position?.title || "기타";
        if (!grouped[title]) grouped[title] = [];
        grouped[title].push(app);
      });

      setGroupedApplicants(grouped);
    };

    fetchApplicants();
  }, [id]);

  return (
    <>
      <Header type="back" title="지원자 확인" backTo="/party" />
      <PostContentWrap>
        {post && (
          <PostList
            type="postList"
            posts={[{ ...post, authorImageUrl }]}
            onItemClick={() => {}}
          />
        )}

        <AuthorTitle>지원 현황</AuthorTitle>

        {post ? (
          <ApplicantWrap
            positions={post.positions}
            applicants={groupedApplicants}
            onClickApplicant={(application) =>
              navigate(`/signup/view/${application.applicationId}`, {
                state: application,
              })
            }
          />
        ) : (
          <p style={{ padding: "20px" }}>로딩 중...</p>
        )}
      </PostContentWrap>
      <BottomNavigation />
    </>
  );
}
