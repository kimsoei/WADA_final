import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../jsx/Header';
import BottomNavigation from '../jsx/BottomNavigation';


import ActionBtn from '../jsx/ActionBtn';

const DummyImg = styled.img`
    margin-top: 32px;
    width: 362px;
`

export default function PartyPage() {
    const navigate = useNavigate();

    return (
        <>
        <Header type="back" title="프로필" />
        
        <div className='content_wrap dummy_img'>
            
            
            
            <DummyImg src='/profileCard.png'></DummyImg>
            
            
            <ActionBtn btnName="프로필 카드 수정" onClick={navigate('/post')} />
        </div>

        <BottomNavigation />
        </>
    );
}
