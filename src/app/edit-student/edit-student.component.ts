import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NodeMockDbService } from '../node-mock-db.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit, OnDestroy {
  // subcription
  subcription = [];
  // formGroup
  editStudentForm: FormGroup;

  studentId; courseId;

  upcommindStdindividualData;

  constructor(
    private nodemockBackend: NodeMockDbService,
    private formbuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.studentId = +this.activeRoute.snapshot.paramMap.get('stdid');

    this.studentIndGet(this.studentId);
    this.initializeForm();

  }

  initializeForm() {
    this.editStudentForm = this.formbuilder.group({
      id: ['', Validators.required],
      studentName: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      courseId: ['', Validators.required],
    });

  }

  studentIndGet(stdId) {
    this.subcription[ this.subcription.length] = this.nodemockBackend.getStudentIndividualfromMock(stdId)
    .subscribe(datas => {
     // console.log(datas);
      this.upcommindStdindividualData = datas;
      this.upcommindStdindividualData.forEach(element => {
        this.editStudentForm.patchValue({
          id: element.id,
          studentName: element.student_name,
          address: element.address,
          mobile: element.mobile,
          email: element.email,
          courseId: element.courseId,
        });
      });

      },
      error => {
        console.log(error.erroMessge);
      }
    );
  }

  UpdateStudent() {

    const updateStdId = +this.editStudentForm.get('id').value;

    const studentUpdataObj = {
      // id: +this.editStudentForm.get('id').value,
      student_name: this.editStudentForm.get('studentName').value,
      address: this.editStudentForm.get('address').value ,
      mobile: this.editStudentForm.get('mobile').value,
      email: this.editStudentForm.get('email').value,
      courseId: this.editStudentForm.get('courseId').value,
    };

    const updatedTriggerd = this.nodemockBackend
    .updateStudent(updateStdId, studentUpdataObj).subscribe(data => {
      console.log(data);
    },
    error => {
      console.log(error.erroMessge);
    });

    if (updatedTriggerd) {
      this.ngOnInit();
    }
  }

   // once click back button in the relavant age then trigger this event
   goMain() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.subcription.forEach(
      subcribesData => subcribesData.unsubscribe()
    );
  }

}
