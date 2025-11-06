const ctx = document.querySelector('#chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Rock Salg Top 3'
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 40
                    }
                }
            }
        },
    },
    data: {
        labels: ['🇺🇸', '🇨🇦', '🇧🇷',],
        datasets: [{
            label: 'Mest rock solgt',
            data: [157, 107, 81],
            backgroundColor: ['red', 'lightgrey', 'lightgrey', 'lightgrey']
        }]
    },
})