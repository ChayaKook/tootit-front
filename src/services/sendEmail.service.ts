import { MessageModel } from "../interfaces/message.interface";

// const API = process.env.API;
const API = "http://localhost:8080"

const SendEmailService = {

    sendEmail: async (message:MessageModel): Promise<any> => {
        try {
            const response = await fetch(`${API}/sendEmail/sendToBusiness`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(message)
            }

            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }

    },
  
}

export default SendEmailService;
