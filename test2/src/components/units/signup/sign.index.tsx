import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { schema } from "./sign.validation";
import * as S from "./sign.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignFormData, useClickSign } from "../../commons/hooks/useClickSign";

export default function SignForm() {
  const router = useRouter();
  const { onClickSign } = useClickSign();
  const { register, handleSubmit, formState } = useForm<ISignFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickMoveLogin = () => {
    void router.push("/usedItems/login");
  };
  const onClickCancel = () => {
    void router.push("http://localhost:3000/");
  };

  return (
    <S.Container>
      <S.Wrapper>
        <form onSubmit={handleSubmit(onClickSign)}>
          <div>
            <S.Title>회원가입</S.Title>
            <S.SubTitle>Sign up</S.SubTitle>
          </div>
          <S.Divid></S.Divid>
          <S.InputRow>
            <S.Span>아이디</S.Span>
            <S.Input type="text" {...register("email")} />
          </S.InputRow>
          <S.Error1>{formState.errors.email?.message}</S.Error1>
          <S.InputRow>
            <S.Span>비밀번호</S.Span>
            <S.Input type="password" {...register("password")} />
          </S.InputRow>
          <S.Error1>{formState.errors.password?.message}</S.Error1>
          <S.InputRow>
            <S.Span>비밀번호 확인</S.Span>
            <S.Input type="password" {...register("passwordSecond")} />
          </S.InputRow>
          <S.Error1>{formState.errors.passwordSecond?.message}</S.Error1>
          <S.InputRow>
            <S.Span>이름</S.Span>
            <S.Input2 type="text" {...register("name")} />
          </S.InputRow>
          <S.Error2>{formState.errors.name?.message}</S.Error2>
        </form>
        <S.ButtonsBox>
          <S.LogInBtn>회원가입</S.LogInBtn>
          <S.CancelBtn onClick={onClickCancel}>취소</S.CancelBtn>
        </S.ButtonsBox>
        <S.ButtonsBox>
          <div>
            <S.NotYet>이미 아이디가 있으신가요?</S.NotYet>
            <S.Join onClick={onClickMoveLogin}>로그인</S.Join>
          </div>
        </S.ButtonsBox>
      </S.Wrapper>
    </S.Container>
  );
}
