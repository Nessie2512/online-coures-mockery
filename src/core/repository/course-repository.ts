import { Course } from "../entities/course.entity";


export abstract class courseRepository {
    abstract save(courseData: Course): Promise<void>;
    abstract findById(courseId: string): Promise<any>;
    abstract update(courseId: string, courseData: any): Promise<void>;
    abstract delete(courseId: string): Promise<void>;
    abstract findAll(): Promise<any[]>;
}