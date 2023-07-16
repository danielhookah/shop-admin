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
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  align-self: center;
  justify-self: center;

  form {
    width: 100%;
  }
`;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        const origin = location.state?.from?.pathname || '/app';
        navigate(origin);
      })
      .catch(err => toast.error(err))
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
          <Button disabled={isLoading} ml="auto">Login</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default Login;
