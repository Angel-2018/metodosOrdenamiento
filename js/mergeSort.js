const size = document.querySelector('#size');
const btn = document.querySelector('#btn');
const tablaValores = document.querySelector('#tablaValores');
const contenedorTabla = document.querySelector('#contenedorTabla');
const $grafica = document.querySelector('#grafica');
let min = 100000;
let max = 1000000;

btn.addEventListener('click', (e) => {
  e.preventDefault();

  if (size.value === '') {
    alert('Debes introducir el tamaño del arreglo');
  } else {
    let tamanioArreglo = parseInt(size.value);
    const INCREMENTO = tamanioArreglo;
    let array;
    let valores = [];
    let tiemposEjecucion = [];
    size.value = '';

    for (let i = 0; i < 10; i++) {
      array = Array(tamanioArreglo)
        .fill()
        .map(() => Math.floor(Math.random() * (max - min) + min));

      let start = performance.now();
      array = mergeSort(array);
      let end = performance.now();

      let tiempo = end / 1000 - start / 1000;
      valores.push(tamanioArreglo);
      tiemposEjecucion.push(tiempo);
      tamanioArreglo += INCREMENTO;
      console.log('Corrida ' + i);
      console.log(tiempo);
    }

    llenarTabla(valores, tiemposEjecucion);
    graficar(valores, tiemposEjecucion);
  }
});

function merge(left, right) {
  let sortedArr = []; // the sorted elements will go here

  while (left.length && right.length) {
    // insert the smallest element to the sortedArr
    if (left[0] < right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }

  // use spread operator and create a new array, combining the three arrays
  return [...sortedArr, ...left, ...right];
}

function mergeSort(arr) {
  const half = arr.length / 2;

  // the base case is array length <=1
  if (arr.length <= 1) {
    return arr;
  }

  const left = arr.splice(0, half); // the first half of the array
  const right = arr;
  return merge(mergeSort(left), mergeSort(right));
}

function llenarTabla(valores, tiemposEjecucion) {
  let html = /* html */ `
    <table class="tabla-valores" id="#tabla-valores">
      <thead>
        <tr>
          <th scope="col">Ejecución</th>
          <th scope="col">Total Valores</th>
          <th scope="col">Tiempo de Ejecución</th>
        </tr>
      </thead>        
    <tbody>
  `;

  for (let i = 0; i < valores.length; i++) {
    html += /* html */ `
      <tr>
        <td>${i + 1}</td>
        <td>${valores[i]}</td>
        <td>${tiemposEjecucion[i]}</td>
      </tr>
    `;
  }

  html += /* html */ `
      </tbody>
    </table>
  `;

  contenedorTabla.innerHTML = html;
}

function graficar(valores, tiemposEjecucion) {
  const etiquetas = valores;

  const datosTiempo = {
    label: 'Tiempo de ejecución - Algoritmo de complejidad O(n log n)',
    data: tiemposEjecucion, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    // backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
    borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
    borderWidth: 1, // Ancho del borde
  };

  new Chart($grafica, {
    type: 'line', // Tipo de gráfica
    data: {
      labels: etiquetas,
      datasets: [
        datosTiempo,
        // Aquí más datos...
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              // min: 0,
              // max: 1,
              // stepSize: 0.5,
            },
          },
        ],
      },
    },
  });
}
