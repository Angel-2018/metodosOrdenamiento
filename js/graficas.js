const $grafica = document.querySelector('#grafica');

new Chart($grafica, {
  type: 'line', // Tipo de gráfica
  data: {
    labels: [
      100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000,
      1000000,
    ],
    datasets: [
      {
        label: 'BubbleSort',
        data: [
          64.4204375, 256.6704094, 619.809469, 1083.18880832, 2559.89291,
          2673.4933676, 3331.762094, 3579.6561465, 5438.880765, 8633.68072,
        ],
        // backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'InsertionSort',
        data: [
          16.679, 66.747, 134.551, 208.623, 330.0699999994, 480.698, 660.046,
          868.67000001, 1115.697, 1813.1579999994,
        ],
        // backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
        borderColor: 'rgba(122, 139, 153, 1)',
        borderWidth: 1,
      },
      {
        label: 'SelectionSort',
        data: [
          15.42119999, 30.17119999, 67.229000001, 120.382600002381,
          178.32359999666422, 264.5352, 363.889699999881, 466.8113,
          498.2303000012, 752.218,
        ],
        // backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
        borderColor: 'rgba(249, 105, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'MergeSort',
        data: [
          0.2820000000000107, 0.5010000000000048, 0.9550000000000125,
          1.1280000000000143, 1.4070000000000107, 1.8870000000000005,
          2.218999999999994, 2.7620000000000005, 2.7920000000000016,
          3.1359999999999957,
        ],
        // backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
        borderColor: 'rgba(110, 14, 10, 1)',
        borderWidth: 1,
      },
      {
        label: 'QuickSort',
        data: [
          0.08800000000000008, 0.1589999999999998, 0.237000000000001,
          0.34299999999999997, 0.4510000000000005, 0.738999999999999, 0.782,
          0.8189999999999991, 0.8599999999999994, 0.9859999999999989,
        ],
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
