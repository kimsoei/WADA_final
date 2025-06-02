import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Header from '../jsx/Header';
import PostList from '../jsx/PostList';
import BottomNavigation from '../jsx/BottomNavigation';

import Banner from '../jsx/Banner';
import BottomSheet from '../jsx/BottomSheet';


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
    border-radius: ${ ({ theme }) => theme.radius.medium };
    margin-top: 20px;
    margin-bottom: 12px;
`

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
    },
    {
        category: '기획',
        title: '아이디어 구상부터 함께할 PM 구해요',
        date: 1753704800000, // 2025.07.29
        position: ['기획'],
        skills: ['Notion', '피그마'],
        author: '정현우',
        viewCount: 76,
    },
    {
        category: '백엔드',
        title: 'Spring Boot로 API 개발 도와주실 분?',
        date: 1753877600000, // 2025.07.31
        position: ['백엔드'],
        skills: ['Spring Boot', 'MySQL', 'Postman'],
        author: '김민수',
        viewCount: 143,
    }
];

export default function MainPage() {
    const navigate = useNavigate();

    return (
        <>
        <Header type="default" badge={false} />

        <div className='content_wrap'>
            <ServiceTip>
                <h1 className='TipTitle'>프로젝트 팀원, 간단하게 구하자!</h1>
                <div className='TipWrap'>
                    <div className='TipItem'>
                        <img src='/first.svg'></img>
                        <h5 className='TipSubText'>프로젝트<br/>정보등록</h5>
                    </div>
                    <img className='TipImg' src='/nextImg.svg'></img>
                    <div className='TipItem'>
                        <img src='/second.svg'></img>
                        <h5 className='TipSubText'>모집글<br/>작성</h5>
                    </div>
                    <img className='TipImg' src='/nextImg.svg'></img>
                    <div className='TipItem'>
                        <img src='/three.svg'></img>
                        <h5 className='TipSubText'>지원자<br/>확인</h5>
                    </div>
                </div>
            </ServiceTip>

            <Banner type='dark' />
            <Banner type="light" onClick={() => navigate('/post/write')} />

            <div className='ConTitleWrap'>
                <h2 className='ConTitle'>모집글</h2>
                <div className='ConBtn' onClick={() => navigate('/post')}><span className='allView'>전체보기</span><img className='main_arrow' src='/arrow_right.svg' /></div>
            </div>

            <PostList type="homeList" posts={dummyPosts} />
        </div>

        <BottomNavigation />
        </>
    );
}