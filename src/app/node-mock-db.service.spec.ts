import { Student } from './interface';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NodeMockDbService } from './node-mock-db.service';
import { of } from 'rxjs';

describe('NodeMockDbService', () => {
  let service: NodeMockDbService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        NodeMockDbService
      ]
    });
    // this controller will handle httpClient Requests
    httpTestController = TestBed.get(HttpTestingController);

    // handle the sameway of inject the actual service
    service =  TestBed.get(NodeMockDbService);
  });

  it('should be created', () => {
    const NodeMcokservice: NodeMockDbService = TestBed.get(NodeMockDbService);
    expect(NodeMcokservice).toBeTruthy();
  });

  it('GET all Student Data getStudentfromMock()', () => {
    service.getStudentfromMock().subscribe();
    const req = httpTestController.expectOne('http://localhost:4200/stdApi/student');
    req.flush( {
      id: 1,
      student_name: 'orange2',
      address: 'wellampitiya',
      mobile: '7896541',
      email: 'orange@gmail.com',
      courseId: 1
      }
    );
  });

  it('GET all data getStudentfromMock()', () => {
    service.getStudentIndividualfromMock(1).subscribe();
    const req = httpTestController.expectOne('http://localhost:4200/stdApi/student/1');
    req.flush( {
      id: 1,
      student_name: 'orange2',
      address: 'wellampitiya',
      mobile: '7896541',
      email: 'orange@gmail.com',
      courseId: 1
      });
     httpTestController.verify();
  });

  it('POST New student method addStudentToMock()', () => {
    const endpointURL = 'http://localhost:4200/stdApi/student';
    const studentPostData = {
      id: 1,
      student_name: 'orange2',
      address: 'wellampitiya',
      mobile: '7896541',
      email: 'orange@gmail.com',
      courseId: 1
    };

    service.addStudentToMock(studentPostData).subscribe();
    const req = httpTestController.expectOne(endpointURL);
    expect(req.request.method).toBe('POST');
    req.flush(studentPostData);
    httpTestController.verify();
  });

  it('should delete the correct data', () => {
    const endpointURL = 'http://localhost:4200/stdApi/student';
    const stdId = 1;

    service.deleteStudent(1).subscribe();
    const req = httpTestController.expectOne(endpointURL + '/' + stdId);
    expect(req.request.method).toBe('DELETE');
    req.flush(3);
    httpTestController.verify();
  });


  it('should put the correct data', () => {
    const endpointURL = 'http://localhost:4200/stdApi/student';
    const stdId = 1;
    const studentUpdatedData = {
      student_name: 'orange2',
      address: 'wellampitiya',
      mobile: '7896541',
      email: 'orange@gmail.com',
      courseId: 1
    };

    service.updateStudent(stdId, studentUpdatedData).subscribe();
    const req = httpTestController.expectOne(endpointURL + '/' + stdId);
    expect(req.request.method).toBe('PUT');
    req.flush(studentUpdatedData);
    httpTestController.verify();
  });


});
