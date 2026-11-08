import { Injectable } from "@nestjs/common";
import { Course } from "../../entities/course.entity";
import { courseRepository } from "../../repository/course-repository";

@Injectable()
export class createCoures {

    constructor(
        private readonly courseRepository: courseRepository,
    ) {}

    async execute(
        courseData: {name: string, description?: string; duration?: number;}): Promise<void> {
         await this.courseRepository.save(courseData);
    }   
}