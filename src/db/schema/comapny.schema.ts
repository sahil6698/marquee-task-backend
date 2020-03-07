import * as mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        unique: true,
        required: true
    },
});

export default CompanySchema;
