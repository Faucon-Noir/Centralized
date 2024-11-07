import axios from "axios";

export default async function getUserTeamProject(id: string, token: string) {
    try {
        let response = await axios.get("http://localhost:8000/api/teamuser/project/" + id, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return response.data;
    } catch (e) {
        console.log(e)
    }

}