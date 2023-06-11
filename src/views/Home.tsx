import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  align-self: center;
  justify-self: center;
  color: ${({ theme }) => theme.palette.neutral.white};
`;
const Home: React.FC = () => {
  return (
    <Wrapper>
      <h1>This is an example app using React</h1>
    </Wrapper>
  );
};

export default Home;
