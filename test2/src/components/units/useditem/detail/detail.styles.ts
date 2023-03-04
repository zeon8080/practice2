import styled from "@emotion/styled";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TopWrapper = styled.div`
  width: 1373px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ImageBox = styled.div`
  width: 480px;
  height: 480px;
  margin-right: 68px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 820px;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 51px;
`;
export const ImageBtn = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
  margin-left: 16px;
`;

export const Divide1 = styled.div`
  border-top: 3px solid rgba(85, 85, 85, 1);
  margin-top: 20px;
`;

export const Price = styled.span`
  font-size: 40px;
  font-weight: 500;
  margin-right: 8px;
`;

export const Divide2 = styled.div`
  border-top: 1px solid rgba(85, 85, 85, 1);
  margin-top: 5px;
  margin-bottom: 35px;
`;
export const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PickBtn = styled.button`
  width: 152px;
  height: 100px;
  color: white;
  background-color: black;
  font-size: 30px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

export const BasketBtn = styled.button`
  width: 312px;
  height: 100px;
  color: white;
  font-size: 30px;
  font-weight: 700;
  background-color: #a0a0a0;
  border: none;
  cursor: pointer;
`;

export const BuyBtn = styled.button`
  width: 312px;
  height: 100px;
  color: white;
  background-color: black;
  font-size: 30px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 73px;
`;

export const LeftBox = styled.div`
  margin-right: 37px;
  height: 1170px;
`;

export const ItemInfo = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

export const Divide3 = styled.div`
  border-top: 3px solid rgba(85, 85, 85, 1);
  margin-top: 30px;
  margin-bottom: 19px;
  width: 925px;
`;

export const Images = styled.div`
  width: 801px;
  height: 207px;
  margin-right: 68px;

  > img {
    width: 100%;
    object-fit: cover;
  }
`;

export const ItemContents = styled.div`
  width: 801px;
  height: 207px;
  padding-top: 22px;
  padding-left: 10px;
`;

export const Location = styled.div`
  margin-top: 40px;
`;

export const RightBox = styled.div`
  border-left: 1px solid rgba(85, 85, 85, 1);
  padding-left: 31px;
  height: 1170px;
`;

export const Divide4 = styled.div`
  border-top: 3px solid rgba(85, 85, 85, 1);
  width: 385px;
  margin-top: 30px;
  margin-bottom: 32px;
`;
export const Divide5 = styled.div`
  border-top: 1px solid rgba(85, 85, 85, 1);
  width: 385px;
  margin-top: 33px;
  margin-bottom: 76px;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-left: 12px;
`;

export const Seller = styled.span`
  font-size: 32px;
  margin-left: 33px;
`;

export const Comment = styled.div`
  font-size: 32px;
  font-weight: 700;
`;
