//  CHART 3  --  TOP 3 LANDE MED MEST SALG

//DOMContentLoaded sikrer, at JavaScript først kører, når HTML'en/DOM'en er loaded
document.addEventListener("DOMContentLoaded", () => {

    //Vi fetcher dataen fra vores json fil. Linket er fra GitHub hvor vores endpoint ligger.
    fetch('https://raw.githubusercontent.com/nijo0006/Portfolie-Projekt-4/refs/heads/main/data-revenue.json')
        .then(response => response.json())
        .then(data => {

            // Her udpakker vi data fra JSON og tilføjer emojies for at gøre det mere visuelt med flagene
            //Vi laver en const der hedder labels, som vi senere kan bruge til at bygge vores chart
            const labels = data.map(item => {
                if (item.country === "USA") return "USA🇺🇸";
                if (item.country === "Canada") return "Canada🇨🇦";
                if (item.country === "France") return "Frankrig🇫🇷";
                return item.country;
            });

            // Vi laver en const til values, som vi senere kan bruge til at bygge vores chart
            // map går igennem hvert element arrayet, og returnerer et nyt array som vi bestemmer. Som så er number
            const values = data.map(item => Number(item.Revenue));

            // Vi bygger vores chart. Kilde: Gode noter fra undervisningen / Chart.js.org
            const ctx2 = document.getElementById("chart2").getContext("2d");

            new Chart(ctx2, {
                type: "polarArea", // Vi vælger et polar area chart, fordi det så sejt ud, og gav et godt overblik
                data: {
                    labels: labels, // consten fra før
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
                    animation: {
                        duration: 1000,
                        easing: "easeOutBounce", // sjov bouce effekt
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: "Top 3 lande med mest salg",
                            font: { weight: "bold", size: 24 },
                        },
                    },
                    scales: {
                        r: {  // r-aksen i polarArea
                            ticks: {
                                callback: function (value) {
                                    return `$${value}`; // Tilføjer $ foran tallet
                                },
                            },
                        },
                    },
                },
            });
        })
        // fejlkoden som kommer frem i consollen ved fejl
        .catch(error => console.error(" Fejl ved hentning af data:", error));
});
