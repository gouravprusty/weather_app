const apiKey = "7c4b664a5cefb46f27c295f22b84c1ea";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let area = document.querySelector(".city");
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let searchBtn = document.querySelector(".search button")
let searchBox = document.querySelector(".search input")
let weatherIcon = document.querySelector(".weather_icon")

async function checkWeather(city){
    try{
        const res = await axios.get(apiUrl + city + `&appid=${apiKey}`);
        const data = res.data;

        document.querySelector(".error_msg").style.display = "none";

        area.innerText = data.name;
        temp.innerText = Math.round(data.main.temp) + "°c";
        humidity.innerText = data.main.humidity + "%";
        wind.innerText = data.wind.speed + " km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.setAttribute("src", "images/cloud.png");
        }else if(data.weather[0].main == "Clear"){
            weatherIcon.setAttribute("src", "images/clear.png");
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.setAttribute("src", "images/rain.png");
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.setAttribute("src", "images/drizzle.png");
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.setAttribute("src", "images/mist.png");
        };

        document.querySelector(".weather").style.display = "block";
    }catch(err){
        if(err.response.status == 404){
            document.querySelector(".error_msg").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }
    };
};
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    searchBox.value = "";
});