import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  width: 1374px;
  height: 100px;
`;

const Btns = styled.div`
  font-size: 15px;
  margin-left: 60px;
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1374px;
  height: 157px;
`;

const Divide = styled.div`
  border-top: 1px solid #555555;
  width: 100%;
`;
const Divide2 = styled.div`
  border-top: 1px solid #555555;
  width: 100%;
  margin-bottom: 80px;
`;

export default function LayoutHeader() {
  const router = useRouter();
  const onClickMoveNew = () => {
    void router.push("/usedItems/new");
  };
  return (
    <Container>
      <Wrapper>
        <BtnWrapper>
          <Btns>로그인</Btns>
          <Btns>회원가입</Btns>
          <Btns>장바구니</Btns>
        </BtnWrapper>
        <Divide></Divide>
        <LogoWrapper>
          <div>
            <img src="/logo.png" />
          </div>
          <div>
            <img
              src="/sell.png"
              onClick={onClickMoveNew}
              style={{ cursor: "pointer" }}
            />
          </div>
        </LogoWrapper>
        <Divide2></Divide2>
      </Wrapper>
    </Container>
  );
}
