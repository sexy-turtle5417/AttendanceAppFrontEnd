import type { PageServerLoad } from "./$types";
import type { AuthResponse  } from "../../login/+page.server";

export type GuardPublicInfo = {
   id: string,
   firstname: string,
   middlename: string,
   lastname: string,
   email: string
}



export const load = ( async ({ cookies }) => {
    const accessToken = String(cookies.get('Authorization'))
    const refreshToken = String(cookies.get('RefreshToken'))

    const response = await fetch('http://localhost:3000/guard/details', {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if(!response.ok){
        const response = await fetch('http://localhost:3000/auth/refresh', {
            method: "POST",
            headers: {
                'RefreshToken': `Bearer ${refreshToken}`
            }
        })
        const responseData: AuthResponse = await response.json()
        cookies.set('Authorization', String(responseData.accessToken))
        cookies.set('RefreshToken', String(responseData.refreshToken))
        const guardData = await fetch('http://localhost:3000/guard/details', {
            method: "GET",
            headers: {
                'RefreshToken': `Bearer ${responseData.refreshToken}`
            }
        });
        const guardDataJson: GuardPublicInfo = await guardData.json()
        return guardDataJson
    }

    const responseData: GuardPublicInfo = await response.json()
    return responseData
}) satisfies PageServerLoad
