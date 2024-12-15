function initMap() {
    const mapOptions = {
        center: { lat: 37.7749, lng: -122.4194 }, // San Francisco coordinates
        zoom: 12,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
