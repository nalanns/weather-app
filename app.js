const btn = document.querySelector(".btn");
const input = document.querySelector("input");
const key = "6c1b8fa3b1dc32c5ccbad2c12e78d2be";
const tempSpan = document.getElementById("temp")
const iconSpan = document.querySelector(".icon")
const citySpan = document.querySelector(".city")
const dateSpan = document.querySelector(".date")
const windSpan = document.querySelector("#speed")
const feelSpan = document.querySelector("#feels-like")
const descSpan = document.querySelector(".description")
// const celc = °C


btn.addEventListener("click", (e) => {
  const target = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${target}&appid=${key}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => createElement(data));
});

const createElement = (data) => {
  console.log(data);
  const { main, name, weather} = data;
  const { temp, humidity, feels_like } = main;
  const { description, icon } = weather[0];
  // const {speed} = wind
  const iconLink = "https://openweathermap.org/img/wn/" + icon + ".png";

  tempSpan.innerText = `Temp: ${temp} °C`
  iconSpan.src = iconLink
  citySpan.innerText = name
  dateSpan.innerText = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`
  // windSpan.innerText = speed
  feelSpan.innerText = `Feels like: ${feels_like}`
  descSpan.innerText = description

  if(description === "broken clouds" || description ===  "scattered clouds" ||  description === 'overcast clouds' || description === 'few clouds'){
    // const bgBody = document.querySelector("body").style.backgroundImage
    document.body.style.backgroundImage = "url('./img/cloudy.jpg')";
  } else if( description === 'clear sky' || description === "sunny"){
    document.body.style.backgroundImage = "url('./img/sunny.jpg')";
  } else if(description === 'light snow' || description === 'light shower snow' || description === "snow"){
    document.body.style.backgroundImage = "url('./img/snowy.jpg')";
  } else if (description === 'haze' || description === 'mist' || description === 'fog'){
    document.body.style.backgroundImage = "url('./img/foggy.jpg')";    
  }
  
};

input.addEventListener("keydown", (event) =>{
  if (event.code === "Enter"){
    btn.click()
    createElement()
  }
  // if (event.keyCode === 13){
  //   btn.click()
  // }
})

window.addEventListener("load", () => {
  input.focus()
})

