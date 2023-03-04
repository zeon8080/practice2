import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 1500px;
`;

export const Scroll = styled(InfiniteScroll)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ItemImage = styled.div`
  width: 248;
  height: 221px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #eeeeee;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ListWrapper = styled.div`
  border: 1px solid black;
  width: 250px;
  height: 320px;
  margin: 0 16px 32px 16px;
  cursor: pointer;
`;

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`;

export const DateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Fonts = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-left: 16px;
  margin-bottom: 8px;
  margin-top: 8px;
  cursor: pointer;
`;

export const Date = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #a9a9a9;
  margin-right: 18px;
`;
