import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './student.service';
import { CreateStudentComponent } from './create-student/create-student.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NodeMockDbService } from './node-mock-db.service';
import { EditStudentComponent } from './edit-student/edit-student.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    CreateStudentComponent,
    EditStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // this is reactiveFormModule using for Forms
    // LocalStorageModule.forRoot({
    //   prefix: 'my-app',
    //   storageType: 'localStorage'
    //  })
  ],
  providers: [StudentService, NodeMockDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
