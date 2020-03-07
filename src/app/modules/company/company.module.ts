import { Module } from '@nestjs/common';
import CompanyController from "./comapany.controller";
import CompanyService from "./company.service";
import {MongooseModule} from '@nestjs/mongoose';
import CompanySchema from "../../../db/schema/comapny.schema";
@Module({
    imports: [MongooseModule.forFeature
                (
                [
                            { name: 'Company', schema: CompanySchema}
                       ]
                )
            ],
    controllers: [CompanyController],
    providers: [CompanyService],
})

class CompanyModule {
}

export default CompanyModule;
