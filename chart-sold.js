
// === CHART 1 ===
const ctx2 = document.getElementById("chart2").getContext("2d");
const chart2 = new Chart(ctx2,
    {
        type: "pie",
        data: {
            labels: ["🇺🇸", "🇨🇦", "🇫🇷"],
            datasets: [
                {
                    label: "Højeste salg pr land",
                    data: [523.06, 303.96, 195.10],
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
                    text: "Top 3 lande med mest salg (Revenue)",
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