//   CHART 3    -    TOP 3 GENRE MEST SOLGT

document.addEventListener("DOMContentLoaded", () => {
    fetch('https://raw.githubusercontent.com/nijo0006/Portfolie-Projekt-4/refs/heads/main/data-genre.json')
        .then(response => response.json())
        .then(data => {
            console.log("✅ Genre data hentet:", data);

            // Labels (genrer med emoji)
            const labels = data.map(item => {
                if (item.Genre === "Rock") return "Rock🎸";
                if (item.Genre === "Latin") return "Latin💃";
                if (item.Genre === "Metal") return "Metal🤘";
                return item.Genre;
            });

            // Values (TotalSales) som tal og i dollars
            const values = data.map(item => Number(item.TotalSales));



            // === Bar Chart (horizontal) ===
            const ctx3 = document.getElementById("chart3").getContext("2d");

            // Fjern evt. tidligere chart
            if (Chart.getChart(ctx3)) {
                Chart.getChart(ctx3).destroy();
            }

            new Chart(ctx3, {
                type: "bar",
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
                    indexAxis: "y",
                    animation: {
                        duration: 1000,
                        easing: "easeOutBounce",
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: "Top 3 genre med højeste salg (Revenue)",
                            font: { weight: "bold", size: 24 },
                            anchor: "end",
                            align: "start",
                        },
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { font: { size: 20 },
                                callback: function (value) {
                                    return `$${value}`;}
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

