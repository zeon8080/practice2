import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { IItemWrite } from "./useClickNew";

export const UPDATE_ITEM = gql`
  mutation updateUseditem(
    $updateUseditemInput: UpdateUseditemInput!
    $useditemId: ID!
  ) {
    updateUseditem(
      updateUseditemInput: $updateUseditemInput
      useditemId: $useditemId
    ) {
      _id
    }
  }
`;
export const useClickEdit = () => {
  const router = useRouter();
  const [updateItem] = useMutation(UPDATE_ITEM);

  const onClickEdit = async (data: IItemWrite) => {
    console.log(data);
    try {
      const result = await updateItem({
        variables: {
          useditemId: router.query.useditemId,
          updateUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: Number(data.price),
          },
        },
      });
      alert("수정이 등록되었습니다!");
      void router.push(`/usedItems/${result.data?.updateUseditem._id}`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return { onClickEdit };
};
