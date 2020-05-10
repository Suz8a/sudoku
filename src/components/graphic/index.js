import React from "react";
import { LineGraph } from "./styled";
import { GraphContainer } from "./styled";

function Graphic({ fitness }) {
  var numGeneration = [];
  fitness.map((fit, index) => {
    numGeneration.push(`Generación ${index + 1}`);
  });

  console.log(numGeneration);
  console.log(fitness);
  const data = {
    labels: numGeneration,
    datasets: [
      {
        label: "Performance",
        fill: false,
        lineTension: 0.1,
        borderColor: "rgba(75,192,192,1)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointRadius: 3,
        data: fitness,
      },
    ],
  };

  return (
    <GraphContainer>
      <LineGraph data={data} />
    </GraphContainer>
  );
}

export default Graphic;
