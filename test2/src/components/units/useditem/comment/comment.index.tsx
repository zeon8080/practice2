import { useForm } from "react-hook-form";
import {
  IQuestionWrite,
  useClickComment,
} from "../../../commons/hooks/useClickComment";
import * as S from "./comment.styles";

export default function QuestionWrite(): JSX.Element {
  const { onClickQuestion } = useClickComment();
  const { register, handleSubmit } = useForm<IQuestionWrite>({
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onClickQuestion)}>
      <S.CommentBox>
        <S.CommentInput {...register("contents")} />
        <S.BtnBox>
          <S.CommentBtn>작성하기</S.CommentBtn>
        </S.BtnBox>
      </S.CommentBox>
    </form>
  );
}
