import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Student } from './interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // url = 'assets/backendAPI/stdDataAPI.json';

  url = 'http://localhost:4200/stdApi/student';

  globalStudenData;

  mockStudentData;
  constructor(
    private http: HttpClient,
  ) {
    // this.getStudent();
  }

  // Add New Subject from RXJS and It will help you to asyn the changes automatically
  studenChangesSubject = new Subject();

  students$: BehaviorSubject<any> = new BehaviorSubject(null);

  // getStudent() {
  //   this.globalStudenData = this.http.get(this.url).subscribe((res: any) => {
  //     const t = localStorage.getItem('createdStudent');
  //     let tmp = [];
  //     if (t) {
  //       tmp = JSON.parse(t);
  //     }
  //     this.students$.next([...res.student, ...tmp]);
  //   });
  // }

  // getStudent() {
  //    this.globalStudenData = this.http.get(this.url).subscribe((res: any) => {
  //       this.studenChangesSubject.next(res.student);
  //    });
  // }


    getStudentfromMock() {
     return this.http.get(this.url).pipe(
       map((res: any) => res),
       catchError(this.handleError)
     );
    }


  getCourse() {
    return this.http.get(this.url).pipe(
      map((res: any) => res.course),
      catchError(this.handleError)
    );
  }

  // addStudent(stdData): Observable<any> {
  //   return this.http.post(this.url, stdData, httpOptions).pipe(
  //     map((result: any) => console.log(result)),
  //     catchError(this.handleError)
  //   );
  // }

  addStudentandgetSubject() {
    // const stdNewData = this.agnualrlocalstorage.get('createdStudent');
   // this.globalStudenData.push(stdNewData);
    // this.studenChangesSubject.next(null);
  }

  addStudent(std) {
    const t = localStorage.getItem('createdStudent');
    let tmp;
    if (t) {
      tmp = JSON.parse(t);
      (tmp as Array<any>).push(std);
    } else {
      tmp = [std];
    }

    localStorage.setItem('createdStudent', JSON.stringify(tmp));
  }

  getUpdateData() {
    return { ...this.globalStudenData };
  }
  // update a existing records
  updateStudent (std) {
    return this.http.put(this.url, std, httpOptions)
      .pipe(
        catchError(this.handleError),
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
