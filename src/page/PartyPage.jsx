import styled from 'styled-components';

import Header from '../jsx/Header';
import BottomNavigation from '../jsx/BottomNavigation';

import TabMenu from '../jsx/TabMenu';
import PostList from '../jsx/PostList';

import { useEffect, useState } from 'react';
import { db } from '../firebase';


const PostContentWrap = styled.div`
    width: 100%;
    height: calc(875px - 52px - 58px);
    overflow-y: scroll;
    z-index: -1;

    &::-webkit-scrollbar {
        display: none; 
    }
`

const EmptyWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray[600]};
`


export default function PartyPage() {

    const [profile, setProfile] = useState(null);
    const [myPosts, setMyPosts] = useState([]);

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
            if (data.author === profileData.name) {
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
        <div className='PostTopCon'>
            <TabMenu
                items={['모집한 파티', '지원한 파티']}
                onChange={(value) => console.log('선택된 탭:', value)}
            />
        </div>


        <PostContentWrap>

            <PostContentWrap>
            {myPosts.length === 0 ? (
                <EmptyWrap>글이 없습니다</EmptyWrap>
            ) : (
                <PostList type="partyList" posts={myPosts} />
            )}
            </PostContentWrap>

        </PostContentWrap>
        <BottomNavigation />
        </>
    );
}