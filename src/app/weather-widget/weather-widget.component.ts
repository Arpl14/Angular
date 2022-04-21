import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  weatherdata : any;
  constructor(private _http:HttpClient) { }

  ngOnInit(): void {
    this.weatherdata={
      isDay :true,
      main :{}
    };
    this.getweatherdata();
    console.log(this.weatherdata);
  }
spinner(){
  console.log('this')
}
  getweatherdata(){
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=13.0827&lon=80.2707&appid=8d924ff26be2dc2a86dc50eaa5c9fd90')
    .then(response=>response.json())
   
    .then(data=>{this.setweatherdata(data);})
   
// let data = JSON.parse('{"coord":{"lon":12,"lat":35},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":287.82,"feels_like":287.3,"temp_min":287.82,"temp_max":287.82,"pressure":1013,"humidity":75,"sea_level":1013,"grnd_level":1013},"visibility":10000,"wind":{"speed":10.17,"deg":85,"gust":12.41},"clouds":{"all":84},"dt":1649038583,"sys":{"country":"IT","sunrise":1649048091,"sunset":1649093691},"timezone":7200,"id":2524459,"name":"Lampedusa","cod":200}')
//   this.setweatherdata(data);
};
// searchWeatherData(cityName:string):Observable<any>{
  // return this._http.get('https://api.openweathermap.org/data/2.5/weather?q=' +cityName+'&appid=8d924ff26be2dc2a86dc50eaa5c9fd90');
// .map(response=> response.json())
// .catch(error =>{
//   console.error
// });
// }



  setweatherdata(data: any){
    this.weatherdata = data;
    let sunsettime = new Date(this.weatherdata.sys.sunset*1000);
    this.weatherdata.sunset_time = sunsettime.toLocaleTimeString();
    let currentdate = new Date();
    this.weatherdata.isDay = (currentdate.getTime()< sunsettime.getTime());
    this.weatherdata.temp_celcius = (this.weatherdata.main.temp - 273.15).toFixed(0);
    this.weatherdata.temp_min = (this.weatherdata.main.temp_min - 273.15).toFixed(0);
    this.weatherdata.temp_max = (this.weatherdata.main.temp_max - 273.15).toFixed(0);
    this.weatherdata.temp_feels_like = (this.weatherdata.main.feels_like - 273.15).toFixed(0);
    

  }
   
 
  
}
