const chartSalesProduct = document.getElementById('chartSalesProduct');
const chartOrdersTotal = document.getElementById('chartOrdersTotal');
const chartSalesDaily = document.getElementById('chartSalesDaily')
const chartOrderMonthly = document.getElementById('chartOrderMonthly')
const chartProfit = document.getElementById('chartProfit')
const months = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];
const days = [
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
]
const data = {
  labels: months,
  datasets: [
    {
      label: 'Sản phẩm',
      data: [165, 259, 180, 181, 156, 155, 250, 290, 280, 288, 265, 287],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};
const orderData = {
  labels: ['Đơn hàng thành công', 'Đơn hàng bị huỷ'],
  datasets: [
    {
      data: [1552, 142],
      backgroundColor: ['#63FF84', '#FF6384'],
    },
  ],
};

const orderMothlyData = {
  labels: ['Đơn hàng thành công', 'Đơn hàng bị huỷ'],
  datasets: [
    {
      data: [52, 2],
      backgroundColor: ['#63FF84', '#FF6384'],
    },
  ],
};
const salesDailyData = {
  labels: days,
  datasets: [{
    label: 'Sản phẩm',
    data: [65, 59, 80, 81, 56, 55],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
    ],
    borderWidth: 1
  }]
}

const profitData = {
  labels: days,
  datasets: [
    {
      label: 'VND',
      data: [1650000, 2590000, 1800000, 1810000, 1560000, 1550000],
      fill: false,
      borderColor: 'rgb(0,255,0)',
      tension: 0.1,
    },
  ],

}

new Chart(chartSalesProduct, {
  type: 'line',
  data: data,
  responsive: true,
  maintainAspectRatio: false,
});


new Chart(chartOrdersTotal, {
  type: 'pie',
  data: orderData,
});


new Chart(chartSalesDaily, {
  type: 'bar',
  data: salesDailyData,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
});

new Chart(chartOrderMonthly, {
  type: 'pie',
  data: orderMothlyData,
});

new Chart(chartProfit, {
  type: 'line',
  data: profitData,
  responsive: true,
  maintainAspectRatio: false,
});