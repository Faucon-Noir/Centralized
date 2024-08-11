import { jwtDecode } from "jwt-decode";
import getUser from "./getUser";
import getUserProject from "./getUserProject";
import getUserTeam from "./getUserTeam";
import getUserTicket from "./getUserTicket";
import getUserSpecification from "./getUserSpecification";
import getProjectRex from "./getProjectRex";
//Create the type id in the decoded token so id is poperty is known
interface JwtPayload {
    id: string
}

export default async function UserData() {
    const token = localStorage.getItem("token");
    var user_id = ""
    var userData = {
        user: {
            avatar: "",
            bio: "",
            created_at: "",
            firstname: "",
            id: "",
            lastname: "",
            email: "",
            password: "",
            phone: ""
        },
        project: [{
            id: "",
            rex: [],
            ticket: []
        }],
        team: [{}],
        specification: [{}],
    }
    if (token) {
        //Decode the token and define it as JwtPayload so it contain id poperty
        const decoded = jwtDecode(token) as JwtPayload;
        user_id = decoded.id;

        //Fill the userData
        userData.user = await getUser(user_id, token);
        userData.project = await getUserProject(user_id, token);
        userData.specification = await getUserSpecification(user_id, token);
        userData.team = await getUserTeam(user_id, token);

        //get rexs of projects
        for (let projectData of userData.project) {
            projectData.rex = await getProjectRex(projectData.id, token)
            projectData.ticket = await getUserTicket(projectData.id, token);

        }
        return userData;
    } else {
        window.location.href = "/login"
    }
}