import { Entity } from "../@seed/Entity";

type EnrollmentStatus = 'active' | 'completed' | 'dropped';

type EnrollmentProps = {
  studentId: string;
  courseId: string;
  enrollmentDate: Date;
};

export class Enrollment extends Entity<EnrollmentProps> {
  private _status: EnrollmentStatus;
  private constructor(props: EnrollmentProps, id?: string) {
    super(props, id);
    this._status = 'active'; // Default status when an enrollment is created
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

  get getStatus(): EnrollmentStatus {
    return this._status;
  }

  updateStatus(newStatus: EnrollmentStatus): void {
    this._status = newStatus;
  } 

  completeEnrollment(): void {
    this.updateStatus('completed');
  }

  dropEnrollment(): void {
    this.updateStatus('dropped');
  }
}