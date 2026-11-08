import { person, personProps } from "../@seed/person.entity"
import { InvariantViolationError } from "../errors/domainError";

type StudentProps = personProps & {
    studentCode?: string;
    email: string;
}

export class Student extends person<StudentProps>{

    private constructor(props: StudentProps, id?: string) {
        super(props, id);
    }

    static create(props: StudentProps, id?: string): Student {
        return new Student(props, id);
    }

    addStudentCode(studentCode: string): void {
        this.props.studentCode = studentCode;
    }

    get getStudentCode(): string | undefined {
        return this.props.studentCode;
    }

    get getEmail(): string {
        return this.props.email;
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public changeEmail(newEmail: string): void {
        if (!this.isValidEmail(newEmail)) {
            throw new InvariantViolationError(`Invalid email format: ${newEmail}`);
        }
        this.props.email = newEmail;
    }

}