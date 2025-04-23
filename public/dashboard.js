const ctx1 = document.getElementById('chart1').getContext('2d');
const chart1 = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: ['Abr 2025', 'Mai 2025', 'Jun 2025'],
    datasets: [{
      label: 'Vendas por mês',
      data: [312, 744, 503],
      backgroundColor: '#3399ff',
    }]
  }
});

const ctx2 = document.getElementById('chart2').getContext('2d');
const chart2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Abr 2025', 'Mai 2025', 'Jun 2025'],
    datasets: [{
      label: 'Entradas por mês',
      data: [100, 200, 450],
      backgroundColor: '#66cc99',
    }]
  }
});
