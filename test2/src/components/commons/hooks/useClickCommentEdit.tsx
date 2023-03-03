import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

export const UPDATE_QUESTION = gql`
  mutation updateUseditemQuestion(
    $updateUseditemQuestionInput: UpdateUseditemQuestionInput!
    $useditemQuestionId: ID!
  ) {
    updateUseditemQuestion(
      updateUseditemQuestionInput: $updateUseditemQuestionInput
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
    }
  }
`;

export const FETCH_QUESTIONS = gql`
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

export const useClickQuestionEdit = () => {
  const router = useRouter();
  const [updateQuestion] = useMutation(UPDATE_QUESTION);
  const [myIndex, setMyIndex] = useState(-1);

  const onClickQuestionEdit = (event) => {
    setMyIndex(Number(event.currentTarget.id));
  };

  const onClickQuestionEditComplete = async (data, event) => {
    await updateQuestion({
      variables: {
        updateUseditemQuestionInput: {
          contents: data.contents,
        },
        useditemQuestionId: event.target.id,
      },
      refetchQueries: [
        {
          query: FETCH_QUESTIONS,
          variables: { useditemId: router.query.useditemId },
        },
      ],
    });
    setMyIndex(-1);
  };
  return { myIndex, onClickQuestionEdit, onClickQuestionEditComplete };
};
