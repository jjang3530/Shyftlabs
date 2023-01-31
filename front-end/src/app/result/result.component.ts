import { ApiserviceService } from './../apiservice.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private service:ApiserviceService) { }
  errormsg: any;
  successmsg:any;
  readData: any;
  scoreData = ['A', 'B', 'C', 'D', 'E', 'F'];
  courseData: any;
  studentData: any;
  userForm = new FormGroup({
    'course':new FormControl('', Validators.required),
    'student':new FormControl('', Validators.required),
    'score':new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getAllData();
    
    this.service.getAllCoursesData().subscribe((res) => {
      this.courseData = res.data.map((a:any) => a.courseName);
    });
    
    this.service.getAllStudentData().subscribe((res) => {
      this.studentData = res.data;
    });
  }

  resulSubmit(){
    if (this.userForm.valid) {
      this.service.createResultData(this.userForm.value).subscribe((res) =>{
        this.userForm.reset({
          course: "",
          student: "",
          score: ""
        });
        this.getAllData();
        this.successmsg =res.message;
      }) 
    } else {
      this.errormsg = 'all field is required';
    }
  }

  getAllData(){
    this.service.getAllResultsData().subscribe((res) => {
      console.log(res, "res");
      this.readData = res.data;
    })
  }

  msgHandler(){
    this.errormsg ="";
    this.successmsg = "";
  }

}
