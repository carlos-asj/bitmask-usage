Bit Mask usage for engage efficient use of big conditionals

## Example of use

A search for cities by a GMT number

### Inital data

```jsx
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
```

### Simple HTML page for interact:

```jsx
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BIT MASK</title>
</head>
<body>
    <h1>Cities</h1>
    <div id="options"></div>

    <input type="number" id="gmtSearch" placeholder="GMT">
    <button onclick="searchCities()">Find Cities</button>
    <div id="results"></div>
    <script src="bitmask.js"></script>
</body>
</html>
```

The main class containing the functions

`class BitMaskCityFinder() { construtor e demais funções }`

### Construtor

```jsx
constructor() {
	this.cities = []; // cria um array vazio
	this.initCities(); // função que registra as cidades
}
```

### Functions

```jsx
initCities() {
	const cityData = [
		{name: "Moscow", gmt: 3},
		{name: "Paris", gmt: 2},
		{name: "Berlini", gmt: 2},
		// e mais cidades conforme a necessidade
	]; // array com as cidades
	
	this.cities = cityData.map(city => ({ // salva os dados no construtor
		name: city.name,
		gmt: city.gmt,
		mask: this.gmtToMask(city.gmt) // salva o bitmask chamando a função responsável
	}));
	
};
```

```jsx
gmtToMask(gmt) {
	let bitPosition;
	
	if (gmt >= 0) {// gmt positivo
	    bitPosition = 12 - gmt;
	} else {
	    bitPosition = 12 + Math.abs(gmt); // Math.abs inverte o número negativo
	}
	
	return 1 << bitPosition; // 1 para o bit definido
}
```

```jsx
findCitiesByGmt(gmt) {
    const searchMask = this.gmtToMask(gmt);
    return this.cities.filter(city => (city.mask & searchMask) !== 0).map(city => city.name);
    // filtra as cidades com o gmt recebido e mapeia pelo nome
}
```

### Function to render the WEB answer

```jsx
function searchCities() {
    const gmt = parseInt(document.getElementById("gmtSearch").value);
    const results = finder.findCitiesByGmt(gmt); // joga o gmt recebido na função que pesquisa
    document.getElementById("results").innerHTML = `
    <h3>Cidades com GMT ${gmt}:</h3><ul>
        ${results.map(city => `<li>${city}</li>`).join('')}</ul>
    `; // resposta formatada
}
```

### Initialize the instance

`const finder = new BitMaskCityFinder();`

## Same logic applied in python
[See python usage](/README-python.md)
