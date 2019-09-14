import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentListComponent } from './student-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;
  let router: Router;
  let STUDENTS;
  let COURSES;
  let mockStudentData;
  let mockCourseData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentListComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

        STUDENTS = [
          {
            id: 1,
            student_name: 'orange2',
            address: 'wellampitiya',
            mobile: '7896541',
            email: 'orange@gmail.com',
            courseId: 1
        },
        {
            id: 27,
            student_name: 'Sumudu jayasinga',
            address: 'nugegoda',
            mobile: '7896541',
            email: 'sumudu@gmail.com',
            courseId: '2'
        },
        {
            id: 88,
            student_nam: 'JohnPapa',
            address: 'kandy',
            mobile: '78965412',
            email: 'johnpapa@gmail.com',
            courseId: '2'
        }
    ];

    COURSES = [
      {
          id: 1,
          courseName: 'Diploma in computing',
          Duration: '6 Month',
          Fees: '52000',
          Modules: 10
      },
      {
          id: 2,
          courseName: 'Diploma in Marketing',
          Duration: '6 Month',
          Fees: '25000',
          Modules: 12
      },
      {
          id: 3,
          courseName: 'Diploma in development',
          Duration: '4 Month',
          Fees: '8000',
          Modules: 4
      }
  ];

    mockStudentData = jasmine.createSpyObj(['getStudentfromMock', 'deleteStudent']);
    mockCourseData = jasmine.createSpyObj(['getCourse']);

    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();

    component = new StudentListComponent(mockCourseData, router, mockStudentData);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrive all student list data', () => {
    mockStudentData.getStudentfromMock.and.returnValue(of(true));
    component.stdServiceData = STUDENTS;
    expect(component.stdServiceData.length).toBe(3);
  });

  it('check if getStudentFromMock observable is called', () => {
    mockStudentData.getStudentfromMock.and.returnValue(of(true));
    component.getStudentData();
    expect(mockStudentData.getStudentfromMock).toHaveBeenCalled();
  });

  it('throw the error student list not retrive', () => {
    mockStudentData.getStudentfromMock.and.returnValue(throwError('Error'));
    component.getStudentData();
    expect(mockStudentData.getStudentfromMock).toHaveBeenCalled();
  });

  it('should navigate to create student', () => {
      const navigateSpy = spyOn(router, 'navigate');
      component.createNewStudent();
      expect(navigateSpy).toHaveBeenCalledWith(['/createStudent']);
  });

  it('should navigate to view the student list', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const id = 1;
    const courseId = 1 ;
    component.viewEachStudentData(id, courseId);
    expect(navigateSpy).toHaveBeenCalledWith(['/studentView/', id, courseId]);
  });

  it('Should pass id to edit a students', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const stdId = 1;
    component.editStudents(stdId);
    expect(navigateSpy).toHaveBeenCalledWith(['/editStudent/', stdId]);

  });

  it('should retrive data to varible', () => {
    component.stdServiceData = STUDENTS;
    expect( component.stdServiceData.length).toBe(3);
  });

  it('should retrive course data', () => {
    mockCourseData.getCourse.and.returnValue(of(true));
    component.courseData = COURSES;
    expect(component.courseData.length).toBe(3);
  });

  it('retrive All course informations', () => {
    mockCourseData.getCourse.and.returnValue(of(true));
    component.getCourseData();
    expect(mockCourseData.getCourse).toHaveBeenCalled();
  });

  it('should throw the error if course data is not found', () => {
    mockCourseData.getCourse.and.returnValue(throwError('Error'));
    component.getCourseData();
    expect(mockCourseData.getCourse).toHaveBeenCalled();
  });

  it('should delete student data using std Id', () => {
    mockStudentData.deleteStudent.and.returnValue(of(true));
    mockStudentData.getStudentfromMock.and.returnValue(of(true));

    component.stdServiceData = STUDENTS;
    component.deleteStudent(1);
    expect(mockStudentData.deleteStudent).toHaveBeenCalled();
    expect(mockStudentData.getStudentfromMock).toHaveBeenCalled();
  });

  it('should throw the error', () => {
    mockStudentData.getStudentfromMock.and.returnValue(of(true));
    mockStudentData.deleteStudent.and.returnValue(throwError('Error'));
    component.deleteStudent(1);
    expect(mockStudentData.deleteStudent).toHaveBeenCalled();
    expect(mockStudentData.getStudentfromMock).toHaveBeenCalled();

  });

});
