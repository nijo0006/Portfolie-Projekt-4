
    // === CHART 1 ===
    const ctx = document.getElementById("chart").getContext("2d");
    const chart = new Chart(ctx,
    {
        type: "bar",
        data: {
            labels: ["USA🇺🇸", "Canada🇨🇦", "Brasilien🇧🇷"],
            datasets: [
                {
                    label: "Mest rock solgt",
                    data: [157, 107, 81],
                    backgroundColor: ["#990000", "#CC0000", "#FF3333"],
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
                    text: "Top 3 lande med mest solgt rock",
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
                    grid: {display: false},
                },
            },
        },
    });