import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ILogInFormData, useClickLogin } from "../../commons/hooks/useLogin";
import { schema } from "./login.validation";
import * as S from "./login.styles";
import { yupResolver } from "@hookform/resolvers/yup";

export default function LogInForm() {
  const { onClickLogin } = useClickLogin();
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<ILogInFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onClickJoin = (): void => {
    void router.push("/join");
  };
  return (
    <S.Container>
      <S.Wrapper>
        <form onSubmit={handleSubmit(onClickLogin)}>
          <div>
            <S.Title>로그인</S.Title>
            <S.SubTitle>Login</S.SubTitle>
          </div>
          <S.Divid></S.Divid>

          <S.Input type="text" {...register("email")} />

          <S.Error1>{formState.errors.email?.message}</S.Error1>
          <S.Input2 type="password" {...register("password")} />
          <S.Error2>{formState.errors.password?.message}</S.Error2>

          <S.LogInBtn>로그인</S.LogInBtn>
        </form>
        <S.ButtonsBox>
          <div>
            <S.NotYet>아직 계정이 없으신가요?</S.NotYet>
            <S.Join onClick={onClickJoin}>회원가입</S.Join>
          </div>
        </S.ButtonsBox>
      </S.Wrapper>
    </S.Container>
  );
}
