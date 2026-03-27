class BitMaskCityFinder {
    constructor() {
        this.cities = [];
        this.initCities();
    }

    initCities() {
        const cityData = [
            {name: "Moscow", gmt: 3},
            {name: "Paris", gmt: 2},
            {name: "Berlin", gmt: 2},
            {name: "Brussels", gmt: 2},
            {name: "Amsterdam", gmt: 2},
            {name: "Rome", gmt: 2},
            {name: "London", gmt: 1},
            {name: "Dublin", gmt: 1},
            {name: "New York", gmt: -4},
            {name: "Washington, DC", gmt: -4},
            {name: "St. Louis", gmt: -5},
            {name: "Los Angeles", gmt: -7},
            {name: "Tokyo", gmt: 9},
            {name: "Beijing", gmt: 8},
            {name: "Ho Chi Minh City", gmt: 7},
            {name: "Mumbai", gmt: 5},
        ]

        this.cities = cityData.map(city => ({
            name: city.name,
            gmt: city.gmt,
            mask: this.gmtToMask(city.gmt)
        }))

    };
    
    gmtToMask(gmt) {
        let bitPosition;

        if (gmt >= 0) {
            bitPosition = 12 - gmt;
        } else {
            bitPosition = 12 + Math.abs(gmt);
        }

        return 1 << bitPosition;
    }

    findCitiesByGmt(gmt) {
        const searchMask = this.gmtToMask(gmt);
        return this.cities.filter(city => (city.mask & searchMask) !== 0).map(city => city.name);
    }

}

function searchCities() {
    const gmt = parseInt(document.getElementById("gmtSearch").value);
    const results = finder.findCitiesByGmt(gmt);
    document.getElementById("results").innerHTML = `
    <h3>Cidades com GMT ${gmt}:</h3><ul>
        ${results.map(city => `<li>${city}</li>`).join('')}</ul>
    `;
}

const finder = new BitMaskCityFinder();