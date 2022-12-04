const size = document.querySelector('#size');
const btn = document.querySelector('#btn');
const contenedorTablaBubble = document.querySelector('#contenedorTablaBubble');
const contenedorTablaInsertion = document.querySelector(
  '#contenedorTablaInsertion'
);
const contenedorTablaSelection = document.querySelector(
  '#contenedorTablaSelection'
);
const contenedorTablaMerge = document.querySelector('#contenedorTablaMerge');
const contenedorTablaQuick = document.querySelector('#contenedorTablaQuick');
const $grafica = document.querySelector('#grafica');
let min = 10;
let max = 100;

btn.addEventListener('click', (e) => {
  e.preventDefault();

  if (size.value === '') {
    alert('Debes introducir el tamaño del arreglo');
  } else {
    let tamanioArreglo = parseInt(size.value);
    const INCREMENTO = tamanioArreglo;
    let valores = [];
    let tiemposEjecucionBubble = [];
    let tiemposEjecucionInsertion = [];
    let tiemposEjecucionSelection = [];
    let tiemposEjecucionMerge = [];
    let tiemposEjecucionQuick = [];
    let tiempo;
    let start;
    let end;
    let array;

    size.value = '';

    for (let i = 0; i < 10; i++) {
      array = Array(tamanioArreglo)
        .fill()
        .map(() => Math.floor(Math.random() * (max - min) + min));

      let arrayBubble = [];
      let arrayInsertion = [];
      let arraySelection = [];
      let arrayMerge = [];
      let arrayQuick = [];

      for (let j = 0; j < array.length; j++) {
        arrayBubble.push(array[j]);
        arrayInsertion.push(array[j]);
        arraySelection.push(array[j]);
        arrayMerge.push(array[j]);
        arrayQuick.push(array[j]);
      }

      console.log(arrayBubble);
      console.log(arrayInsertion);
      console.log(arraySelection);
      console.log(arrayMerge);
      console.log(arrayQuick);
      console.log(arrayBubble);

      start = performance.now();
      bubbleSort(arrayBubble);
      end = performance.now();

      tiempo = end / 1000 - start / 1000;
      tiemposEjecucionBubble.push(tiempo);

      start = performance.now();
      insertionSort(arrayInsertion);
      end = performance.now();

      tiempo = end / 1000 - start / 1000;
      tiemposEjecucionInsertion.push(tiempo);

      start = performance.now();
      selectionSort(arraySelection);
      end = performance.now();

      tiempo = end / 1000 - start / 1000;
      tiemposEjecucionSelection.push(tiempo);

      start = performance.now();
      quickSort(arrayQuick, 0, arrayQuick.length - 1);
      end = performance.now();

      tiempo = end / 1000 - start / 1000;
      tiemposEjecucionQuick.push(tiempo);

      start = performance.now();
      arrayMerge = mergeSort(arrayMerge);
      end = performance.now();

      tiempo = end / 1000 - start / 1000;
      tiemposEjecucionMerge.push(tiempo);

      valores.push(arrayBubble.length);
      tamanioArreglo += INCREMENTO;
    }

    llenarTabla(
      valores,
      tiemposEjecucionBubble,
      contenedorTablaBubble,
      'Método BubbleSort - Complejidad O(n²)'
    );
    llenarTabla(
      valores,
      tiemposEjecucionInsertion,
      contenedorTablaInsertion,
      'Método InsertionSort - Complejidad O(n²)'
    );
    llenarTabla(
      valores,
      tiemposEjecucionSelection,
      contenedorTablaSelection,
      'Método SelectionSort - Complejidad O(n²)'
    );
    llenarTabla(
      valores,
      tiemposEjecucionMerge,
      contenedorTablaMerge,
      'Método MergeSort - Complejidad O(n log n)'
    );
    llenarTabla(
      valores,
      tiemposEjecucionQuick,
      contenedorTablaQuick,
      'Método QuickSort - Complejidad O(n log n)'
    );
    graficar(
      valores,
      tiemposEjecucionBubble,
      tiemposEjecucionInsertion,
      tiemposEjecucionSelection,
      tiemposEjecucionMerge,
      tiemposEjecucionQuick
    );
  }
});

/* ------ ------ BUBBLE SORT ------ ------ */

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        aux = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = aux;
      }
    }
  }
}

/* ------ ------ INSERTION SORT ------ ------ */

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i];
    let j;

    for (j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
      arr[j + 1] = arr[j];
    }

    arr[j + 1] = currentValue;
  }
}

/* ------ ------ SELECTION SORT ------ ------ */

function selectionSort(arr) {
  let menor;

  for (let i = 0; i < arr.length; i++) {
    menor = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[menor]) {
        menor = j;
      }
    }

    if (menor != i) {
      let temp = arr[i];
      arr[i] = arr[menor];
      arr[menor] = temp;
    }
  }
}

/* ------ ------ MERGE SORT ------ ------ */

function merge(left, right) {
  let sortedArr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }

  return [...sortedArr, ...left, ...right];
}

function mergeSort(arr) {
  const half = arr.length / 2;

  if (arr.length <= 1) {
    return arr;
  }

  const left = arr.splice(0, half);
  const right = arr;
  return merge(mergeSort(left), mergeSort(right));
}

/* ------ ------ QUICK  SORT ------ ------ */

function partition(arr, start, end) {
  const pivotValue = arr[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      pivotIndex++;
    }
  }

  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}

function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }

  let index = partition(arr, start, end);

  quickSort(arr, start, index - 1);
  quickSort(arr, index + 1, end);
}

/* ------ ------ LLENADO DE TABLA ------ ------ */

function llenarTabla(valores, tiemposEjecucion, contenedor, titulo) {
  let html = /* html */ `
    <h2>${titulo}</h2>
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

  contenedor.innerHTML = html;
}

function graficar(
  valores,
  tiemposEjecucionBubble,
  tiemposEjecucionInsertion,
  tiemposEjecucionSelection,
  tiemposEjecucionMerge,
  tiemposEjecucionQuick
) {
  const etiquetas = valores;

  new Chart($grafica, {
    type: 'line', // Tipo de gráfica
    data: {
      labels: valores,
      datasets: [
        {
          label: 'BubbleSort',
          data: tiemposEjecucionBubble,
          // backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'InsertionSort',
          data: tiemposEjecucionInsertion,
          // backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
          borderColor: 'rgba(122, 139, 153, 1)',
          borderWidth: 1,
        },
        {
          label: 'SelectionSort',
          data: tiemposEjecucionSelection,
          // backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
          borderColor: 'rgba(249, 105, 0, 1)',
          borderWidth: 1,
        },
        {
          label: 'MergeSort',
          data: tiemposEjecucionMerge,
          // backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
          borderColor: 'rgba(110, 14, 10, 1)',
          borderWidth: 1,
        },
        {
          label: 'QuickSort',
          data: tiemposEjecucionQuick,
          // backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
          borderColor: 'rgba(16, 69, 71, 1)',
          borderWidth: 1,
        },
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
