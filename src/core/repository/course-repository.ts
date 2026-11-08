

export abstract class courseRepository {
    abstract create(courseData: any): Promise<void>;
    abstract findById(courseId: string): Promise<any>;
    abstract update(courseId: string, courseData: any): Promise<void>;
    abstract delete(courseId: string): Promise<void>;
}