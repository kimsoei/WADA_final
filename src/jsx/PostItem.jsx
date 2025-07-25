import styled from "styled-components";
import ChipList from "./ChipList";
import ActionBtn from "./ActionBtn";
import { theme } from "../styles/theme";

const PostWrap = styled.div`
  width: 100%;
  max-width: ${({ type }) => (type === "homeList" ? "362px" : "402px")};
  padding: 20px 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  border-radius: ${({ type }) =>
    type === "homeList" ? theme.radius.medium : "none"};
`;

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PostTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Category = styled.p`
  font-size: 12px;
  line-height: 150%;
  color: ${theme.colors.gray[600]};
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  line-height: 150%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${theme.colors.gray[800]};
`;

const DateText = styled.p`
  font-size: 14px;
  line-height: 150%;
  color: ${theme.colors.gray[600]};
`;

const PositionText = styled.p`
  font-size: 14px;
  line-height: 150%;
  color: ${theme.colors.gray[600]};
`;

const AuthorInfo = styled.div`
  display: flex;
  justify-content: space-between;
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

const DeadDate = styled.span`
  line-height: 150%;
  font-size: 14px;
  font-weight: 500;
  margin-left: 4px;
  color: ${theme.colors.primary};
`;

const ViewCountNum = styled.span`
  font-size: 12px;
  line-height: 150%;
  color: ${theme.colors.gray[600]};
`;

const AuthorName = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  color: ${theme.colors.gray[600]};
`;

const BlankLine = styled.span`
  width: 100%;
  max-width: ${({ type }) => (type === "homeList" ? "362px" : "402px")};
  height: 1px;
  background-color: ${theme.colors.gray[200]};
`;

const ViewImg = styled.img`
  opacity: 0.8;
  width: 16px;
  height: 16px;
`;

const ActionArea = styled.div`
  display: flex;
`;

function getDeadlineText(timestamp) {
  const today = new Date();
  const target = new Date(timestamp);
  const msDiff = target.getTime() - today.getTime();
  const dayDiff = Math.ceil(msDiff / (1000 * 60 * 60 * 24));
  return `마감 D-${dayDiff}일`;
}

function PostItem({
  type = "postList",
  category,
  topic,
  author,
  authorImageUrl,
  viewCount,
  positions = [],
  onClick,
  projectDate,
  notice,
}) {
  const positionSkills = [...new Set(positions.flatMap((p) => p.stack))];
  // -> 기술스택 중복 제거용 가공 코드 positions.stack 에서 중복 제거된 데이터가 positionSkills입ㅂ니다!
  const positionTasks = [...new Set(positions.flatMap((p) => p.task))];
  // -> 분야 중복 제거용 가공 코드 positions.stack 에서 중복 제거된 데이터가 positionSkills입니다!

  function formatDate(dateInput) {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
  }

  const getImagePath = (filename) => `${import.meta.env.BASE_URL}${filename}`;

  return (
    <PostWrap onClick={onClick} type={type}>
      <PostBox>
        <PostTextWrap>
          <Category>{category}</Category>

          <PostTextInfo>
            <Title>{topic}</Title>
            <DateText>
              {projectDate?.[0]?.toDate &&
                projectDate?.[1]?.toDate &&
                `${formatDate(projectDate[1].toDate())}까지`}
              <DeadDate>{getDeadlineText(projectDate[1].toDate())}</DeadDate>
            </DateText>
            <PositionText>{positionTasks.join(" · ")}</PositionText>
          </PostTextInfo>
        </PostTextWrap>

        <ChipList
          type="none"
          chips={positionSkills}
          size="small"
          unLock={false}
        />
      </PostBox>

      {type === "postList" || type === "homeList" ? <BlankLine /> : null}
      {type === "postList" || type === "homeList" ? (
        <AuthorInfo>
          <AuthorWrap>
            <AuthorImg
              src={
                authorImageUrl
                  ? getImagePath(authorImageUrl)
                  : getImagePath("/designerProfile.svg")
              }
            />
            <AuthorName>{author || "작성자"}</AuthorName>
          </AuthorWrap>
          <ViewCountWrap>
            <ViewImg src={import.meta.env.BASE_URL + "/view.svg"} />
            <ViewCountNum>{viewCount}</ViewCountNum>
          </ViewCountWrap>
        </AuthorInfo>
      ) : null}

      {type === "partyList" && (
        <ActionBtn type="outline" btnName="지원자 확인" />
      )}

      {type === "appliedList" && (
        <ActionArea>
          {notice === "rejected" ? (
            <ActionBtn
              btnName="반려"
              type="disabled"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <ActionBtn
              btnName={notice === "accepted" ? "승인 완료" : "승인 대기 중"}
              type={notice === "accepted" ? "default" : "outline"}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </ActionArea>
      )}
    </PostWrap>
  );
}

export default PostItem;
