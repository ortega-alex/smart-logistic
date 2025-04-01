import { Customer } from '../customer/entity/Customer';
import { enviroment } from '../utils';
import { CustomerFile } from './entity/CustomerFile';

export const getById = async (id: number) => await CustomerFile.findOneBy({ id });

export const save = async (customer: Customer, files: Express.Multer.File[]) => {
    files.forEach(item => {
        const customerFile = new CustomerFile();
        customerFile.customer = customer;
        customerFile.name = item.originalname;
        customerFile.path = `${enviroment.URI_FILE}/${item.filename}`;
        customerFile.save();
    });
};

export const deleteById = async (id: number) => CustomerFile.delete(id);
