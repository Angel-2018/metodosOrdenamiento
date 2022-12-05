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

btn.addEventListener('click', (e) => {
  e.preventDefault();

  if (number.value === '') {
    alert('Debes introducir un numero');
  } else {
    let array = Array(10000000)
      .fill()
      .map(() => Math.floor(Math.random() * (max - min) + min));
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
