import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";

export interface ISignFormData {
  email: string;
  name: string;
  password: string;
  passwordSecond: string;
}

export const CREATE_USER = gql`
  mutation ($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;

export const useClickSign = () => {
  const [createUser] = useMutation(CREATE_USER);
  const router = useRouter();

  const onClickSign = async (data: ISignFormData): Promise<void> => {
    try {
      if (data.email && data.name && data.password === data.passwordSecond) {
        const result = await createUser({
          variables: {
            createUserInput: {
              email: data.email,
              password: data.password,
              name: data.name,
            },
          },
        });
        console.log(result);
        alert("회원가입이 완료되었습니다.");
        void router.push("http://localhost:3000");
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return { onClickSign };
};
