import { Module } from '@nestjs/common';
import { AppController } from './enrollment.controller';
import { AppService } from './enrollment.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
