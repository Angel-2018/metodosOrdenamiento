export function selectionSort(arr) {
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
