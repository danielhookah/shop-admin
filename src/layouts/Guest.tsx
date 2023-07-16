import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  height: 100vh;
  display: grid;
  overflow: auto;
  grid-template-rows: 70px 1fr;
`;
const Guest: React.FC = () => {
  return (
    <Wrapper>
      <Navbar />
      <Outlet />
    </Wrapper>
  );
};

export default Guest;
