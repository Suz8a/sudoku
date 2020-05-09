import React from "react";
import { SideMenu, Title, MyButton } from "./styled";
import TextInput from "../textInput";

function SideBar() {
  return (
    <SideMenu>
      <Title>Sudoku</Title>
      <div style={{ paddingBottom: "20%" }}>Datos</div>
      <div style={{ width: "80%", marginBottom: "10%" }}>
        <TextInput title="% Cruza" />
      </div>
      <div style={{ width: "80%", marginBottom: "10%" }}>
        <TextInput title="% Mutacion" />
      </div>
      <div style={{ width: "80%", marginBottom: "30%" }}>
        <TextInput title="Número de generaciones" />
      </div>
      <div style={{ width: "80%" }}>
        <MyButton color="primary">Iniciar</MyButton>
      </div>
    </SideMenu>
  );
}

export default SideBar;
