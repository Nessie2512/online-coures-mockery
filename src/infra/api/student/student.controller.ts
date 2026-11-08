import { Controller, Get } from '@nestjs/common';
import { studentService } from './student.service';

@Controller()
export class studentController {
  constructor(private readonly appService: studentService) {}

}
