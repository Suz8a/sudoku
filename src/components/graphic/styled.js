import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { Paper } from "@material-ui/core";

export const GraphContainer = styled(Paper)`
  width: 80%;
  background-color: white;
  padding: 20px;
  box-shadow: 0px 16px 10px #00000033;
  border-radius: 10px;
  margin-top: 5%;
`;

export const LineGraph = styled(Line)`
  width: 100%;
  height: 100%;
`;
