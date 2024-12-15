function initMap() {
    // Map options
    const mapOptions = {
        zoom: 12,
        center: { lat: 33.4484, lng: -112.0740 }, // Example coordinates for Phoenix, AZ
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Create the map instance
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Data for TNR sites (colony locations, number of cats, etc.)
    const tnrSites = [
        {
            "name": "Barricades Colony",
            "location": { "lat": 33.680800, "lng": -112.104377 },
            "numberOfCats": 5,
            "catImages": ["cat1.jpg", "cat2.jpg", "cat3.jpg", "cat4.jpg", "cat5.jpg"],
            "wetFoodCans": 5,
            "specialCatImage": "pics/lucy.jpg"  // Path to Lucy's cat photo
        },
        {
            "name": "Botron Colony",
            "location": { "lat": 33.682136, "lng": -112.103735 },
            "numberOfCats": 3,
            "catImages": ["cat6.jpg", "cat7.jpg", "cat8.jpg"],
            "wetFoodCans": 3
        }
    ];

    // Loop through your TNR sites data and create markers
    tnrSites.forEach(site => {
        const marker = new google.maps.Marker({
            position: site.location,
            map: map,
            title: site.name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE, // Makes the marker a circle
                fillColor: '#FF007F', // Bright pink color
                fillOpacity: 1,
                strokeColor: '#FF007F', // Border color same as the fill
                strokeWeight: 2, // Border thickness
                scale: 12 // Size of the marker (larger value = larger marker)
            }
        });

        // Create the content for the InfoWindow
        const contentString = `
            <div>
                <h3>${site.name}</h3>
                <p><strong>Number of Cats:</strong> ${site.numberOfCats}</p>
                <p><strong>Wet Food Cans Needed:</strong> ${site.wetFoodCans}</p>
                <div>
                    ${site.catImages.map(image => `
                        <img src="images/${image}" alt="Cat" style="width: 50px; height: 50px; margin-right: 5px;">
                    `).join('')}
                </div>
                ${site.specialCatImage ? `
                    <div style="margin-top: 10px;">
                        <strong>Special Cat:</strong><br>
                        <img src="${site.specialCatImage}" alt="Lucy" style="width: 100px; height: auto;">
                    </div>
                ` : ''}
            </div>
        `;

        // Create the InfoWindow
        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        // Add a click event listener to open the InfoWindow on marker click
        marker.addListener('click', () => {
            infowindow.open(map, marker);
        });
    });
}

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Login successful
            window.location.href = 'index.html'; // Redirect to the main page
        } else {
            document.getElementById('login-message').textContent = data.message; // Show error message
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('login-message').textContent = "An error occurred. Please try again.";
    }
});
