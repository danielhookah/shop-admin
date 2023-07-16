import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useNavigate } from "react-router";
import { ButtonGroup } from "./ButtonGroup";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  background-color: #f8f8f8;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 8px 10px;
  position: sticky;
  top: 0;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 40px;
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <Logo src="/logo512.png" alt="Logo" onClick={() => navigate("/")} />
      <ButtonGroup>
        <Button variant="secondary" size="large" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button size="large" onClick={() => navigate("/register")}>Register</Button>
      </ButtonGroup>
    </NavbarContainer>
  );
};

export default Navbar;
