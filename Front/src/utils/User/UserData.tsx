import { jwtDecode } from "jwt-decode";
import getUser from "./getUser";
import getUserProject from "./getUserProject";
import getUserTeam from "./getUserTeam";

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
        project: [{}],
        team: [{}],
    }
    if (token) {
        //Decode the token and define it as JwtPayload so it contain id poperty
        const decoded = jwtDecode(token) as JwtPayload;
        user_id = decoded.id;

        //Fill the userData
        userData.user = await getUser(user_id, token);
        userData.project = await getUserProject(user_id, token);
        userData.team = await getUserTeam(user_id, token);

        return userData;
    } else {
        window.location.href = "/login"
    }
}