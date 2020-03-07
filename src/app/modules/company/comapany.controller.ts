import CompanyService from "./company.service";
import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import ValidationPipe from "../../pipes/validation.pipes";
import createCompanyDto from "./dto/create-company.dto";

@Controller('company')
export default class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
    ) {}

    @Get('')
    public async getCompanyListFromZauba(@Query('search') search: string):
        Promise<{
            companyName: string,
            companyId: string
        }[]> {
        return this.companyService.getCompanyListFromZaubaCorp(search);
    }

    @Get('registered')
    public async getCompanyList(
        @Query('sortWith') sortWith = 'companyName',
        @Query('sortBy') sortBy = 'ASC'
    ) {
        return this.companyService.getCompanyList(sortBy, sortWith);
    }

    @Post('')
    public async registerCompany(@Body(new ValidationPipe()) input: createCompanyDto ) {
        return this.companyService.registerCompany(input)
    }
}
