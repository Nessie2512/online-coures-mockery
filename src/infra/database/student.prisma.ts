import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../../core/repository/student-repository"
import { PrismaClient } from "@prisma/client";

@Injectable()
export class studentPrisma implements StudentRepository {

     constructor(private readonly prisma: PrismaClient) {}
}