import React from "react";
import styled from "styled-components";
import Button from "components/Button";
import { useAppDispatch } from "hooks/redux";
import { logoutUser } from "store/actions/authActions";
import { useNavigate } from "react-router-dom";
import axios from "../utils/request";

const Wrapper = styled.div`
  align-self: center;
  justify-self: center;
  color: ${({ theme }) => theme.palette.neutral.white};
`;
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchData = () => {
    axios.get('http://localhost:3000/categories', {
      withCredentials: true
    })
  }

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(res => navigate('/login'))
      .catch(err => console.log(err))
  }

  return (
    <Wrapper>
      <h1>This is an example app using React</h1>
      <Button onClick={() => handleLogout()}>Logout</Button>
      <Button onClick={() => fetchData()}>Fetch</Button>
    </Wrapper>
  );
};

export default Home;
