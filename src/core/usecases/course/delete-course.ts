import { courseRepository } from "../../repository/course-repository";


export class deleteCourse {

    constructor(
        private readonly courseRepository: courseRepository,
    ) {}

    async execute(courseId: string): Promise<void> {
         await this.courseRepository.delete(courseId);
    }
}