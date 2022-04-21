import { Component, OnInit , AfterViewInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showspinner = false;
  title = 'materialform';
  public weather: any;







  loaddata(){
    this.showspinner = true;
    setTimeout(()=>{
      this,this.showspinner=false
    },2000)
  
  }
  displayedColumns: string[] = ['name', 'email', 'country', 'date', 'gender','phnumber','mobnumber','comments','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private dialog :MatDialog, private api : ApiService){

}

ngOnInit(): void {
  this.getalldata();
}
openDialog() {
  this.dialog.open(DialogComponent, {
  width : '40%'
  }).afterClosed().subscribe(val=>{
    if(val==='save'){
      this.getalldata();
    }
  })
}




getalldata(){
this.api.getdata()
.subscribe({
  next:(res)=>{
    console.log(res);
    this.dataSource= new MatTableDataSource(res)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  },
  error:(err)=>
  {
alert("error")
  }
}
)
}
edititem(row : any) {
  this.dialog.open(DialogComponent,{
  width: '40%',
  data: row
  }).afterClosed().subscribe(val=>{
    if(val==='save'){
      this.getalldata();
    }
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}







}



