import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../jsx/Header';
import BottomNavigation from '../jsx/BottomNavigation';

import {db} from '../firebase'
import ActionBtn from '../jsx/ActionBtn';
import ProfileCard from '../jsx/ProfileCard';
import { useEffect } from 'react';
import { useState } from 'react';

const DummyImg = styled.img`
    margin-top: 32px;
    width: 362px;
`

export default function PartyPage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        db.collection('profile').get().then((qs) => {
            const data = [];
            qs.forEach((doc) => data.push(doc.data()));
            setProfile(data.length > 0 ? data[0] : null);
        });
    }, []);

    console.log({profile})

    return (
        <>
        <Header type="back" title="프로필" />
        
        <div className='content_wrap dummy_img'>
            
        <ProfileCard  profileData={profile}></ProfileCard>
            <ActionBtn  btnName={profile ? "프로필 카드 수정" : "프로필 카드 작성"} onClick={() => navigate('/profile/write')}/>
        </div>

        <BottomNavigation />
        </>
    ); 
}
