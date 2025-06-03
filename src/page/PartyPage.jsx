import styled from 'styled-components';

import Header from '../jsx/Header';
import BottomNavigation from '../jsx/BottomNavigation';

import TabMenu from '../jsx/TabMenu';
import PostList from '../jsx/PostList';

const dummyPosts = [
    {
        category: '프론트엔드',
        title: '멋진 웹사이트 함께 만들어요!',
        date: 1753369200000, // 2025.07.25
        positions: [
            {stack: ['React', 'TypeScript', 'Figma'],
            task:['디자이너', '기획자'] ,
            position:['UX 디자이너', 'UI 디자이너'] }
        ],
        author: '이지은',
        topic: '내가쓴글1',
        viewCount: 98,
        projectDate: [
            { toDate: () => new Date('2025-04-28T14:20:45Z') },
            { toDate: () => new Date('2025-07-14T14:20:45Z') }
        ],
    },
    {
        category: '디자인',
        title: 'UX 디자이너 모집 중입니다!',
        date: 1753532000000, // 2025.07.27
        positions: [
            {stack: ['React', 'TypeScript', 'Figma'],
            task:['디자이너', '기획자'] ,
            position:['UX 디자이너', 'UI 디자이너'] }
        ],
        author: '박하늘',
        topic: '내가쓴글2',
        viewCount: 120,
        projectDate: [
            { toDate: () => new Date('2025-04-28T14:20:45Z') },
            { toDate: () => new Date('2025-07-20T14:20:45Z') }
        ],
    }
];

const PostContentWrap = styled.div`
    width: 100%;
    height: calc(875px - 52px - 58px);
    overflow-y: scroll;
    z-index: -1;

    &::-webkit-scrollbar {
        display: none; 
    }
`


export default function ProfilePage() {
    return (
        <>
        <Header type="back" title="내 파티" />
        <div className='PostTopCon'>
            <TabMenu
                items={['모집중', '모집완료']}
                onChange={(value) => console.log('선택된 탭:', value)}
            />
        </div>


        <PostContentWrap>
            <PostList type="partyList" posts={dummyPosts} />

        </PostContentWrap>
        <BottomNavigation />
        </>
    );
}