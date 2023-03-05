import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { useRef, useState } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

import type { ChangeEvent } from "react";
import { Modal } from "antd";
import {
  IMutation,
  IMutationUploadFileArgs,
  IQuery,
} from "../../../commons/types/generated/types";
import { checkValidationFile } from "../../../commons/libraries/validationFile";

const CREATE_ITEM = gql`
  mutation ($createUseditemInput: CreateUseditemInput!) {
    createUseditem(createUseditemInput: $createUseditemInput) {
      _id
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export interface IItemWrite {
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags: string;
  fileUrls: UseFieldArrayReturn;
  onClickNew: (data: IItemWrite) => void;
  isEdit: boolean;
  data?: Pick<IQuery, "fetchUseditem">;
}

export const useClickNew = () => {
  // const fileRef = useRef(null);
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState(["", ""]);
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);
  const [createItem] = useMutation(CREATE_ITEM);

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    const isValid = checkValidationFile(file);
    if (!isValid) return;

    try {
      const result = await uploadFile({ variables: { file } });
      onChangeFileUrls(result.data.uploadFile.url, Number(event?.target.id));
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onChangeFileUrls = (imageUrl: string, index: number): void => {
    const newFileUrls = [...imageUrls];
    newFileUrls[index] = imageUrl;
    setImageUrls(newFileUrls);
  };

  const onClickNew = async (data: IItemWrite) => {
    console.log(data);

    try {
      if (data.name && data.remarks && data.contents && data.price) {
        const result = await createItem({
          variables: {
            createUseditemInput: {
              name: data.name,
              remarks: data.remarks,
              contents: data.contents,
              price: Number(data.price),
              tags: data.tags,
              images: [...imageUrls],
            },
          },
        });
        console.log(result);
        alert("상품이 등록되었습니다!");
        void router.push(`/usedItems/${result.data?.createUseditem._id}`);
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // const onClickUpload = () => {
  //   fileRef.current?.click();
  // };

  return { onClickNew, onChangeFile, imageUrls };
};
