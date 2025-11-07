
// === CHART 1 ===
const ctx2 = document.getElementById("chart2").getContext("2d");
const chart2 = new Chart(ctx2,
    {
        type: "bar",
        data: {
            labels: ["🇺🇸", "🇨🇦", "🇧🇷"],
            datasets: [
                {
                    label: "Mest rock solgt",
                    data: [157, 107, 81],
                    backgroundColor: ["red", "lightgrey", "lightgrey"],
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
                    text: "Rock Salg Top 3",
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