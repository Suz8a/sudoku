import React, { useState } from "react";
import SideBar from "../../components/sideBar";
import Graphic from "../../components/graphic";
import { MainContainer, InformationContainer } from "./styled";
import { CircularProgress } from "@material-ui/core";
import SudokuGraph from "../../components/sudokuGraph";

function Main() {
  const [cruza, setcruza] = useState(0);
  const [mutacion, setmutacion] = useState(0);
  const [generaciones, setgeneraciones] = useState(0);
  const [numIndividuos, setnumindividuos] = useState(0);
  const [generacionActual, setgeneracionActual] = useState([]);
  const [fitness, setfitness] = useState([]);
  const [sudoku, setsudoku] = useState([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);

  var bestSudoku = [];
  var i = 0;
  var z = 0;
  //Loading state
  const [isLoading, setisLoading] = useState(true);

  function onInputCruza(e) {
    setcruza(e.target.value);
  }

  function onInputMutacion(e) {
    setmutacion(e.target.value);
  }

  function onInputGeneraciones(e) {
    setgeneraciones(e.target.value);
  }

  function onInputNumIndividuos(e) {
    setnumindividuos(e.target.value);
  }

  //Functionality

  const obtenerSeccion = (posicionFila, posicionColumna) => {
    var seccion = 0;

    //1ra parte del tablero
    if (posicionFila < 3) {
      if (posicionColumna < 3) seccion = 1;
      if (posicionColumna > 2 && posicionColumna < 6) seccion = 4;
      if (posicionColumna > 5) seccion = 7;
    }

    //2da parte del tablero
    if (posicionFila > 2 && posicionFila < 6) {
      if (posicionColumna < 3) seccion = 2;
      if (posicionColumna > 2 && posicionColumna < 6) seccion = 5;
      if (posicionColumna > 5) seccion = 8;
    }

    //3ra parte del tablero
    if (posicionFila > 5) {
      if (posicionColumna < 3) seccion = 3;
      if (posicionColumna > 2 && posicionColumna < 6) seccion = 6;
      if (posicionColumna > 5) seccion = 9;
    }
    return seccion;
  };

  const obtenerValoresCuadrante = (numSeccion) => {
    var valores = [];
    switch (numSeccion) {
      case 1:
        for (i = 0; i < 3; i++) {
          for (z = 0; z < 3; z++) {
            valores.push(sudoku[i][z]);
          }
        }
        break;
      case 2:
        for (i = 0; i < 3; i++) {
          for (z = 3; z < 6; z++) {
            valores.push(sudoku[i][z]);
          }
        }
        break;
      case 3:
        for (i = 0; i < 3; i++) {
          for (z = 6; z < 9; z++) {
            valores.push(sudoku[i][z]);
          }
        }
        break;
      case 4:
        for (i = 3; i < 6; i++) {
          for (z = 0; z < 3; z++) {
            valores.push(sudoku[i][z]);
          }
        }
        break;
      case 5:
        for (i = 3; i < 6; i++) {
          for (z = 3; z < 6; z++) {
            valores.push(sudoku[i][z]);
          }
        }
        break;
      case 6:
        for (i = 3; i < 6; i++) {
          for (z = 6; z < 9; z++) {
            valores.push(sudoku[i][z]);
          }
        }
        break;
      case 7:
        for (i = 6; i < 9; i++) {
          for (z = 0; z < 3; z++) {
            valores.push(sudoku[i][z]);
          }
        }
        break;
      case 8:
        for (i = 6; i < 9; i++) {
          for (z = 3; z < 6; z++) {
            valores.push(sudoku[i][z]);
          }
        }
        break;
      case 9:
        for (i = 6; i < 9; i++) {
          for (z = 6; z < 9; z++) {
            valores.push(sudoku[i][z]);
          }
        }
        break;
    }
    return valores;
  };

  const obtenerColumna = (posicion) => {
    var columna = [];
    sudoku.map((number) => {
      columna.push(number[posicion]);
    });
    return columna;
  };

  const validar = (num, fila, columna, numSeccion) => {
    var isValid = false;
    var valoresCuadrante = obtenerValoresCuadrante(numSeccion);
    if (
      num > 0 &&
      num < 10 &&
      !fila.includes(num) &&
      !columna.includes(num) &&
      !valoresCuadrante.includes(num)
    ) {
      isValid = true;
    }
    return isValid;
  };

  const generarFila = (posicionFila) => {
    var filaGenerada = [];
    var fila = sudoku[posicionFila];

    fila.map((numero, index) => {
      if (numero === 0) {
        var numRandom = Math.floor(Math.random() * 9) + 1;
        var isValid = validar(
          numRandom,
          fila,
          obtenerColumna(index),
          obtenerSeccion(index, posicionFila)
        );

        isValid && !filaGenerada.includes(numRandom)
          ? filaGenerada.push(numRandom)
          : filaGenerada.push(0);
      } else {
        filaGenerada.push(numero);
      }
    });
    return filaGenerada;
  };

  const generarIndividuo = () => {
    var individuo = [];
    for (var i = 0; i < 9; i++) {
      individuo.push(generarFila(i));
    }
    return individuo;
  };

  const evaluarAptitud = (individuo) => {
    var suma = 0;
    individuo.map((array) => {
      suma += array.filter((numero) => numero === 0).length;
    });
    return suma;
  };

  const generarPosiciones = (generacionActual) => {
    var posiciones = [];

    while (posiciones.length !== generacionActual.length) {
      var posicion = Math.floor(Math.random() * generacionActual.length);
      if (!posiciones.includes(posicion)) posiciones.push(posicion);
    }
    return posiciones;
  };

  const seleccionTorneo = (generacionActual) => {
    var seleccionados = [];
    var posicionesGeneradas = [];

    for (var i = 0; i < generacionActual.length / 2; i++) {
      posicionesGeneradas.push(generarPosiciones(generacionActual));
    }

    posicionesGeneradas.map((posiciones) => {
      posiciones.map((posicion, index) => {
        var vsIndex = index;
        if (!index === 0) vsIndex += 1;

        if (vsIndex < posiciones.length - 1) {
          var candidato1 = generacionActual[vsIndex];
          var candidato2 = generacionActual[vsIndex + 1];
          var aptitud1 = evaluarAptitud(candidato1);
          var aptitud2 = evaluarAptitud(candidato2);

          if (aptitud1 < aptitud2) seleccionados.push(candidato1);
          else seleccionados.push(candidato2);
        }
      });
    });
    return seleccionados;
  };

  const generarPuntosDeCruza = (generacionActual) => {
    var puntosDeCruza = [];

    while (puntosDeCruza.length !== 2) {
      var puntoCruza = Math.floor(Math.random() * 9);
      if (
        puntosDeCruza[0] === undefined &&
        puntoCruza !== 0 &&
        puntoCruza !== generacionActual[0].length - 1
      )
        puntosDeCruza.push(puntoCruza);
      else if (
        puntoCruza !== 0 &&
        puntoCruza !== generacionActual[0].length - 1 &&
        puntoCruza !== puntosDeCruza[0] &&
        puntosDeCruza[0] !== undefined
      )
        puntosDeCruza.push(puntoCruza);
    }
    puntosDeCruza.sort();

    return puntosDeCruza;
  };

  const cruzaIndividuos = (generacionActual, probabilidadCruza) => {
    var generacionCruzada = [];
    var puntosDeCruza = generarPuntosDeCruza(generacionActual);
    var posicionesGeneradas = [];
    var indexIntercambio = 0;

    for (var i = 0; i < generacionActual.length / 2; i++) {
      posicionesGeneradas.push(generarPosiciones(generacionActual));
    }

    posicionesGeneradas.map((posiciones) => {
      posiciones.map((posicion, index) => {
        var probabilidadGenerada = Math.random();
        var swapIndex = index;
        if (!index === 0) swapIndex += 1;

        if (
          swapIndex < posiciones.length - 1 &&
          probabilidadGenerada < probabilidadCruza
        ) {
          var candidato1 = generacionActual[swapIndex];
          var candidato2 = generacionActual[swapIndex + 1];
          var numerosDeIntercambio = [];
          var numerosDeIntercambio2 = [];
          var isValid = false;
          var intercambioIndex = 0;
          var swapNumber = 0;

          //obtiene valores entre los puntos de cruza
          candidato1.map((fila) => {
            numerosDeIntercambio.push(
              fila.slice(puntosDeCruza[0], puntosDeCruza[1] + 1)
            );
          });
          candidato2.map((fila) => {
            numerosDeIntercambio2.push(
              fila.slice(puntosDeCruza[0], puntosDeCruza[1] + 1)
            );
          });

          candidato1.map((fila, index) => {
            indexIntercambio = 0;

            for (var i = puntosDeCruza[0]; i <= puntosDeCruza[1]; i++) {
              swapNumber = numerosDeIntercambio2[index][indexIntercambio];
              isValid = validar(
                swapNumber,
                candidato1[index],
                obtenerColumna(i),
                obtenerSeccion(index, i)
              );

              if (isValid) {
                candidato1[index][i] = swapNumber;
              } else candidato1[index][i] = 0;

              indexIntercambio += 1;
            }
          });

          candidato2.map((fila, index) => {
            indexIntercambio = 0;

            for (var z = puntosDeCruza[0]; z <= puntosDeCruza[1]; z++) {
              var swapNumber = numerosDeIntercambio[index][indexIntercambio];
              isValid = validar(
                swapNumber,
                candidato2[index],
                obtenerColumna(z),
                obtenerSeccion(index, z)
              );

              if (isValid !== true) {
                candidato2[index][z] = swapNumber;
              } else candidato2[index][z] = 0;

              indexIntercambio += 1;
            }
          });
        }
      });
    });
  };

  const mutarGeneracion = (generacionActual, probabilidadMutacion) => {
    //mutar columna completa
    //cambiar dos numeros de lugar
    //validar los numeros que se cambian
    var probabilidadGenerada = Math.random();
    var puntoSeleccionado = Math.floor(Math.random() * 9);
    var puntoIntercambio = Math.floor(Math.random() * 9);

    while (puntoIntercambio === puntoSeleccionado) {
      puntoIntercambio = Math.floor(Math.random() * 9);
    }

    generacionActual.map((individuo, indexIndividuo) => {
      if (probabilidadGenerada <= probabilidadMutacion) {
        individuo.map((fila, index) => {
          var numCambio1 =
            generacionActual[indexIndividuo][index][puntoSeleccionado];
          var numCambio2 =
            generacionActual[indexIndividuo][index][puntoIntercambio];
          var isValid = validar(
            numCambio1,
            fila,
            obtenerColumna(index),
            obtenerSeccion(index, puntoIntercambio)
          );

          if (isValid)
            generacionActual[indexIndividuo][index][
              puntoIntercambio
            ] = numCambio1;
          else generacionActual[indexIndividuo][index][puntoIntercambio] = 0;

          var isValid2 = validar(
            numCambio2,
            fila,
            obtenerColumna(index),
            obtenerSeccion(index, puntoSeleccionado)
          );

          if (isValid2)
            generacionActual[indexIndividuo][index][
              puntoSeleccionado
            ] = numCambio2;
          else generacionActual[indexIndividuo][index][puntoSeleccionado] = 0;
        });
      }
    });
  };

  const generarGeneracion = (numIndividuos) => {
    for (var i = 0; i < numIndividuos; i++) {
      generacionActual.push(generarIndividuo());
    }
  };

  const iniciarProceso = (generaciones) => {
    var mejorAptitud = 0;
    var aptitud = 0;
    var mejoresAptitudes = [];

    for (var i = 0; i < generaciones; i++) {
      setsudoku(generacionActual[mejorAptitud[1]]);
      if (bestSudoku === []) bestSudoku = generacionActual[mejorAptitud[1]];
      if (mejorAptitud[0] > 91 - evaluarAptitud(bestSudoku))
        bestSudoku = generacionActual[mejorAptitud[1]];

      setgeneracionActual([]);
      generarGeneracion(numIndividuos);

      //mejorAptitud[aptitud,index en generacion]
      mejorAptitud = [0, 0];
      aptitud = [0, 0];

      seleccionTorneo(generacionActual);
      cruzaIndividuos(generacionActual, cruza);
      mutarGeneracion(generacionActual, mutacion);

      generacionActual.map((individuo, index) => {
        aptitud = [91 - evaluarAptitud(individuo), index];
        if (mejorAptitud === [0, 0]) mejorAptitud = aptitud;
        if (aptitud[0] > mejorAptitud[0]) mejorAptitud = aptitud;
      });

      mejoresAptitudes.push(mejorAptitud[0]);
    }
    return mejoresAptitudes;
  };

  //Ends here

  async function onInicioClick() {
    try {
      setisLoading(true);

      generarGeneracion(numIndividuos);
      setfitness(iniciarProceso(generaciones));
    } catch {
      console.log("error");
    }

    setisLoading(false);
  }

  if (isLoading)
    return (
      <MainContainer>
        <SideBar
          onInputCruza={onInputCruza}
          onInputMutacion={onInputMutacion}
          onInputGeneraciones={onInputGeneraciones}
          onInputNumIndividuos={onInputNumIndividuos}
          onInicioClick={onInicioClick}
        />
      </MainContainer>
    );

  return (
    <MainContainer>
      <SideBar
        onInputCruza={onInputCruza}
        onInputMutacion={onInputMutacion}
        onInputGeneraciones={onInputGeneraciones}
        onInputNumIndividuos={onInputNumIndividuos}
        onInicioClick={onInicioClick}
      />
      <InformationContainer>
        <Graphic fitness={fitness} />
        <SudokuGraph />
      </InformationContainer>
    </MainContainer>
  );
}

export default Main;
