import React from "react";
import { SideMenu, Title, MyButton } from "./styled";
import TextInput from "../textInput";

function SideBar({
  onInputCruza,
  onInputMutacion,
  onInputGeneraciones,
  onInicioClick,
  onInputNumIndividuos,
}) {
  return (
    <SideMenu>
      <Title>Sudoku</Title>
      <div style={{ paddingBottom: "20%" }}>Datos</div>
      <div style={{ width: "80%", marginBottom: "10%" }}>
        <TextInput title="% Cruza" onInput={onInputCruza} />
      </div>
      <div style={{ width: "80%", marginBottom: "10%" }}>
        <TextInput title="% Mutacion" onInput={onInputMutacion} />
      </div>
      <div style={{ width: "80%", marginBottom: "10%" }}>
        <TextInput
          title="# individuos por generación"
          onInput={onInputNumIndividuos}
        />
      </div>
      <div style={{ width: "80%", marginBottom: "30%" }}>
        <TextInput title="# generaciones" onInput={onInputGeneraciones} />
      </div>
      <div style={{ width: "80%" }}>
        <MyButton color="primary" onClick={onInicioClick}>
          Iniciar
        </MyButton>
      </div>
    </SideMenu>
  );
}

export default SideBar;
