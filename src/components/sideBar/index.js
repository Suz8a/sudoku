import React from "react";
import { SideMenu, Title, MyButton } from "./styled";
import TextInput from "../textInput";

function SideBar() {
  return (
    <SideMenu>
      <Title>Sudoku</Title>
      <div style={{ paddingBottom: "40px" }}>Probabilidades</div>
      <div style={{ width: "80%", marginBottom: "25%" }}>
        <TextInput title="Cruza" />
      </div>
      <div style={{ width: "80%", marginBottom: "40%" }}>
        <TextInput title="Mutacion" />
      </div>
      <div style={{ width: "80%", marginBottom: "20%" }}>
        <MyButton color="primary">Iniciar</MyButton>
      </div>
    </SideMenu>
  );
}

export default SideBar;
