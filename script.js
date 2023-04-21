const qS = x => document.querySelector(x);
const qSA = x => document.querySelectorAll(x);

qS('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = qS('#searchInput').value;

    if(input !== '') {
        clearInfo();
        showWarning('Carregando...');
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=86f41bfe81ce0a0775b96b90cb9aa75f&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let json = await results.json(); 

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMin: json.main.temp_min,
                tempMax: json.main.temp_max,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngulo: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização.')
        }
    } else {
        clearInfo();
    };
});

function showInfo(json) {
    showWarning('');

    qS('.titulo').innerHTML = `${json.name}, ${json.country} <img src="https://openweathermap.org/images/flags/${json.country.toLowerCase()}.png" alt="bandeira"></div>`;
    qS('.temp .tempInfo').innerHTML = `${json.temp.toFixed(2)} <sup>°C</sup>`;
    qS('.tempDia .tempMax').innerHTML = `${json.tempMin} <sup>°C</sup>`;
    qS('.tempDia .tempMin').innerHTML = `${json.tempMax} <sup>°C</sup>`;
    qS('.ventoInfo').innerHTML = `${json.windSpeed.toFixed(2)} <span>km/h</span>`;
    qS('.temp img').setAttribute('src',  `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    qS('.ventoPonto').style.transform = `rotate(${json.windAngulo - 90}deg)`;

    qS('.resultado').style.display = 'flex';
};

function clearInfo() {
    showWarning('');
    qS('.resultado').style.display = 'none';
};

function showWarning(msg) {
    qS('.aviso').innerHTML = msg;
};