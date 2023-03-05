import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const ImgBox = styled.div`
  width: 85px;
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid gray;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Box = styled.div`
  border: 1px solid black;
  padding: 28px 34px 32px 36px;
  position: fixed;
  right: 30px;
  top: 25%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 22px;
`;

export default function LayoutRecent() {
  const [todayList, setTodayList] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const todayFunc = () => {
        let recent = JSON.parse(sessionStorage.getItem("todays"));
        if (recent !== null) setTodayList(recent.slice(0, 3));
      };

      todayFunc();
    }
  }, []);

  return (
    <>
      <Box>
        <Title>최근 본 상품</Title>
        {todayList?.map((el) => (
          <>
            <ImgBox>
              <img
                src={
                  el.images[0]
                    ? `https://storage.googleapis.com/${el.images[0]}`
                    : "/spah.png"
                }
              />
            </ImgBox>
          </>
        ))}
      </Box>
    </>
  );
}
