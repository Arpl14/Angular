import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  lat: any;
  lon: any;
  weather: any;
  weatherchart : any;
  chart : any = [];


  constructor(private weatherService: WeatherService) { }

  
  getLocation(){
    if("geolocation" in navigator){
      navigator.geolocation.watchPosition((success)=>{
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        // this.getchartdata(this.lat,this.lon);
        // this.ngOnInit(this.lat,this.lon)
        this.weatherService.getWeatherData(this.lat, this.lon).subscribe(data=>{
          this.weather = data;
        });
      })
    } 
  }
    getCity(city: string){

      this.weatherService.getWeatherDataCity(city).subscribe(data=>{
        this.weather = data;
        console.log(data)
      });
      this.weatherService.getchartcity(city).subscribe(data=>{
        this.weatherchart = data;
        console.log(this.weatherchart)
        var dtarr=[];
        var visarr=[];
        var higharr=[]; 
        
        for(var i=0; i<this.weatherchart.list.length; i++) {
          dtarr.push(this.weatherchart.list[i].dt);
          visarr.push(this.weatherchart.list[i].main.humidity);
          higharr.push(this.weatherchart.list[i].main.temp);
        }     
        
console.log(dtarr);
console.log(visarr);
console.log(higharr);



const myChart = new Chart("myChart", {
  type: 'line',
  data: {
      labels:dtarr,
      datasets: [{
          label: 'Temperature over past month',
          data: higharr,
          backgroundColor: 'transparent',
          borderColor: 'red',
          borderWidth: 1
      },
      {
        label: 'visibility value over past month',
        data: visarr,
        backgroundColor: 'transparent',
        borderColor: 'yellow',
        borderWidth: 1
    }]
  },
  
  options: {
    elements:{
      line:{
        tension:0
      }
    },
      scales: {
        
          y: {
              beginAtZero: true
          }
      }
  }
});


   const mybarChart = new Chart("mybarChart", {
        type: 'bar',
        data: {
            labels:dtarr,
            datasets: [{
                label: 'Humidity values over past month',
                data: visarr,
                backgroundColor: 'fill',
                borderColor: 'green',
                borderWidth: 1
            },
        ]
        },
        
        options: {
          elements:{
            line:{
              tension:0
            }
          },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
      })
  
    }
  ngOnInit(): void {          
    this.getLocation();
  }
  refresh(){
    window.location.reload();
    
  }
}
