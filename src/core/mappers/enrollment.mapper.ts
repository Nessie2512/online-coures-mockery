import { Enrollment as prismaEnrollment } from "@prisma/client";
import { Enrollment } from "../entities/enrollment.entity";

export class enrollmentMapper {

    static toDomain(enrollment: prismaEnrollment): any {

        return {
            id: enrollment.id,
            studentId: enrollment.studentId,
            courseId: enrollment.courseId,
            createdAt: enrollment.createdAt,
            updatedAt: enrollment.updatedAt,
        };  
    }


   static toPrisma(enrollment: Enrollment): any {

        return {
            id: enrollment.id,
            studentId: enrollment.getStudentId,
            courseId: enrollment.getCourseId,
            createdAt: enrollment.createdAt,
            updatedAt: enrollment.editedAt,
        };  
    }
}