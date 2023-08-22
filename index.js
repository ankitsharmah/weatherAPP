




const SEarch=document.querySelector('.custom');
const Back=document.querySelector('.back');
const FLAG=document.querySelector('.flag');
const INput=document.querySelector('#input');
const CUSTOM=document.querySelector('#custom-search');
const CUSTOMbutton=document.querySelector('#custom-button');
const PLACE=document.querySelector('#place');
const tempdisplay=document.querySelector('.temperature');
const winddisplay=document.querySelector('#Wind');
const humiddisplay=document.querySelector('#humid');
const raindisplay=document.querySelector('#rain-data');
const rainLogo=document.querySelector('#rain-logo');

const yourLocation=document.querySelector('#your-weather');
// getLocation();


const Container=document.querySelector('.container');
// const Data='';
// getCustomWeather();

INput.addEventListener('click',()=>{
  INput.style.outline = "2px solid lightblue";
})

CUSTOMbutton.addEventListener('click',()=>{
  getCustomWeather(INput.value);

})

function toDisplay(p,t,w,h,r,q,i){
  const temp=p;
  PLACE.innerHTML= temp.toUpperCase();
  FLAG.src=`https://flagcdn.com/72x54/${q}.png`;
  rainLogo.src=`https://api.openweathermap.org/img/w/${i}.png`
  tempdisplay.innerHTML=t;
  winddisplay.innerHTML=w;
  humiddisplay.innerHTML=h;
  raindisplay.innerHTML=r;
  Container.classList.remove('active');
  SEarch.classList.remove('index');
  SEarch.classList.add('Index');
  Back.classList.remove('index');
  Back.classList.add('Index');
  Container.style.transition = "ease-in-out 100ms"
  SEarch.style.transition = "ease-in-out 400";
  INput.value='';
}



yourLocation.addEventListener('click',()=>{
    getLocation();
})

CUSTOM.addEventListener('click',()=>{
    getUser();
})


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert= "Geolocation is not supported by this browser.";
  }
}


async function showPosition(position) {
    const lat =  position.coords.latitude ;
    const long= position.coords.longitude;
    var roundedLat = parseFloat(lat.toFixed(3));
    var roundedLong = parseFloat(long.toFixed(3));
    // console.log(roundedLat,roundedLong)

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${roundedLat}&lon=${roundedLong}&appid=6d23cd3a109931fc7b1d0efb2984ca5e&units=metric`);
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const data1 = await response.json();
        const windSpeeD=`${data1?.wind?.speed} km/h`
         const temperaturE=`${data1?.main?.temp} ℃`;
          let  weatheR=`${data1?.weather['0']?.main} `;
          const Hummid1=`${data1?.main?.humidity} %`;
          const LOC= `${data1?.name}`;
        const Logo=`${data1?.weather['0']?.icon}`;
         

          
          
          toDisplay(LOC,temperaturE,windSpeeD,Hummid1,weatheR,"in",Logo );
    
      } catch (err) {
        console.log(err);
      }
  }


 function getUser() {
    Container.classList.add('active');
    SEarch.classList.add('index');
    Back.classList.add('index');
    Back.classList.remove('Index');
    SEarch.classList.remove('Index');
    Container.style.transition = "ease-in-out 400ms"
    SEarch.style.transition = "ease-in-out 400ms"



  }
  
  
  

async function getCustomWeather( x){

        const API_KEY='6d23cd3a109931fc7b1d0efb2984ca5e';
        const  location=  x;
         

        //  let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)

      
    try {
      let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const data1 = await response.json();
      const windSpeeD=`${data1?.wind?.speed} km/h`
       const temperaturE=`${data1?.main?.temp} ℃`;
        let  weatheR=`${data1?.weather['0']?.main} `;
        const Hummid1=`${data1?.main?.humidity} %`;
        const LOC= `${data1?.name}`;
        const Logo=`${data1?.weather['0']?.icon}`;
        const flag = `${data1?.sys?.country}`;
        toDisplay(LOC,temperaturE,windSpeeD,Hummid1,weatheR,flag.toLowerCase(),Logo);
  
    } catch (err) {
      alert("sorry not found the place");
    }
      

}
