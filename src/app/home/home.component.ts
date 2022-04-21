import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent  {
  

  images = [

    {title: 'The Himalayas', short: 'The temperature at the himalayan foothills vary from 64 degrees F in the winter to 86 degrees F during summer', src: "https://picsum.photos/id/1036/900/500"},
    {title: 'Sea water', short: 'In 2020, global mean sea level was 91.3 millimeters (3.6 inches) above the 1993 average.we can expect the oceans to rise between 10 and 30 inches (26 to 77 centimeters) by 2100 with temperatures warming 1.5 °C', src: "https://picsum.photos/id/1019/900/500"},

    {title: 'The Yosmite valley', short: 'Yosemite receives 95% of its precipitation between October and May.Most of Yosemite is blanketed in snow from about November through May.', src: "https://picsum.photos/id/1043/900/500"},
    {title: 'The Chelsea Flower Show', short: 'Visitors to next weeks Chelsea Flower show look set to get a soaking because rain, and heavy winds are forecast for the whole of the week.', src: "https://picsum.photos/id/106/900/500"},
  ];
   
  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
    
  }
}