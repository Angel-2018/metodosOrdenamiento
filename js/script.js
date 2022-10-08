const size = document.querySelector('#size');
const btn = document.querySelector('#btn');
const tablaValores = document.querySelector('#tablaValores');
const contenedorTabla = document.querySelector('#contenedorTabla');
const $grafica = document.querySelector('#grafica');
let min = 1000000;
let max = 10000000;

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
      bubbleSort(array);
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

function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        aux = array[j];
        array[j] = array[j + 1];
        array[j + 1] = aux;
      }
    }
  }
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
    label: 'Tiempo de ejecución - Algoritmo de complejidad O(n²)',
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
