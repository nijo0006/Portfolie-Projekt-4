fetch('http://localhost:8080/basicquery')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });

