import React from "react";
import { SideMenu, Title } from "./styled";
import TextInput from "../textInput";

function SideBar() {
  return (
    <SideMenu>
      <Title>Sudoku</Title>
      <TextInput />
    </SideMenu>
  );
}

export default SideBar;
