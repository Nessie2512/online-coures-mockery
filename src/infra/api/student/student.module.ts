import { Module } from '@nestjs/common';
import { AppController } from './student.controller';
import { AppService } from './student.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
