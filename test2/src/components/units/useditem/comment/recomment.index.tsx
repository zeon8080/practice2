import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { getDate } from "../../../../commons/libraries/util";
import {
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from "../../../../commons/types/generated/types";
import { useClickQuestion } from "../../../commons/hooks/useClickCommentDelete";
import { useClickQuestionEdit } from "../../../commons/hooks/useClickCommentEdit";
import * as S from "./recomment.styles";

export const FETCH_QUESTIONS = gql`
  query fetchUseditemQuestions($useditemId: ID!, $page: Int) {
    fetchUseditemQuestions(useditemId: $useditemId, page: $page) {
      _id
      contents
      createdAt
      user {
        name
      }
    }
  }
`;
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

export default function CommentList() {
  const router = useRouter();

  const { data } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_QUESTIONS, {
    variables: {
      useditemId: String(router.query.useditemId),
    },
  });
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const { onClickQuestionDelete } = useClickQuestion();
  const { myIndex, onClickQuestionEdit, onClickQuestionEditComplete } =
    useClickQuestionEdit();

  // const onClickCancle = () => {

  // };

  return (
    <>
      {data?.fetchUseditemQuestions.map((el: any, index) =>
        index !== myIndex ? (
          <div key={el._id}>
            <div>
              <S.ProfileBox>
                <img src="/profile.png" />
                <S.ProfileInfo>
                  <div>
                    <S.Seller>{el.user.name}</S.Seller>
                    <S.Data>{getDate(el.createdAt)}</S.Data>
                  </div>
                  <S.Imgs>
                    <S.Img
                      src="/edit.png"
                      onClick={onClickQuestionEdit}
                      id={String(index)}
                    />
                    <S.Img
                      src="/delete.png"
                      id={el._id}
                      onClick={onClickQuestionDelete}
                    />
                  </S.Imgs>
                </S.ProfileInfo>
              </S.ProfileBox>

              <div>{el.contents}</div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onClickQuestionEditComplete)}
            id={el._id}
          >
            <div key={el._id}>
              <div>
                <S.ProfileBox>
                  <img src="/profile.png" />
                  <S.ProfileInfo>
                    <div>
                      <S.Seller>{el.user.name}</S.Seller>
                      <S.Data>{getDate(el.createdAt)}</S.Data>
                    </div>
                  </S.ProfileInfo>
                </S.ProfileBox>
                <div>
                  <S.CommentInput
                    type="text"
                    {...register("contents")}
                    defaultValue={data?.fetchUseditemQuestions[index].contents}
                  />
                </div>
                <S.BtnBox>
                  <S.EditCancle type="button" id={el._id}>
                    취소하기
                  </S.EditCancle>
                  <S.EditBtn id={el._id}>수정하기</S.EditBtn>
                </S.BtnBox>
              </div>
            </div>
          </form>
        )
      )}
    </>
  );
}
