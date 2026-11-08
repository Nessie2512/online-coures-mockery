import { PrismaClient } from "@prisma/client";
import { Course } from "../../core/entities/course.entity";
import { courseMapper } from "../../core/mappers/course.mapper";
import { UnprocessableEntityException } from "@nestjs/common";


export class prismaCourseRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async save(courseData: Course): Promise<void> {

       try{
        const courseMapped = courseMapper.toPrisma(courseData);
        await this.prisma.course.create({
            data: courseMapped,
        });
       }
       catch(error:any){
         throw new UnprocessableEntityException(`Failed to save course: ${error.message}`);
       }
    }

    async findAll(): Promise<any[]> {
        try{
            return await this.prisma.course.findMany();
        }
        catch(error:any){
            throw new UnprocessableEntityException(`Failed to retrieve courses: ${error.message}`);
        }
    }

    async delete(courseId: string): Promise<any> {
        try{
            return  await this.prisma.course.update({
                where: { uuid: courseId },
                data: { isActive: false},
            });
        }
        catch(error:any){
            throw new UnprocessableEntityException(`Failed to delete course: ${error.message}`);
        }    
    }

    async findById(courseId: string): Promise<any> {
        try{
            return await this.prisma.course.findUnique({
                where: { uuid: courseId },
            });
        }
        catch(error:any){
            throw new UnprocessableEntityException(`Failed to find course by ID: ${error.message}`);
        }
    }

    async update(courseId: string, courseData: any): Promise<void> {
        try{
            await this.prisma.course.update({
                where: { uuid: courseId },
                data: courseData,
            });
        }
        catch(error:any){
            throw new UnprocessableEntityException(`Failed to update course: ${error.message}`);
        }
    }
}