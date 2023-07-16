import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "hooks/redux";
import { useNavigate } from "react-router-dom";
import axios from "../utils/request";

const Wrapper = styled.div`
  align-self: center;
  justify-self: center;
  color: ${({ theme }) => theme.palette.neutral.white};
`;
const Home: React.FC = () => {

  const fetchData = () => {
    axios.get('http://localhost:3000/categories', {
      withCredentials: true
    })
  }

  return (
    <Wrapper>
      <h1>This is an example app using React</h1>
    </Wrapper>
  );
};

export default Home;
