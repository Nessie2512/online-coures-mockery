import { Injectable } from "@nestjs/common";
import { courseRepository } from "../../repository/course-repository";


@Injectable()
export class updateCourses {

    constructor(
        private readonly courseRepository: courseRepository,
    ) {}

    async execute(courseData: any, courseId: string): Promise<void> {
         await this.courseRepository.update(courseData, courseId);
    }
}