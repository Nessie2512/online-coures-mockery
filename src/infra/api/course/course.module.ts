import { Module } from '@nestjs/common';
import { AppController } from './course.controller';
import { AppService } from './course.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
