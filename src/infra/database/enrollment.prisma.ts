import { PrismaClient } from "@prisma/client";
import { Enrollment } from "../../core/entities/enrollment.entity";
import { enrollmentMapper } from "../../core/mappers/enrollment.mapper";
import { UnprocessableEntityException } from "@nestjs/common";


export class prismaEnrollmentRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async save(enrollmentData: Enrollment): Promise<void> {

       try{ const enrollmentMapped = enrollmentMapper.toPrisma(enrollmentData);
        await this.prisma.enrollment.create({
            data: enrollmentMapped,
        });

        }

        catch (error:any) {
            throw new UnprocessableEntityException(`Failed to save enrollment: ${error.message}`); 
        }
    }


    async findAll(): Promise<any[]> {
        try {
            return await this.prisma.enrollment.findMany();
        } catch (error:any) {
            throw new UnprocessableEntityException(`Failed to retrieve enrollments: ${error.message}`);
        }
    }

    async delete(enrollmentId: string): Promise<any> {
        try {
            return  await this.prisma.enrollment.update({
                where: { uuid: enrollmentId },
                data: { status: "dropped"},  //only because it just for study case
            });
        } catch (error:any) {
            throw new UnprocessableEntityException(`Failed to delete enrollment: ${error.message}`);
        }    
    }

    async findById(enrollmentId: string): Promise<any> {
        try {
            return await this.prisma.enrollment.findUnique({
                where: { uuid: enrollmentId },
            });
        } catch (error:any) {
            throw new UnprocessableEntityException(`Failed to find enrollment by ID: ${error.message}`);
        }
    }

    async update(enrollmentId: string, enrollmentData: any): Promise<void> {
        try {
            await this.prisma.enrollment.update({
                where: { uuid: enrollmentId },
                data: enrollmentData,
            });
        } catch (error:any) {
            throw new UnprocessableEntityException(`Failed to update enrollment: ${error.message}`);
        }
    }
}