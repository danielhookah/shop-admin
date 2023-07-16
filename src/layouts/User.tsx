import React from 'react';
import { Outlet } from "react-router";
import styled from "styled-components";
import UserNavbar from "components/UserNavbar";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  height: 100vh;
  overflow: auto;
  display: grid;
  grid-template-rows: 70px 1fr;
`;

const User: React.FC = () => {
  return (
    <Wrapper>
      <UserNavbar />
      <Outlet />
    </Wrapper>
  );
};

export default User;
