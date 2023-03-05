import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import type {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../commons/types/generated/types";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IItemWrite, useClickNew } from "../../../commons/hooks/useClickNew";
import { useClickEdit } from "../../../commons/hooks/useClickEdit";
import * as S from "./Write.styles";
import { LoginCheck } from "../../../commons/hocs/withAuth";
import dynamic from "next/dynamic";

const FETCH_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      createdAt
      seller {
        name
      }
      images
      # pickedCount
      # buyer
      # useditemAddress {
      #   zipcode
      #   address
      #   addressDetail
      # }
    }
  }
`;

export default function ItemWrite(props: IItemWrite) {
  const ReactQuill = dynamic(async () => await import("react-quill"), {
    ssr: false,
  });
  const router = useRouter();
  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_ITEM, {
    variables: {
      useditemId: String(router.query.useditemId),
    },
  });

  const { onClickNew, onChangeFile, imageUrls } = useClickNew();
  const { onClickEdit } = useClickEdit();

  const { register, handleSubmit, setValue, trigger } = useForm<IItemWrite>({
    mode: "onChange",
  });

  const onChangeContents = (value: string): void => {
    console.log(value);
    setValue("contents", value === "<p><br></p>" ? "" : value);
    void trigger("contents");
  };

  const onClickCancel = () => {
    void router.push("http://localhost:3000/");
  };

  const onClickReturn = () => {
    void router.push(`/usedItems/${data?.fetchUseditem._id}`);
  };

  LoginCheck();

  return (
    <form
      onSubmit={
        props.isEdit ? handleSubmit(onClickEdit) : handleSubmit(onClickNew)
      }
    >
      <S.Container>
        <S.Wrapper>
          <S.Title>상품 {props.isEdit ? "수정" : "등록"}</S.Title>
          <S.Divide></S.Divide>
          <S.InputBox>
            <S.Texts>상품명</S.Texts>
            <S.Input
              type="text"
              {...register("name")}
              defaultValue={data?.fetchUseditem.name ?? ""}
              placeholder="상품명을 작성해주세요"
            />
          </S.InputBox>
          <S.InputBox>
            <S.Texts>상품 요약</S.Texts>
            <S.Input
              type="text"
              {...register("remarks")}
              defaultValue={data?.fetchUseditem.remarks ?? ""}
              placeholder="상품요약을 작성해주세요"
            />
          </S.InputBox>
          <S.InputBox>
            <S.Texts>상품 내용</S.Texts>
            <ReactQuill
              style={{ width: "1117px", height: "431px", marginBottom: "39px" }}
              onChange={onChangeContents}
              placeholder="상품을 설명해주세요."
              defaultValue={data?.fetchUseditem.contents ?? ""}
            />
          </S.InputBox>
          <S.InputBox>
            <S.Texts>판매 가격</S.Texts>
            <S.Input
              type="text"
              {...register("price")}
              defaultValue={data?.fetchUseditem.price ?? ""}
              placeholder="판매 가격을 입력해주세요"
            />
          </S.InputBox>
          <S.InputBox>
            <S.Texts>태그 입력</S.Texts>
            <S.Input
              type="text"
              {...register("tags")}
              defaultValue={data?.fetchUseditem.tags ?? ""}
              placeholder="#태그 #태그 #태그"
            />
          </S.InputBox>
          <S.Texts>거래 위치</S.Texts>
          <S.InputBox>
            {/* <KakaoPage /> */}
            <div>
              <input type="text" />
              <input type="text" />
            </div>
          </S.InputBox>
          <S.Texts>사진첨부</S.Texts>
          <div>
            {imageUrls.map((el, index) => (
              <div>
                <input
                  id={String(index)}
                  type="file"
                  onChange={onChangeFile}
                  multiple={true}
                />
                <img
                  src={
                    imageUrls[index] === ""
                      ? `https://storage.googleapis.com/${data?.fetchUseditem.images[index]}`
                      : `https://storage.googleapis.com/${imageUrls[index]}`
                  }
                />
              </div>
            ))}
            <S.Divide></S.Divide>
          </div>
          <S.BtnBox>
            <S.Delete
              type="button"
              onClick={props.isEdit ? onClickReturn : onClickCancel}
            >
              취소
            </S.Delete>
            <S.Submit>{props.isEdit ? "수정" : "등록"}</S.Submit>
          </S.BtnBox>
        </S.Wrapper>
      </S.Container>
    </form>
  );
}
