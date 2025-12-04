async function searchRecommendations() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    resultsDiv.style.position = 'absolute';
    resultsDiv.style.top = '50px';
    resultsDiv.style.width = '450px';
    resultsDiv.style.background = 'white';
    resultsDiv.style.right = '50px';
    resultsDiv.style.padding = '50px';




    if (!input) return;

    try {
        const response = await fetch("./travel_recommendation_api.json");
        const data = await response.json();

        let results = [];

        // -----------------------------
        // KEYWORD MATCHING
        // -----------------------------
        if (input.includes("beach")) {
            results = data.beaches;

        } else if (input.includes("temple")) {
            results = data.temples;

        } else if (input.includes("country")) {
            // Flatten countries → cities
            data.countries.forEach(country => {
                country.cities.forEach(city => results.push(city));
            });
        }

        // -----------------------------
        // DISPLAY RESULTS
        // -----------------------------
        if (results.length === 0) {
            resultsDiv.innerHTML = "<p>No results found.</p>";
            return;
        }

        results.forEach(place => {
            resultsDiv.innerHTML += `
                <div class="card">
                    <h2>${place.name}</h2>
                    <img src="${place.imageUrl}" width="300" alt="${place.name}">
                    <p>${place.description}</p>
                </div>
                <hr>
            `;
        });

    } catch (error) {
        console.error("Failed to fetch JSON:", error);
        resultsDiv.innerHTML = "<p>Error loading recommendations.</p>";
    }
}

function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
}
