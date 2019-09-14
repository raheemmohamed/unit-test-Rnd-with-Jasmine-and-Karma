export interface Student {
    id: number;
    student_name: string;
    address: string;
    mobile: string;
    email: string;
    courseId: number;
}

export interface Course {
    id: number;
    courseName: string;
    Duration: string;
    Fees: string;
    Modules: number;
}
