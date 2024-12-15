function initMap() {
    const mapOptions = {
        center: { lat: 37.7749, lng: -122.4194 }, // San Francisco coordinates
        zoom: 12,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function initMap() {
    // Initialize the map centered around your area
    const mapOptions = {
        zoom: 12,
        center: { lat: 33.4484, lng: -112.0740 }, // Set your area of interest here (e.g., Phoenix, AZ)
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Loop through your data and create markers
    const tnrSites = [
        {
            "name": "Barricades Colony",
            "location": { "lat": 33.680800, "lng": -112.104377 },
            "numberOfCats": 5,
            "catImages": ["cat1.jpg", "cat2.jpg", "cat3.jpg", "cat4.jpg", "cat5.jpg"],
            "wetFoodCans": 5
        },
        {
            "name": "Botron Colony",
            "location": { "lat": 33.682136, "lng": -112.103735 },
            "numberOfCats": 3,
            "catImages": ["cat6.jpg", "cat7.jpg", "cat8.jpg"],
            "wetFoodCans": 3
        }
    ];

    tnrSites.forEach(site => {
        const marker = new google.maps.Marker({
            position: site.location,
            map: map,
            title: site.name
        });

        // InfoWindow content
        const contentString = `
            <div>
                <h3>${site.name}</h3>
                <p><strong>Number of Cats:</strong> ${site.numberOfCats}</p>
                <p><strong>Wet Food Cans Needed:</strong> ${site.wetFoodCans}</p>
                <div>
                    ${site.catImages.map(image => `<img src="images/${image}" alt="Cat" style="width: 50px; height: 50px; margin-right: 5px;">`).join('')}
                </div>
            </div>
        `;

        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener('click', () => {
            infowindow.open(map, marker);
        });
    });
}
