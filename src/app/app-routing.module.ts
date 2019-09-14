import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent
  },
  {
    path: 'list',
    component: StudentListComponent
  },
  {
    path: 'createStudent',
    component: CreateStudentComponent
  },
  {
    path: 'studentView/:stdId/:courseId',
    component: CreateStudentComponent
  },
  {
    path: 'editStudent/:stdid',
    component: EditStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
