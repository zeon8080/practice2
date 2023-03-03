import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/stores";

export interface ILogInFormData {
  email: string;
  password: string;
}

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const useClickLogin = () => {
  const router = useRouter();
  const [user] = useMutation(LOGIN_USER);
  const [, setAccessToken] = useRecoilState(accessTokenState);

  const onClickLogin = async (data: ILogInFormData): Promise<void> => {
    try {
      if (data.email && data.password) {
        const result = await user({
          variables: {
            email: data.email,
            password: data.password,
          },
        });
        const accessToken = result.data?.loginUser.accessToken;
        console.log(accessToken);

        if (accessToken === undefined) {
          alert("로그인에 실패했습니다.");
          return;
        }
        setAccessToken(accessToken);
        void router.push("http://localhost:3000/");
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return { onClickLogin };
};
