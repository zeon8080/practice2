import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export const Wrapper = styled.div`
  box-sizing: border-box;
  border-radius: 7px;
  border: 1px solid #ffffff;
  height: 980px;
  width: 1200px;
  background-color: rgba(255, 255, 255, 1);
  padding: 75px 97px 140px 97px;
  filter: drop-shadow(0px 5px 7px rgba(0, 0, 0, 0.07));
`;

export const Title = styled.span`
  font-size: 50px;
  font-weight: 700;
`;

export const SubTitle = styled.span`
  font-size: 32px;
  margin-left: 30px;
`;

export const Span = styled.span`
  font-size: 24px;
`;
export const Divid = styled.div`
  border-top: 1px solid #c9c9c9;
  margin-top: 37px;
  margin-bottom: 81px;
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.input`
  width: 786.96px;
  height: 77.48px;
  background-color: rgba(246, 246, 246, 1);
  border-radius: 10px;
  border: 1px solid rgba(204, 204, 204, 1);
`;

export const Input2 = styled.input`
  width: 786.96px;
  height: 77.48px;
  background-color: rgba(246, 246, 246, 1);
  border-radius: 10px;
  border: 1px solid rgba(204, 204, 204, 1);
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LogInBtn = styled.button`
  all: unset;
  width: 330px;
  height: 70px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  background-color: rgba(255, 224, 4, 1);
  margin-bottom: 47px;
`;

export const CancelBtn = styled.button`
  all: unset;
  width: 330px;
  height: 70px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  color: white;
  background-color: black;
  margin-bottom: 47px;
  margin-left: 21px;
`;

export const Error1 = styled.div`
  color: #fc2c2f;
  font-size: 16px;
  margin: 14.52px 0px 35px 18.21px;
`;
export const Error2 = styled.div`
  color: #fc2c2f;
  font-size: 16px;
  margin: 15.52px 0px 80px 18.21px;
`;

export const NotYet = styled.span`
  color: #888888;
`;

export const Join = styled.span`
  font-weight: 500;
  cursor: pointer;
  margin-left: 21px;
  text-decoration: underline;
`;
