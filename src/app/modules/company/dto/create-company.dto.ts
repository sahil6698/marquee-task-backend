import {IsString} from "class-validator";

class createCompanyDto {
    @IsString()
    public companyName: string;

    @IsString()
    public companyId: string
}
export default createCompanyDto;
