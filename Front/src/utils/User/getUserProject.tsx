import axios from "axios";

export default async function getUserProject(id: string, token: string) {
    try {
        let response = await axios.get("http://localhost:8000/api/project/user/" + id, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return response.data;
    } catch (e) {
        console.log(e)
    }

}