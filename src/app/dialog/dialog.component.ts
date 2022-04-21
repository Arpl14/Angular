import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  gender: string | undefined;
  genderlist: string[] = ["male", "female", "other"];
  dataform!: FormGroup;
  private static seperator = /\s+/gmu;
  constructor(private formBuilder: FormBuilder,
     private api: ApiService, 
     @Inject(MAT_DIALOG_DATA) public editdata: any,
     private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.dataform = this.formBuilder.group({
      name: ['',[Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*')]],
      email: ['',[Validators.required,
        Validators.maxLength(250),
         Validators.minLength(5),
         Validators.pattern(/.+@.+\..+/)
         ]],
      country: ['',Validators.required],
      date: ['',Validators.required],
      gender: ['',Validators.required],
      phnumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
 
      mobnumber: ['',  [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")]],
      comments: ['', WordCountValidators.min(10)],
    })
    console.log(this.editdata)
    if(this.editdata){
      this.dataform.controls['name'].setValue(this.editdata.name);
      this.dataform.controls['email'].setValue(this.editdata.email);
      this.dataform.controls['country'].setValue(this.editdata.country);
      this.dataform.controls['date'].setValue(this.editdata.date);
      this.dataform.controls['gender'].setValue(this.editdata.gender);
      this.dataform.controls['phnumber'].setValue(this.editdata.phnumber);
      this.dataform.controls['mobnumber'].setValue(this.editdata.mobnumber);
      this.dataform.controls['comments'].setValue(this.editdata.comments);

    }
  }

 
  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }
  additem(){
   if(!this.editdata){
    console.log(this.dataform.valid)
    if(true){
      this.api.postdata(this.dataform.value)
      .subscribe({
        next:(res)=>{
         
          this.dataform.reset();
          this.dialogRef.close('save');

        },
        error:()=>{
          alert("error")
        }
      })
    }
    console.log(this.dataform.value);
   }else{
     this.updatelist()

     
   }
  }

  updatelist(){
    this.api.putdata(this.dataform.value , this.editdata.id)
    .subscribe({
      next:(res)=>{
       
        this.dataform.reset();
        this.dialogRef.close('update')
      },
      error:()=>{
        alert("error")
      }
    })

  }
}

export class WordCountValidators {
  private static seperator = /\s+/gmu;

  static min(min: number, seperator: string | RegExp = WordCountValidators.seperator): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Check that the control has a value and if that value is a string.
      if (control.value && typeof control.value === 'string') {
        // Remove any leading and trailing whitespace
        const value = control.value.trim();
        const words = value.split(seperator);
        const actual = words.length;
        if (actual < min) {
          return { minword: { min, actual } };
        }
      }
      return null;
    };
  }
}  
