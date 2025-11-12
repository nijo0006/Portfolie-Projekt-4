
    // === CHART 1 ===
    /*
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

     */

    document.addEventListener("DOMContentLoaded", () => {
        fetch("https://raw.githubusercontent.com/nijo0006/Portfolie-Projekt-4/refs/heads/main/data-sold.json")
            .then(response => response.json())
            .then(data => {
                // === Udpak data fra JSON ===
                const labels = data.map(item => {
                    if (item.Country === "USA") return "USA🇺🇸";
                    if (item.Country === "Canada") return "Canada🇨🇦";
                    if (item.Country === "Brazil") return "Brasilien🇧🇷";
                    return item.Country;
                });

                const values = data.map(item => Number(item.UnitsSold));

                // === CHART 1 === (samme styling som din statiske version)
                const ctx = document.getElementById("chart").getContext("2d");

                // Fjern eventuelt tidligere chart, hvis siden genindlæses dynamisk (slet?)
                if (Chart.getChart(ctx)) {
                    Chart.getChart(ctx).destroy();
                }

                new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Mest rock solgt",
                                data: values,
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
                                    font: { size: 20 },
                                },
                            },
                            y: {
                                beginAtZero: true,
                                grid: { display: false },
                            },
                        },
                    },
                });
            })
            .catch(error => console.error("❌ Fejl ved hentning af data:", error));
    });

