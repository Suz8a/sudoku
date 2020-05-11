import React from "react";
import { SudokuContainer } from "./styled";
import Grid from "@material-ui/core/Grid";

function SudokuGraph({ sudoku }) {
  console.log(sudoku);
  return (
    <SudokuContainer>
      <Grid container style={{ margin: "auto" }}>
        {sudoku.map((fila) => (
          <Grid container spacing={2}>
            {fila.map((number) => (
              <Grid item style={{ width: "11%" }}>
                {number}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </SudokuContainer>
  );
}

export default SudokuGraph;
