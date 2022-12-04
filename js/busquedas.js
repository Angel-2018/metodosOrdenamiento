const number = document.querySelector('#number');
const btn = document.querySelector('#btn');
const contenedorTablaLineal = document.querySelector('#contenedorTablaLineal');
const contenedorTablaIterativa = document.querySelector(
  '#contenedorTablaIterativa'
);
const contenedorTablaRecursiva = document.querySelector(
  '#contenedorTablaRecursiva'
);
let min = 0;
let max = 10000000;
let array = Array(10000000)
  .fill()
  .map(() => Math.floor(Math.random() * (max - min) + min));

btn.addEventListener('click', (e) => {
  e.preventDefault();

  if (number.value === '') {
    alert('Debes introducir un numero');
  } else {
    let item = parseInt(number.value);
    let start;
    let position;
    let end;
    let time;
    number.value = '';

    start = performance.now();
    position = linearSearch(array, item);
    end = performance.now();
    time = end / 1000 - start / 1000;
    llenarTabla(
      array,
      item,
      position,
      time,
      'Busqueda Lineal',
      contenedorTablaLineal
    );

    quickSort(array, 0, array.length - 1);

    start = performance.now();
    position = binarySearchIterative(array, item);
    end = performance.now();
    time = end / 1000 - start / 1000;
    llenarTabla(
      array,
      item,
      position,
      time,
      'Busqueda Binaria Iterativa',
      contenedorTablaIterativa
    );

    start = performance.now();
    position = binarySearchRecursive(array, 0, array.length - 1, item);
    end = performance.now();
    time = end / 1000 - start / 1000;
    llenarTabla(
      array,
      item,
      position,
      time,
      'Busqueda Binaria Recursiva',
      contenedorTablaRecursiva
    );
  }
});

function partition(arr, start, end) {
  // Taking the last element as the pivot
  const pivotValue = arr[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      // Swapping elements
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      // Moving to next element
      pivotIndex++;
    }
  }

  // Putting the pivot value in the middle
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}

function quickSort(arr, start, end) {
  // Base case or terminating case
  if (start >= end) {
    return;
  }

  // Returns pivotIndex
  let index = partition(arr, start, end);

  // Recursively apply the same logic to the left and right subarrays
  quickSort(arr, start, index - 1);
  quickSort(arr, index + 1, end);
}

function binarySearchIterative(arr, item) {
  var min = 0;
  var max = arr.length - 1;

  while (min <= max) {
    var middle = Math.floor((min + max) / 2);
    var guess = arr[middle];

    if (guess === item) {
      return 'Posición: ' + middle;
    }

    if (guess > item) {
      max = middle - 1;
    } else {
      min = middle + 1;
    }
  }
  return 'Elemento no encontrado';
}

function binarySearchRecursive(arr, l, r, x) {
  if (l > r) return 'Elemento no encontrado';

  const m = Math.floor((l + r) / 2);

  if (arr[m] === x) return 'Posición: ' + m;

  if (arr[m] < x) {
    return binarySearchRecursive(arr, m + 1, r, x);
  } else {
    return binarySearchRecursive(arr, l, m - 1, x);
  }
}

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return 'Posición: ' + i;
    }
    console.log(i);
  }
  return 'Elemento no encontrado';
}

function llenarTabla(values, number, position, time, title, container) {
  let html = /* html */ `
    <table class="tabla-valores" id="#tabla-valores">
      <thead>
        <tr>
          <th scope="col">${title}</th>
        </tr>
      </thead>        
    <tbody>
  `;

  for (let i = 0; i < 10; i++) {
    html += /* html */ `
      <tr>
        <td>${values[i]}</td>
      </tr>
    `;
  }

  html += /* html */ `
      </tbody>
    </table>
    <p>Numero buscado: ${number}</p>
    <p>${position}</p>
    <p>Tiempo: ${time}</p>
  `;

  container.innerHTML = html;
}
