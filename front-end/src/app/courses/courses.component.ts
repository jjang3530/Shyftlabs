import { ApiserviceService } from './../apiservice.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private service:ApiserviceService) { }
  errormsg: any;
  successmsg:any;
  readData: any;
  userForm = new FormGroup({
    'courseName':new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getAllData();
  }

  courseSubmit(){
    if (this.userForm.valid) {
      this.service.createCourseData(this.userForm.value).subscribe((res) =>{
        console.log(res, 'res===');
        this.userForm.reset();
        this.getAllData();
        this.successmsg =res.message;
      }) 
    } else {
      this.errormsg = 'all field is required';
    }
  }

  getAllData(){
    this.service.getAllCoursesData().subscribe((res) => {
      this.readData = res.data;
    })
  }

  msgHandler(){
    this.errormsg ="";
    this.successmsg = "";
  }

}
