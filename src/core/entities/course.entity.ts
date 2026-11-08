import { Entity } from "../@seed/Entity";


type CourseProps = {
    name: string;
    description?: string;
    duration?: number;
}

export class Course extends Entity<CourseProps>{

   private constructor(props: CourseProps, id?: string) {
        super(props, id);
    }

    static create(props: CourseProps, id?: string): Course {
        return new Course(props, id);
    }

    get getName(): string {
        return this.props.name;
    }

    get getDescription(): string | undefined {
        return this.props.description;
    }

    get getDuration(): number | undefined {
        return this.props.duration;
    }
}