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
        position: ['프론트엔드', '디자인'],
        skills: ['React', 'TypeScript', 'Figma'],
        author: '이지은',
        viewCount: 98,
    },
    {
        category: '디자인',
        title: 'UX 디자이너 모집 중입니다!',
        date: 1753532000000, // 2025.07.27
        position: ['UX 디자이너'],
        skills: ['Figma', 'Notion'],
        author: '박하늘',
        viewCount: 120,
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