import { Module } from '@nestjs/common';
import CompanyModule from "./modules/company/company.module";
import { MongooseModule } from '@nestjs/mongoose';
@Module({

  imports: [
      CompanyModule,
      MongooseModule.forRoot(
          `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds113640.mlab.com:13640/marquee-task`,
          {useNewUrlParser: true, useUnifiedTopology: true }
      )
  ]
})
export class AppModule {}
