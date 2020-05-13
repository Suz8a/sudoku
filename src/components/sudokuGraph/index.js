import React from "react";
import { SudokuContainer } from "./styled";
import Grid from "@material-ui/core/Grid";

function SudokuGraph({ sudoku, title, performance }) {
  return (
    <SudokuContainer>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          paddingBottom: "5px",
          fontWeight: "bold",
        }}
      >
        {title} p: {performance}
      </div>
      <Grid container style={{ margin: "auto" }}>
        {sudoku.map((fila) => (
          <Grid container spacing={2}>
            {fila.map((number) => {
              return number !== 0 ? (
                <Grid item style={{ width: "11%", fontWeight: "bold" }}>
                  {number}
                </Grid>
              ) : (
                <Grid item style={{ width: "11%" }}>
                  {number}
                </Grid>
              );
            })}
          </Grid>
        ))}
      </Grid>
    </SudokuContainer>
  );
}

export default SudokuGraph;
