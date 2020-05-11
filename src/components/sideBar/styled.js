import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const SideMenu = styled.div`
  background-color: white;
  height: 100%;
  width: 20%;
  box-shadow: 0px 16px 10px #00000033;
  display: flex;
  flex-direction: column;
  align-items: center;
  float: left;
`;

export const Title = styled.div`
  width: 100%;
  height: 30px;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  margin-top: 10%;
  margin-bottom: 30%;
  font-family: cursive;
`;

export const MyButton = styled(Button)`
  width: 100%;
`;
