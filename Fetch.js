const sold=fetch('https://raw.githubusercontent.com/nijo0006/Portfolie-Projekt-4/refs/heads/main/data-sold.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });

const revenue=fetch('https://raw.githubusercontent.com/nijo0006/Portfolie-Projekt-4/refs/heads/main/data-revenue.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });

const MostSoldGenre=fetch('https://raw.githubusercontent.com/nijo0006/Portfolie-Projekt-4/refs/heads/main/data-genre.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });

