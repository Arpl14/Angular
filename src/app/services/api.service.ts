import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postdata(data : any){
    return this.http.post<any>("http://localhost:3000/dataform/", data);

  }
  getdata(){
    return this.http.get<any>("http://localhost:3000/dataform/");
  }

  putdata(data:any,id : number){
    return this.http.put<any>("http://localhost:3000/dataform/" +id , data);

  }

  deletedata(id : number){
    return this.http.delete<any>("http://localhost:3000/dataform/" +id);
  }
}
 