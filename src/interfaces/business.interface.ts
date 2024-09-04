import { UserModel } from "./user.interface";

export interface BusinessModel {
    _id?: string;
    name: string;
    phone: string;
    address: string;
    admin: {
        name: string,
        email: string,
        password: string
    }
}