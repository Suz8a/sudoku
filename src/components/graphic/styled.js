import styled from "styled-components";
import { Line } from "react-chartjs-2";

export const GraphContainer = styled.div`
  width: 80%;
  background-color: white;
  padding: 20px;
  box-shadow: 0px 16px 10px #00000033;
  border-radius: 10px;
`;

export const LineGraph = styled(Line)`
  width: 100%;
  height: 100%;
`;
