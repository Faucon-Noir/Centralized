import axios from "axios";

export default async function getUserByOneTicket(id: string, token: string) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    let $url = `${baseUrl}ticket/`+ id +'/user'
    try {
        let response = await axios.get($url, {
            headers: { Authorization: `Bearer ${token}`},
        })
        return response.data;
    } catch (e) {
        console.log(e)
    }
}