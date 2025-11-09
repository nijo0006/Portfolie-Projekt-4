
// === CHART 1 ===
const ctx3 = document.getElementById("chart3").getContext("2d");
const chart3 = new Chart(ctx3,
    {
        type: "doughnut",
        data: {
            labels: ["Rock🎸", "Latin💃", "Metal🤘"],
            datasets: [
                {
                    label: "Højeste salg pr land",
                    data: [826.65, 382.14, 261.36],
                    backgroundColor: ["red", "green", "yellow"],
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: "black",
                    hoverBorderWidth: 5,
                    hoverBorderColor: "black",
                },
            ],
        },
        options: {
            animation: {
                duration: 1000,
                easing: "easeOutBounce", // sjov bounce-effekt
            },
            plugins: {
                title: {
                    display: true,
                    text: "Top 3 genre med højeste salg",
                    font: { weight: "bold", size: 24 },
                    anchor: "end",
                    align: "start",
                },
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 20,
                        },
                    },
                },
                y: {
                    beginAtZero: true,
                },
            },
        },
    });