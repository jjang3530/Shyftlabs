import { ApiserviceService } from './../apiservice.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  errormsg: any;
  successmsg:any;
  readData: any;
  userForm = new FormGroup({
    'firstName':new FormControl('', Validators.required),
    'familyName':new FormControl('', Validators.required),
    'dateOfBirth':new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getAllData();
  }

  studentSubmit(){
    if (this.userForm.valid) {
      const age = Math.floor((Date.now() - new Date(this.userForm.get('dateOfBirth')?.value).getTime()) / 3.15576e+10)
      if (age >= 10) {
        this.service.createStudentData(this.userForm.value).subscribe((res) =>{
          this.userForm.reset();
          this.getAllData();
          this.successmsg =res.message;
        })        
      } else {
        this.errormsg = 'Student must be at least 10 years old';
      }
    } else {
      this.errormsg = 'all field is required';
    }
  }

  getAllData(){
    this.service.getAllStudentData().subscribe((res) => {
      this.readData = res.data;
    })
  }

  msgHandler(){
    this.errormsg ="";
    this.successmsg = "";
  }
}
