import axios from "axios";

export default async function getUser(id: string, token: string) {
    try {
        let response = await axios.get("http://localhost:8000/api/user/" + id, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return response.data;
    } catch (e) {
        console.log(e)
    }

}