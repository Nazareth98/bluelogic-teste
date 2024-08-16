import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsMopdule } from './items/items.module';

@Module({
  imports: [ItemsMopdule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
