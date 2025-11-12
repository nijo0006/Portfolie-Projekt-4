
// === CHART 1 ===
/*
const ctx2 = document.getElementById("chart2").getContext("2d");
const chart2 = new Chart(ctx2,
    {
        type: "polarArea",
        data: {
            labels: ["USA🇺🇸 ", "Canada🇨🇦", "Frankrig🇫🇷"],
            datasets: [
                {
                    label: "Højeste salg pr land",
                    data: [523.06, 303.96, 195.10],
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
                    text: "Top 3 lande med mest salg (Revenue)",
                    font: { weight: "bold", size: 24 },
                    anchor: "end",
                    align: "start",
                },
            },
            scales: {
                x: {
                    grid: {display: false},
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
    fetch('https://raw.githubusercontent.com/nijo0006/Portfolie-Projekt-4/refs/heads/main/data-revenue.json')
        .then(response => response.json())
        .then(data => {
            console.log("✅ Revenue data hentet:", data);

            // Labels (lande) med flag
            const labels = data.map(item => {
                if (item.country === "USA") return "USA🇺🇸";
                if (item.country === "Canada") return "Canada🇨🇦";
                if (item.country === "France") return "Frankrig🇫🇷";
                return item.country;
            });

            // Values (Revenue) som tal
            const values = data.map(item => Number(item.Revenue));

            // === Polar Area Chart ===
            const ctx2 = document.getElementById("chart2").getContext("2d");

            // Fjern evt. eksisterende chart (slet?)
            if (Chart.getChart(ctx2)) {
                Chart.getChart(ctx2).destroy();
            }

            new Chart(ctx2, {
                type: "polarArea",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Højeste salg pr land",
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
                        easing: "easeOutBounce",
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
                            grid: { display: false },
                            ticks: { font: { size: 20 } },
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
