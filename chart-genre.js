//   CHART 1    -    TOP 3 GENRE MEST SOLGT

//DOMContentLoaded sikrer, at JavaScript først kører, når HTML'en/DOM'en er loaded
document.addEventListener("DOMContentLoaded", () => {

    //Vi fetcher dataen fra vores json fil. Linket er fra GitHub hvor vores endpoint ligger.
    fetch('https://raw.githubusercontent.com/nijo0006/Portfolie-Projekt-4/refs/heads/main/data-genre.json')
        .then(response => response.json())
        .then(data => {

            // Her udpakker vi data fra JSON og tilføjer emojies for at gøre det mere visuelt
            //Vi laver en const der hedder labels, som vi senere kan bruge til at bygge vores chart
            const labels = data.map(item => {
                if (item.Genre === "Rock") return "Rock🎸";
                if (item.Genre === "Latin") return "Latin💃";
                if (item.Genre === "Metal") return "Metal🤘";
                return item.Genre;
            });

            // Vi laver en const til values, som vi senere kan bruge til at bygge vores chart
            // map går igennem hvert element arrayet, og returnerer et nyt array som vi bestemmer. Som så er number
            const values = data.map(item => Number(item.TotalSales));


            // Vi bygger vores chart. Kilde: Gode noter fra undervisningen / Chart.js.org
            const ctx3 = document.getElementById("chart3").getContext("2d");

            new Chart(ctx3, {
                type: "bar", //Vi vælger et barchart, fordi vi synes det displayer dataen bedst
                data: {
                    labels: labels, //consten fra før
                    datasets: [
                        {
                            label: "Højeste salg pr land",
                            data: values, //consten fra før
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
                    indexAxis: "y", // vi vælger y som vores index axis, sådan at det bliver horisontalt
                    animation: {
                        duration: 1000,
                        easing: "easeOutBounce", // sjov bouce effekt
                    },
                    plugins: {
                        title: {
                            display: true, // titlen vises
                            text: "Top 3 genre med højeste salg",
                            font: { weight: "bold", size: 24 },
                        },
                    },
                    scales: {
                        x: {
                            grid: { display: false }, //  vi fjerner gitteret fra x-aksen
                            ticks: { font: { size: 20 },
                                callback: function (value) {
                                    return `$${value}`;} // her laver vi en funktion, som tilføjer $tegn før hver value
                                    },
                        },
                        y: {
                            beginAtZero: true,
                            grid: { display: false },//Vi fjerner gitteret fra y-aksen
                        },
                    },
                },
            });
        })
        // Fejlkode som kommer fra i consollen, hvis noget går galt
        .catch(error => console.error(" Fejl ved hentning af data:", error));
});

