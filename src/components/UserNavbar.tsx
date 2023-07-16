import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useNavigate } from "react-router";
import { ButtonGroup } from "./ButtonGroup";
import { logoutUser } from "../store/actions/authActions";
import { useAppDispatch } from "../hooks/redux";
import { eventEmitter } from "../utils/eventEmitter";

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  background-color: #f8f8f8;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 8px 10px;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 40px;
`;

const UserNavbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(res => navigate('/login'))
      .catch(err => console.log(err))
  }

  const handleOpenProductModal = () => eventEmitter.dispatch('onClickModalOpen')

  return (
    <NavbarContainer>
      <Logo src="/logo512.png" alt="Logo" onClick={() => navigate("/")} />
      <ButtonGroup>
        <Button variant="secondary" size="large" onClick={handleOpenProductModal}>Add product</Button>
        <Button size="large" onClick={handleLogout}>Logout</Button>
      </ButtonGroup>
    </NavbarContainer>
  );
};

export default UserNavbar;
