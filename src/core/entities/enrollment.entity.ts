import { Entity } from "../@seed/Entity";


type EnrollmentProps = {
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
  status: 'active' | 'completed' | 'dropped';
};

export class Enrollment extends Entity<EnrollmentProps> {
  private constructor(props: EnrollmentProps, id?: string) {
    super(props, id);
  }

  static create(props: EnrollmentProps, id?: string): Enrollment {
    return new Enrollment(props, id);
  }

  get getStudentId(): string {
    return this.props.studentId;
  }

  get getCourseId(): string {
    return this.props.courseId;
  }

  get getEnrollmentDate(): Date {
    return this.props.enrollmentDate;
  }

  get getStatus(): 'active' | 'completed' | 'dropped' {
    return this.props.status;
  }

  updateStatus(newStatus: 'active' | 'completed' | 'dropped'): void {
    this.props.status = newStatus;
  } 
}