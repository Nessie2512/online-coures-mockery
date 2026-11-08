import { courseRepository } from "../../repository/course-repository";

export class findAllCourses {
    constructor(
        private readonly courseRepository: courseRepository,
    ) {}

    async execute(): Promise<any> {
        return await this.courseRepository.findAll();
    }
}