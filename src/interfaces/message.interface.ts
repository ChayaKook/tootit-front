import { UserModel } from "./user.interface";

export interface MessageModel {
    email: string;
    name: string;
    subject: string;
    body: string;
}