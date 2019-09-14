import { Component, OnInit, Input , OnDestroy} from '@angular/core';
import {StudentService} from '../student.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// maintain local storage to keep all the creating POST request
import { NodeMockDbService } from '../node-mock-db.service';
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit, OnDestroy {
  // declared variable type Any
  IndividualStdData;
  // declared variable type is Rxjs Subcription
  individualSubcription: Subscription;
  // declated any type variable
  AllCourseData;
  IndividualCourseData;
 // declared variable type is Rxjs Subcription
  individualCourseSubcription: Subscription;
  /*
   declated array for define each and every subcription type to new
   variable and finally define and unsubcribe
  */
  arraySubscription = [];
  indiStudentDetails;
  // param ids type is equal to number
  ids: number;

  addStudentFormBuild: FormGroup;

  constructor(
    // router instance injected
    public router: Router,
    // ActiveRoute instance injected
    private routeActive: ActivatedRoute,
    // formBuilder
    private fb: FormBuilder,
    // inject localstorage angular
    // node mock database server
    private nodeMockService: NodeMockDbService
  ) { }

  ngOnInit() {
    // FormControls group
    this.addStudentFormBuild = this.fb.group({
      studentName: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      courseId: ['', Validators.required],
    });

    this.getStdData();
  }
  // declare function for getting each individual student and course data of relavant studnet
  getStdData() {
    // getting student id from URI segment
    this.ids = +this.routeActive.snapshot.paramMap.get('stdId');
    // getting course_id from URI sement
    const courseId = +this.routeActive.snapshot.paramMap.get('courseId');
    /*
      define variable with rxjs subcription type and get student from service which is
      which is subscribe and find method to check if equal with URI segment param id
    */
    this.arraySubscription[this.arraySubscription.length] = this.nodeMockService.getStudentIndividualfromMock(this.ids)
      .subscribe(indiviusalStudentData => {
            this.indiStudentDetails = indiviusalStudentData || [];
      },
      error => {
        console.log(error.errorMessege);
      }
    );
  }

  // once click back button in the relavant age then trigger this event
  goMain() {
    this.router.navigate(['']);
  }
  // on submit
  onSubmit() {
    const  studentObject = {
      id: Math.floor((Math.random() * 100) + 1),
      student_name:  this.addStudentFormBuild.get('studentName').value,
      address: this.addStudentFormBuild.get('address').value ,
      mobile: this.addStudentFormBuild.get('mobile').value,
      email: this.addStudentFormBuild.get('email').value,
      courseId: this.addStudentFormBuild.get('courseId').value,
    };

    this.nodeMockService.addStudentToMock(studentObject).subscribe(data => {
      console.log(data);
    },
    error => {
      console.log(error.errorMessege);
    });

    this.clearForm();
  }
  // once submit form clear every field value and make empty
  clearForm() {
    this.addStudentFormBuild.reset({
      studentName: '',
      address: '',
      mobile: '',
      email: '',
      courseId: '',
    });
  }

  // when user navigate to another layout then unsubcribe all the subscribe variable
  ngOnDestroy() {
    // loop through get every defined subcribes variable and unsubcribe all
    this.arraySubscription.forEach(subcribeDat => subcribeDat.unsubscribe());
  }

}
