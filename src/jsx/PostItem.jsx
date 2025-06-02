import styled from 'styled-components';
import ChipList from './ChipList';
import ActionBtn from './ActionBtn';
import { button, style } from 'framer-motion/client';

const PostWrap = styled.div`
    width: 100%;
    max-width: ${({ type }) => (type === 'homeList' ? '362px' : '402px')};
    padding: 20px 16px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 16px;
    cursor: pointer;
    border-radius: ${({ theme, type }) =>
        type === 'homeList' ? theme.radius.medium : 'none'};
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
    color: ${({ theme }) => theme.colors.gray[600]};
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 700;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.gray[800]};
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
    color: ${({ theme }) => theme.colors.primary};
`;

const ViewCountNum = styled.span`
    font-size: 12px;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.gray[600]};
`

const AuthorName = styled.span`
    font-size: 14px;
    font-weight: 600;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.gray[600]};
`

const BlankLine = styled.span`
    width: 100%;
    max-width: ${({ type }) => (type === 'homeList' ? '362px' : '402px')};
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray[200]}
`

const ViewImg = styled.img`
    opacity: 0.8;
    width: 16px;
    height: 16px;
`

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function getDeadlineText(timestamp) {
    const today = new Date();
    const target = new Date(timestamp);
    const msDiff = target.getTime() - today.getTime();
    const dayDiff = Math.ceil(msDiff / (1000 * 60 * 60 * 24));
    return `마감 D-${dayDiff}일`;
}


function PostItem({
    type = 'postList',
    category,
    topic,
    date,
    position,
    skills,
    author,
    viewCount,
    positions=[],
    onClick,
}) {
    const positionSkills = [...new Set(positions.flatMap(p => p.stack))];
    // -> 기술스택 중복 제거용 가공 코드 positions.stack 에서 중복 제거된 데이터가 positionSkills입ㅂ니다!
    const positionTasks = positions.map(p => p.task);

    return (
        <PostWrap onClick={onClick} type={type}>
        <PostTextWrap>
            <Category>{category}</Category>

            <PostTextInfo>
                <Title>{topic}</Title>
                <DateText>
                    {formatDate(date)} 까지 <DeadDate>{getDeadlineText(date)}</DeadDate>
                </DateText>
                <PositionText>
                    {Array.isArray(position) ? position.join(" · ") : position}
                </PositionText>
            </PostTextInfo>
        </PostTextWrap>

        <ChipList type='none' chips={positionSkills} size="small" unLock={false} />

        {type === 'postList' || type === 'homeList' ? (
            <BlankLine />
        ) : null}

        {type === 'postList' || type === 'homeList' ? (
            <AuthorInfo>
                <AuthorWrap>
                    <AuthorImg src="https://i.postimg.cc/SNDGP9x1/image.png" />
                    <AuthorName>{author || '작성자'}</AuthorName>
                </AuthorWrap>
                <ViewCountWrap>
                    <ViewImg src="/view.svg" />
                    <ViewCountNum>{viewCount}</ViewCountNum>
                </ViewCountWrap>
            </AuthorInfo>
        ) : null}

        {type === 'partyList' && (
            <ActionBtn type="outline" btnName="지원자 확인하기" />
        )}

        </PostWrap>
    );
}

export default PostItem;
