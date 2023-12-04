import { goto } from "$app/navigation";
import type {Actions} from "@sveltejs/kit";

export type AuthResponse = {
    accessToken: string,
    refreshToken: string
}

export const actions = {
    default: async (event) => {
        const data  = await event.request.formData()
        const email: string = String(data.get('email'))
        const password: string = String(data.get('password'))

        const response = await fetch('http://localhost:3000/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const responseData: AuthResponse = await response.json()
        event.cookies.set('Authorization', responseData.accessToken, { httpOnly: true, sameSite: true})
        event.cookies.set('RefreshToken', responseData.refreshToken, { httpOnly: true, sameSite: true})
        
    }
} satisfies Actions