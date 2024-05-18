const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let steps = [5000, 7000, 6000, 8000, 9000, 10000, 7500]; // Sample steps data
let completed = [false, false, false, false, false, false, false]; // Array to track completion

const ctx = document.getElementById('exerciseChart').getContext('2d');

const exerciseChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: 'Steps Taken',
            data: steps,
            fill: true,
            backgroundColor: 'rgba(237, 236, 244, 0.8)', // Background color
            borderColor: '#432C81', // Line color
            borderWidth: 2,
            pointBackgroundColor: '#432C81',
            pointRadius: 5,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: 'rgba(67, 44, 129, 0.8)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: '#495057'
                },
                gridLines: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: '#495057'
                },
                gridLines: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }]
        },
        legend: {
            display: true,
            labels: {
                fontColor: '#495057'
            }
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#432C81',
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            callbacks: {
                label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel;
                }
            }
        },
        onClick: function(evt, elements) {
            if (elements.length > 0) {
                const index = elements[0]._index;
                completed[index] = !completed[index];
                updateChart();
            }
        }
    }
});

function updateChart() {
    exerciseChart.data.datasets[0].pointBackgroundColor = completed.map(complete => complete ? 'green' : '#432C81');
    exerciseChart.update();
}
