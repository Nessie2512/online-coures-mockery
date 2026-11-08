import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../../core/repository/student-repository"
import { PrismaClient } from "@prisma/client";
import { Student } from "../../core/entities/student.entity";

@Injectable()
export class studentPrisma implements StudentRepository {

     constructor(private readonly prisma: PrismaClient) {}

     async save(studentData:Student): Promise<void> {
          const student = 
}