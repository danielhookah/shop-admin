import React from "react";
import Card from "components/Card";
import styled from "styled-components";
import UserInput from "components/UserInput";
import Button from "components/Button";
import { H1 } from "components/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "validation/authSchemas";
import { ILogin } from "types/forms/auth";
import { RootState } from "store/store";
import { loginUser } from "store/actions/authActions";
import { useAppDispatch, useAppSelector } from "hooks/redux";

const Wrapper = styled.div`
  align-self: center;
  justify-self: center;

  form {
    width: 100%;
  }
`;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    dispatch(loginUser(data)).then(res => console.log(res))
  });

  return (
    <Wrapper>
      <Card p={4}>
        <form onSubmit={onSubmit}>
          <H1 color="app" textAlign="center" variant="h1" mb={3}>Login</H1>
          <UserInput
            mb={3}
            label="email"
            type="text"
            error={errors.email?.message}
            {...register("email")}
          />
          <UserInput
            mb={3}
            label="password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button ml="auto">Login</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default Login;
