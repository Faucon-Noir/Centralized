import axios from "axios";

export default async function getProjectRex(id: string, token: string) {
    try {
        let response = await axios.get("http://localhost:8000/api/rex/project/" + id, {
            headers: { Authorization: `Bearer ${token}` },
        })
        if (response.data.error) return {}
        return response.data;
    } catch (e) {
        console.log(e)
    }

}