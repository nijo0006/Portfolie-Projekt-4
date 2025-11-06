fetch('https://raw.githubusercontent.com/nijo0006/Portfolie-Projekt-4/refs/heads/main/data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });

