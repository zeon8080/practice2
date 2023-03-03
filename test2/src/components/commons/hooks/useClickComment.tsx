import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_QUESTIONS = gql`
  query fetchUseditemQuestions($useditemId: ID!, $page: Int) {
    fetchUseditemQuestions(useditemId: $useditemId, page: $page) {
      _id
      contents
      createdAt
      #   user {
      #     picture
      #     name
      #   }
    }
  }
`;

const CREATE_QUESTION = gql`
  mutation createUseditemQuestion(
    $createUseditemQuestionInput: CreateUseditemQuestionInput!
    $useditemId: ID!
  ) {
    createUseditemQuestion(
      createUseditemQuestionInput: $createUseditemQuestionInput
      useditemId: $useditemId
    ) {
      _id
    }
  }
`;

const DELETE_QUESTION = gql`
  mutation deleteUseditemQuestion($useditemQuestionId: ID!) {
    deleteUseditemQuestion(useditemQuestionId: $useditemQuestionId)
  }
`;

export interface IQuestionWrite {
  contents: string;
  //   onClickQuestion: (data: IQuestionWrite) => void;
}

export const useClickComment = () => {
  const router = useRouter();
  const [createQuestion] = useMutation(CREATE_QUESTION);
  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  const onClickQuestion = async (data: IQuestionWrite) => {
    try {
      const result = await createQuestion({
        variables: {
          createUseditemQuestionInput: {
            contents: String(data.contents),
          },
          useditemId: router.query.useditemId,
        },
        refetchQueries: [
          {
            query: FETCH_QUESTIONS,
            variables: { useditemId: router.query.useditemId },
          },
        ],
      });
      console.log(result);
      alert("질문이 등록되었습니다.");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickQuestionDelete = async (event) => {
    await deleteQuestion({
      variables: {
        useditemQuestionId: event.target.id,
      },
      refetchQueries: [
        {
          query: FETCH_QUESTIONS,
          variables: { useditemId: router.query.useditemId },
        },
      ],
    });
    alert("삭제되었습니다.");
  };

  return { onClickQuestion, onClickQuestionDelete };
};
