import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Student } from './interface';

// http headers require for POST otherwise return 400 or 500 error
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class NodeMockDbService {

  // node js endpoint
  ApienpointUrl = 'http://localhost:4200/stdApi/student';


  studentsBehaveSub$: BehaviorSubject<any> = new BehaviorSubject(null);

  // import HttpClient for handle request
  constructor(private http: HttpClient) {
    this.getStudentfromMock();
  }
  // getting data from endpoint
  getStudentfromMock() {
    return this.http.get(this.ApienpointUrl).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    );
  }

   // get data using student id
  getStudentIndividualfromMock(id) {
    return this.http.get(this.ApienpointUrl + '/' + id).pipe(
      map((res: any) => res,
      catchError(this.handleError)
    ));
  }

  // add data to node mock db
  addStudentToMock (studentData: Student) {
    return this.http.post<Student>(this.ApienpointUrl, studentData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // delete student Records
  deleteStudent(id) {
    const url = `${this.ApienpointUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Using PUT to update student Records
  updateStudent (id, StudentUpdateData) {
    const url = `${this.ApienpointUrl}/${id}`;
    return this.http.put<Student>(url, StudentUpdateData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // error Handle
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

}
