import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { HomeComponent } from './home/home.component';
import { TodayComponent } from './today/today.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { WeatherComponent } from './weather/weather.component';


const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch: 'full' },
  {path : 'weather', component:WeatherComponent},
  {path : 'form', component:FormsComponent},
  {path : 'weatherwidget', component:WeatherWidgetComponent},
  {path : 'home', component:HomeComponent},
  {path : 'today', component:TodayComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [WeatherComponent,FormsComponent,WeatherWidgetComponent,]