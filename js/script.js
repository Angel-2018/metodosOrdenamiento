size = document.querySelector('#size');
btn = document.querySelector('#btn');

btn.addEventListener('click', (e) => {
  e.preventDefault();

  if (size.value === '') {
    alert('Debes introducir el tamaño del arreglo');
  } else {
    const array = Array(parseInt(size.value))
      .fill()
      .map(() => Math.floor(51 * Math.random()));

    size.value = '';

    console.log('Arreglo desordenado: ' + array);

    array.sort(function (a, b) {
      return a - b;
    });

    console.log('Arreglo Ordenado ' + array);
  }
});
