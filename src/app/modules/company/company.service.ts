import {HttpException, Injectable} from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import fetch from 'node-fetch';
import createCompanyDto from "./dto/create-company.dto";
@Injectable()
export default class CompanyService {
    constructor(@InjectModel('Company') private readonly companyModel) {
    }
    public async getCompanyListFromZaubaCorp(search: string): Promise<{
         companyName: string,
         companyId: string
    }[]> {

        const requestJSON = {
            search, filter: 'company'
        };
        const response = await fetch('https://www.zaubacorp.com/custom-search',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestJSON)
            });
        const jsonRes = await response.text();
        return this.getCompanyNamesWithId(jsonRes);
    }
    private getCompanyNamesWithId(zaubaCorpRes: string):{
        companyName: string,
        companyId: string
    }[] {
        let flag = true;
        const response: Array<{
            companyName: string,
            companyId: string
        }> = [];
        while (flag) {
            const index = zaubaCorpRes.indexOf('id="company/');
            if (index === -1) {
                break;
            }
            const subString = zaubaCorpRes.slice(index + 12)
            const companyNameEndingIndex = subString.indexOf('/');
            const companyName = subString.slice(0 ,companyNameEndingIndex);
            const subStringForId = subString.slice(companyNameEndingIndex + 1);
            const companyIdEndingIndex = subStringForId.indexOf('"');
            const companyId = subStringForId.slice(0, companyIdEndingIndex);
            response.push({
                companyName,
                companyId
            });
            zaubaCorpRes = subStringForId;
        }
        return response;
    }

    public async getCompanyList(sortBy: string, sortWith: string) {
        if(sortWith === 'companyName') {
            if (sortBy === 'DESC') {
                return this.companyModel.find().sort([['companyName', -1]]).exec()
            } else {
                return this.companyModel.find().sort('companyName').exec()
            }
        } else {
            if (sortBy === 'DESC') {
                return this.companyModel.find().sort([['companyId', -1]]).exec()
            } else {
                return this.companyModel.find().sort('companyId').exec()
            }
        }
    }

    public async registerCompany(input: createCompanyDto) {

        // check if company with same company id already exists
        console.log(input)
        const company = new this.companyModel({
            companyId: input.companyId,
            companyName: input.companyName
        });
        try {
            const res = await company.save();
            return res;
        } catch (e) {
            if (e.code === 11000) {
                throw new HttpException('Company with the same id is already registered', 400)
            } else {
                throw new HttpException(`Error occurred while registering the company: ${e.message}`, 400)
            }
        }
    }
}
