import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export const Wrapper = styled.div`
  border-radius: 7px;
  border: 1px solid #ffffff;
  height: 802px;
  width: 742px;
  background-color: rgba(255, 255, 255, 1);
  padding: 81px 69px 69px 73px;
  filter: drop-shadow(0px 5px 7px rgba(0, 0, 0, 0.07));
`;

export const Title = styled.span`
  font-size: 50px;
  font-weight: 700;
`;

export const SubTitle = styled.span`
  font-size: 32px;
  margin-left: 12.41px;
`;

export const Divid = styled.div`
  border-top: 1px solid #c9c9c9;
  margin-top: 37px;
  margin-bottom: 81px;
`;

export const Input = styled.input`
  width: 600px;
  height: 77.48px;
  background-color: rgba(246, 246, 246, 1);
  border-radius: 10px;
  border: 1px solid rgba(204, 204, 204, 1);
`;

export const Input2 = styled.input`
  width: 600px;
  height: 77.48px;
  background-color: rgba(246, 246, 246, 1);
  border-radius: 10px;
  border: 1px solid rgba(204, 204, 204, 1);
`;

export const Inputs = styled.input`
  width: 400px;
  height: 50px;
  border: 1px solid gray;
  border-radius: 10px;
  padding-left: 10px;
  font-family: "Malgun gothic", dotum, sans-serif;
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LogInBtn = styled.button`
  all: unset;
  width: 600px;
  height: 88px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #ffe004;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgba(255, 224, 4, 1);
  margin-bottom: 39px;
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
`;
