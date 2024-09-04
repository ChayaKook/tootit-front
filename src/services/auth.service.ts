// const API = process.env.API;
const API = "http://localhost:8080"


const AuthService = {
    login: async ({ email, password }: { email: string; password: string }): Promise<boolean> => {
        try {
            const response = await fetch(`${API}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            localStorage.setItem('token', data.token);
            return true

        } catch (error) {
            console.error('Error:', error);
            alert("ההתחברות נכשלה. אנא נסה שוב מאוחר יותר")
            return false
        }
    },

    validateToken: async (): Promise<boolean> => {
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(`${API}/auth/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
            const data = await response.json();
            if (data == false)
                throw new Error;

            return data

        } catch (error) {
            console.error('Error:', error);
            return false
        }
    }
};

export default AuthService;
