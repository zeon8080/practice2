import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .email("이메일 아이디를 @까지 정확하게 입력해주세요.")
    .required("이메일은 필수입니다."),

  password: yup
    .string()
    .min(8, "8자리 이상 입력해주세요.")
    .max(16, "16자리 이내로 입력해주세요.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}[^\s]*$/,
      //   "공백을 제외한, 알파벳, 숫자, 특수문자를 모두 포함한 4자리 이상, 8자리 이하로 입력해주세요"
      "영문+숫자 조합 8~16자리의 비밀번호를 입력해주세요."
    )
    .required("비밀번호를 입력해주세요."),
});
