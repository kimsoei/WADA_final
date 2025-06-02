import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBtn from "./NavBtn";

import HomeIcon from "../assets/icons/nav_home.svg?react";
import PostIcon from "../assets/icons/nav_post.svg?react";
import PartyIcon from "../assets/icons/nav_party.svg?react";
import ProfileIcon from "../assets/icons/nav_profile.svg?react";

const NavCon = styled.div`
  display: flex;
  padding: 16px 28px 32px 28px;
  width: 100%;
  max-width: 402px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  justify-content: center;
  gap: 20px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  z-index: 2;
`;

function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { key: "home", menu: "홈", icon: HomeIcon, path: "/" },
    { key: "post", menu: "모집글", icon: PostIcon, path: "/post" },
    { key: "party", menu: "내 파티", icon: PartyIcon, path: "/party" },
    { key: "profile", menu: "프로필", icon: ProfileIcon, path: "/profile" },
  ];

  return (
    
    <NavCon>
      {navItems.map((item) => (
        <NavBtn
          key={item.key}
          menu={item.menu}
          icon={item.icon}
          selected={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        />
      ))}

      <div className="DeviceIndicator"></div>
      
    </NavCon>
    
  );
}

export default BottomNavigation;
