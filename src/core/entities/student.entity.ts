import { person, personProps } from "../@seed/person.entity"

type StudentProps = personProps & {
    studentCode?: string;
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

}