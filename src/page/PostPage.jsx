import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Header from '../jsx/Header';
import SearchBar from '../jsx/SearchBar';
import PostList from '../jsx/PostList';
import BottomNavigation from '../jsx/BottomNavigation';
import TabMenu from '../jsx/TabMenu';

// 여기서 부터 파베 추가입니다!
import {db} from '../firebase.js'
import { useEffect, useState } from 'react';
import { useReducedMotionConfig } from 'framer-motion';

// const dummyPosts = [
//     {
//         category: '프론트엔드',
//         title: '멋진 웹사이트 함께 만들어요!',
//         date: 1753369200000, // 2025.07.25
//         position: ['프론트엔드', '디자인'],
//         skills: ['React', 'TypeScript', 'Figma'],
//         author: '이지은',
//         viewCount: 98,
//     },
//     {
//         category: '디자인',
//         title: 'UX 디자이너 모집 중입니다!',
//         date: 1753532000000, // 2025.07.27
//         position: ['UX 디자이너'],
//         skills: ['Figma', 'Notion'],
//         author: '박하늘',
//         viewCount: 120,
//     },
//     {
//         category: '기획',
//         title: '아이디어 구상부터 함께할 PM 구해요',
//         date: 1753704800000, // 2025.07.29
//         position: ['기획'],
//         skills: ['Notion', '피그마'],
//         author: '정현우',
//         viewCount: 76,
//     },
//     {
//         category: '백엔드',
//         title: 'Spring Boot로 API 개발 도와주실 분?',
//         date: 1753877600000, // 2025.07.31
//         position: ['백엔드', '개발자'],
//         skills: ['Spring Boot', 'MySQL', 'Postman'],
//         author: '김민수',
//         viewCount: 143,
//     },
//     {
//         category: '프론트엔드',
//         title: '멋진 웹사이트 함께 만들어요!',
//         date: 1753369200000, // 2025.07.25
//         position: ['프론트엔드', '디자인'],
//         skills: ['React', 'TypeScript', 'Figma'],
//         author: '이지은',
//         viewCount: 98,
//     },
//     {
//         category: '디자인',
//         title: 'UX 디자이너 모집 중입니다!',
//         date: 1753532000000, // 2025.07.27
//         position: ['UX 디자이너'],
//         skills: ['Figma', 'Notion'],
//         author: '박하늘',
//         viewCount: 120,
//     },
//     {
//         category: '기획',
//         title: '아이디어 구상부터 함께할 PM 구해요',
//         date: 1753704800000, // 2025.07.29
//         position: ['서비스 기획'],
//         skills: ['Notion', '피그마'],
//         author: '정현우',
//         viewCount: 76,
//     },
//     {
//         category: '백엔드',
//         title: 'Spring Boot로 API 개발 도와주실 분?',
//         date: 1753877600000, // 2025.07.31
//         position: ['백엔드', '개발자'],
//         skills: ['Spring Boot', 'MySQL', 'Postman'],
//         author: '김민수',
//         viewCount: 143,
//     }
// ];

const PostContentWrap = styled.div`
    width: 100%;
    height: calc(875px - 52px - 95px - 120px);
    overflow-y: scroll;
    z-index: -1;

    &::-webkit-scrollbar {
        display: none; 
    }
`

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
    background-color: ${({theme})=>theme.colors.primary};
    position: absolute;
`

const FloatingImg = styled.img`
    width: 24px;
    height: 24px;
`

export default function PostPage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('전체');

    useEffect(() => {
        let tempData = []
        db.collection('post').get().then((qs)=>{
            qs.forEach((doc) => {
               tempData.push({ id: doc.id, ...doc.data() });
            })
            setPosts(tempData)
        })
    },[])


    const filteredPosts = selectedCategory === '전체'
        ? posts
        : posts.filter(post => post.category === selectedCategory);
    // 여기 필터링(카테고리)
        
    return (
        <>
        <Header type="back" title="모집글 목록" />
        <div className='PostTopCon'>
            <SearchBar />
            <TabMenu
                items={['전체', '졸업작품', '사이드 프로젝트', '공모전', '기타']}
                onChange={(value) => setSelectedCategory(value)}
            />
        </div>


        <PostContentWrap> 
            <PostList type="postList" posts={filteredPosts} />
            
        </PostContentWrap>

        <FloatingBtn onClick={() => navigate('/post/write')}><FloatingImg src='/pencil.svg' /></FloatingBtn>
        <BottomNavigation />
        </>
    );
}
