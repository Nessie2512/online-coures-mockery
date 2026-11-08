import { Course as prismaCourse } from "@prisma/client";
import { Course } from "../entities/course.entity";


export class courseMapper {

    static toDomain(course: prismaCourse): any {
        return {
            id: course.id,
            name: course.name,
            description: course.description,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
        };
    }
    static toPrisma(course: Course){

        return {
            uuid: course.id,
            name: course.getName,
            description: course.getDescription,
            createdAt: course.createdAt,
            updatedAt: course.editedAt,
        };  
    }
}