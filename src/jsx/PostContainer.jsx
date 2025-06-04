import { useRef, useState } from "react";
import styled from "styled-components";
import DotsIcon from "../assets/icons/dots_vertical.svg";
import TabMenu from "./TabMenu";
import PositionCardList from "./PositionCardList";
import { db } from "../firebase";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: visible;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  padding: 36px 20px 20px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  background-color: #fff;
  margin-bottom: 8px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
`;

const StyledTopicWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const StyledTopic = styled.div`
  color: ${({ theme }) => theme.colors.gray[900]};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
`;

const DateText = styled.p`
  font-size: 14px;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const PositionText = styled.p`
  font-size: 14px;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const AuthorInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const AuthorWrap = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const AuthorImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 999px;
`;

const ViewCountWrap = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: end;
`;

const AuthorName = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const ViewImg = styled.img`
  opacity: 0.8;
  width: 16px;
  height: 16px;
`;

const ViewCountNum = styled.span`
  font-size: 12px;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const DeadDate = styled.span`
  line-height: 150%;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const PositionWrapper = styled.div`
  background-color: #fff;
  padding: 24px 20px;
  align-self: stretch;
  & > h3 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 700;
  }
`;

const InformationsWrapper = styled.div`
  background-color: #fff;
  display: flex;
  padding: 24px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const InformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  & > .title {
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
  }
`;

const DescriptionWrapper = styled.div`
  flex-grow: 1;
  background-color: #fff;
  padding: 24px 20px;

  & > h3 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 700;
    line-height: 150%; /* 27px */
    color: ${({ theme }) => theme.colors.gray[800]};
  }

  & > p {
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    color: ${({ theme }) => theme.colors.gray[600]};
  }
`;

const TabMenuWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 10;
`;

const SectionWrapper = styled.div`
  scroll-margin-top: 58px;
  display: flex;
  flex-direction: column;

  &:last-child {
    flex-grow: 1;
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")}`;
}

function getDeadlineText(timestamp) {
  const today = new Date();
  const target = new Date(timestamp);
  const msDiff = target.getTime() - today.getTime();
  const dayDiff = Math.ceil(msDiff / (1000 * 60 * 60 * 24));
  return ` 마감 D-${dayDiff}일`;
}
function PostContainer(props) {
  const { post, setIsPositionSelected } = props;

  const postId = useParams().id;

  const refPosition = useRef(null);
  const refInformation = useRef(null);
  const refDescription = useRef(null);

  const scrollTo = (section) => {
    if (section === "모집 포지션" && refPosition.current) {
      refPosition.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "정보" && refInformation.current) {
      refInformation.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "소개" && refDescription.current) {
      refDescription.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [position, setPosition] = useState([]);

  useEffect(() => {
    db.collection("post")
      .doc(postId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const currentView = doc.data().viewCount || 0;

          db.collection("post")
            .doc(postId)
            .update({
              viewCount: currentView + 1,
            });
          // 조회수 부분이에여
        }
        const data = doc.data();

        const allPositions = data.positions;

        const cardData = allPositions.map((item) => ({
          title: item.position,
          skills: item.stack,
        }));

        setPosition(cardData);
        console.log("추출된 카드 데이터:", cardData);
      });
  }, []);

  const InfoItem = ({ label, value }) => {
    return (
      <InformationWrapper>
        <p className="title">{label}</p>
        <p>{value}</p>
      </InformationWrapper>
    );
  };

  return (
    <PageWrapper>
      <TitleWrapper>
        <TextWrapper>
          <StyledTopicWrapper>
            <StyledTopic>{post.topic}</StyledTopic>
            <img
              src={DotsIcon}
              style={{ cursor: "pointer" }}
              alt="수정/삭제 버튼"
            />
          </StyledTopicWrapper>

          <DateText>
            {post.projectDate?.[1]?.toDate && (
              <>
                {formatDate(post.projectDate[1].toDate())}까지 |
                <DeadDate>
                  {getDeadlineText(post.projectDate[1].toDate())}
                </DeadDate>
              </>
            )}
          </DateText>

          <PositionText>
            {Array.isArray(post.position)
              ? position.join(" · ")
              : post.position}
          </PositionText>
        </TextWrapper>

        <AuthorInfo>
          <AuthorWrap>
            <AuthorImg src="https://i.postimg.cc/SNDGP9x1/image.png" />
            <AuthorName>{post.author || "작성자"}</AuthorName>
          </AuthorWrap>
          <ViewCountWrap>
            <ViewImg src="/view.svg" />
            <ViewCountNum>{post.viewCount}</ViewCountNum>
          </ViewCountWrap>
        </AuthorInfo>
      </TitleWrapper>

      <TabMenuWrapper>
        <TabMenu
          items={["모집 포지션", "정보", "소개"]}
          onChange={(value) => {
            console.log("선택된 탭:", value);
            scrollTo(value);
          }}
        />
      </TabMenuWrapper>

      <SectionWrapper ref={refPosition} data-section="모집 포지션">
        <PositionWrapper>
          <h3>모집 포지션</h3>
          <PositionCardList
            cards={position}
            mode="single"
            onSelect={() => setIsPositionSelected(true)}
          />
        </PositionWrapper>
      </SectionWrapper>

      <SectionWrapper ref={refInformation} data-section="정보">
        <InformationsWrapper>
          <InfoItem label="카테고리" value={post.category} />
          <InfoItem label="목적" value={post.purpose} />
          {post.status && <InfoItem label="현황" value={post.status} />}
          {post.projectDate?.[0]?.toDate && post.projectDate?.[1]?.toDate && (
            <InfoItem
              label="기간"
              value={`${formatDate(
                post.projectDate[0].toDate()
              )} ~ ${formatDate(post.projectDate[1].toDate())}`}
            />
          )}
        </InformationsWrapper>
      </SectionWrapper>

      <SectionWrapper ref={refDescription} data-section="소개">
        <DescriptionWrapper>
          <h3>프로젝트 소개</h3>
          <p>{post.description}</p>
        </DescriptionWrapper>
      </SectionWrapper>
    </PageWrapper>
  );
}

export default PostContainer;
