import axios from "axios";

export default async function getProject(id: string, token: string) {
    try {
        let response = await axios.get("http://localhost:8000/api/project/" + id, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return response.data;
    } catch (e) {
        console.log(e)
    }
}