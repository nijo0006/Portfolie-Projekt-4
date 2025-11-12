// CHART 2  -   TOP 3 LANDE FLEST SOLGTE ROCKALBUMS

//DOMContentLoaded sikrer, at JavaScript først kører, når HTML'en/DOM'en er loaded
    document.addEventListener("DOMContentLoaded", () => {

        //Vi fetcher dataen fra vores json fil. Linket er fra GitHub hvor vores endpoint ligger.
        fetch("https://raw.githubusercontent.com/nijo0006/Portfolie-Projekt-4/refs/heads/main/data-sold.json")
            .then(response => response.json())
            .then(data => {

                // Her udpakker vi data fra JSON og tilføjer emojies for at gøre det mere visuelt med flag
                //Vi laver en const der hedder labels, som vi senere kan bruge til at bygge vores chart
                const labels = data.map(item => {
                    if (item.Country === "USA") return "USA🇺🇸";
                    if (item.Country === "Canada") return "Canada🇨🇦";
                    if (item.Country === "Brazil") return "Brasilien🇧🇷";
                    return item.Country;
                });

// Vi laver en const til values, som vi senere kan bruge til at bygge vores chart
                const values = data.map(item => Number(item.UnitsSold));

              // Vi bygger vores chart. Kilde: Gode noter fra undervisningen / Chart.js.org
                const ctx = document.getElementById("chart").getContext("2d");
                new Chart(ctx, {
                    type: "bar", //vi vælger en bar chart, da vi synes, at det vil visualisere dataen bedst
                    data: {
                        labels: labels, //consten fra før
                        datasets: [
                            {
                                label: "Flest solgte rockalbums",
                                data: values, // consten fra før
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
                                display: true, // viser titlen
                                text: "Top 3 lande med flest solgte rock albums",
                                font: { weight: "bold", size: 24 },
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
                                grid: { display: false }, // fjerner gitteret

                            },
                        },
                    },
                });
            })
            //Fejlkode, hvis noget går galt
            .catch(error => console.error("Fejl ved hentning af data:", error));
    });

