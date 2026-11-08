import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { StudentRepository } from "../../core/repository/student-repository"
import { PrismaClient } from "@prisma/client";
import { Student } from "../../core/entities/student.entity";
import { studentMapper } from "../../core/mappers/student.mapper";

@Injectable()
export class studentPrisma implements StudentRepository {

     constructor(private readonly prisma: PrismaClient) {}

     async save(studentData:Student): Promise<void> {
          
          try {
               const studentMapped = studentMapper.toPrisma(studentData);
               await this.prisma.student.create({
                    data: studentMapped,
               });
          } catch (error:any) {
               throw new UnprocessableEntityException(`Failed to save student: ${error.message}`);
          }
     }

     async findAll(): Promise<any[]> {
          
          try {
               return await this.prisma.student.findMany();
          } catch (error:any) {
               throw new UnprocessableEntityException(`Failed to retrieve students: ${error.message}`);
          }
     }


     async delete(studentId: string): Promise<any> {
          try {
               return  await this.prisma.student.update({
                    where: { uuid: studentId },
                    data: { isActive: false},
               });
          } catch (error:any) {
               throw new UnprocessableEntityException(`Failed to delete student: ${error.message}`);
          }    
     }

     async findById(studentId: string): Promise<any> {
          try {
               return await this.prisma.student.findUnique({
                    where: { uuid: studentId },
               });
          } catch (error:any) {
               throw new UnprocessableEntityException(`Failed to find student by ID: ${error.message}`);
          }
     }

     async update(studentId: string, studentData: any): Promise<void> {
          try {
               await this.prisma.student.update({
                    where: { uuid: studentId },
                    data: studentData,
               });
          } catch (error:any) {
               throw new UnprocessableEntityException(`Failed to update student: ${error.message}`);
          }
     }
}