import React from "react";
import Card from "components/Card";
import styled from "styled-components";
import UserInput from "components/UserInput";
import Button from "components/Button";
import { H1 } from "components/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "validation/authSchemas";
import { IRegister } from "types/forms/auth";
import { RootState } from "store/store";
import { registerUser } from "store/actions/authActions";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  align-self: center;
  justify-self: center;

  form {
    width: 100%;
  }
`;

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => navigate("/app"))
      .catch(err => toast.error(err))
  });

  return (
    <Wrapper>
      <Card p={4}>
        <form onSubmit={onSubmit}>
          <H1 color="app" textAlign="center" variant="h1" mb={3}>Register</H1>
          <UserInput
            mb={3}
            label="email"
            type="text"
            error={errors.email?.message}
            {...register("email")}
          />
          <UserInput
            mb={3}
            label="username"
            type="text"
            error={errors.username?.message}
            {...register("username")}
          />
          <UserInput
            mb={3}
            label="password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
          <UserInput
            mb={3}
            label="password confirmation"
            type="password"
            error={errors.password_confirmation?.message}
            {...register("password_confirmation")}
          />
          <Button disabled={isLoading} ml="auto">Register</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default Register;
