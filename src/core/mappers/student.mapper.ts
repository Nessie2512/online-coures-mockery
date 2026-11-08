import {Student as PrismaStudent} from "@prisma/client";
import { Student } from "../entities/student.entity";
import { Address } from "../@seed/address.vo";

export class studentMapper {

   static todomain(student:PrismaStudent): any {

        return {
            id: student.id,
            name: student.Name,
            email: student.email,
            sex: student.sex,
            birthDate: student.birthDate,
            nationality: student.nationality,
            street: student.street,
            city: student.city,
            state: student.state,
        }
    }

   static toPrisma(student: Student): any {
        
        return {
            id: student.id,
            Name: student.getName,
            email: student.getEmail,
            sex: student.getSex,
            birthDate: student.getBirthDate,
            nationality: student.getNationality,
            address: new Address({
                    streetAndNumber: student.getAddress.value.streetAndNumber,
                    neighborhood: student.getAddress.value.neighborhood,
                    municipality: student.getAddress.value.municipality,
                    province: student.getAddress.value.province,
                }),    

        }
    }
}