import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather';
  url1= 'https://api.openweathermap.org/data/2.5/forecast'
  apikey = '8d924ff26be2dc2a86dc50eaa5c9fd90';


  constructor(private http: HttpClient) { }
  getWeatherData(lat:any, lon:any){
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('units', 'imperial')
    .set('appid', this.apikey)
  
    return this.http.get(this.url,{params});
  }
  
  getWeatherDataCity(city:string){
    let params = new HttpParams( )
    .set('q', city)
    .set('units', 'imperial')
    .set('appid', this.apikey)
  
    return this.http.get(this.url, {params});
  
  }

  getchartcity(city:string){
    let params = new HttpParams( )
    .set('q', city)
    .set('units', 'imperial')
    .set('appid', this.apikey)
  
  
    return this.http.get(this.url1, {params});
  }
  
  }   
