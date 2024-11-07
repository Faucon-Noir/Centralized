import axios from "axios";

export default async function getCountAllTicketOneProjectOneUserByStatus(id: string, token: string, id_project: string) {
    let $url = "http://localhost:8000/api/ticket/user/"+ id + "/project/" + id_project + "/status/me";
    try {
        let response = await axios.get($url, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return response.data;
    } catch (e) {
        console.log(e)
    }

}