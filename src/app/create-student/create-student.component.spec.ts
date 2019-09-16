import { NodeMockDbService } from './../node-mock-db.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CreateStudentComponent } from './create-student.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';

class MockActivatedRoute {
  // public firstChild = {params: of({id: '1'})};
}

describe('CreateStudentComponent', () => {
  let component: CreateStudentComponent;
  let fixture: ComponentFixture<CreateStudentComponent>;
  let router: Router;
  let mockStudentData;
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  let STUDENTS;

  const mockActiveRoute = {
    params: of({ stdId: 1 }),
    snapshot: {
      parent: {
        params: {
          stdId: 1
        }
      },
      paramMap: {
        get(stdId: string): string {
          return stdId;
        }
      }
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStudentComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule
      ],
      providers: [
        NodeMockDbService,
        { provide: FormBuilder, useValue: formBuilder },
        { provide: ActivatedRoute, useValue: mockActiveRoute}
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

    mockStudentData = jasmine.createSpyObj(['getStudentIndividualfromMock', 'addStudentToMock']);

    fixture = TestBed.createComponent(CreateStudentComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);

    fixture.detectChanges();
    component = new CreateStudentComponent(router, new ActivatedRoute() , formBuilder, mockStudentData);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should retrived student by id', () => {
  //   mockStudentData.getStudentIndividualfromMock.and.returnValue(of(true));
  //   component.getStdData();
  //   expect(mockStudentData.getStudentIndividualfromMock).toHaveBeenCalled();
  // });
});
