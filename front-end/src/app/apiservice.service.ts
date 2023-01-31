import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  //connect frontend to backend
  studentUrl = 'http://localhost:3000/students';
  courseUrl = 'http://localhost:3000/courses';
  resultUrl = 'http://localhost:3000/results';


  //get All Student data
  getAllStudentData():Observable<any>{
    return this._http.get(`${this.studentUrl}`);
  }

  //create a student data
  createStudentData(data:any):Observable<any>{
    return this._http.post(`${this.studentUrl}`, data);
  }

  //get All courses data
  getAllCoursesData():Observable<any>{
    return this._http.get(`${this.courseUrl}`);
  }

  //create a course data
  createCourseData(data:any):Observable<any>{
    return this._http.post(`${this.courseUrl}`, data);
  }

    //get All results data
    getAllResultsData():Observable<any>{
      return this._http.get(`${this.resultUrl}`);
    }
  
    //create a result data
    createResultData(data:any):Observable<any>{
      return this._http.post(`${this.resultUrl}`, data);
    }
}
