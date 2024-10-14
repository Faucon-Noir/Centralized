import { jwtDecode } from "jwt-decode";
import getUser from "./getUser";
import getUserProject from "./getUserProject";
import getUserTeam from "./getUserTeam";
import getUserTicket from "./getUserTicket";
import getUserSpecification from "./getUserSpecification";
import getProjectRex from "./getProjectRex";
import getCountAllTicketByUserOneProject from "./getCountAllTicketByUserOneProject";
import getCountAllTicketOneUser from "./getCountAllTicketOneUser";
import { findNumberTicketByUserName, GenerateDataWeekTicket } from "@/app/helpers";
import getProject from "./getProject";
import getUserTeamProject from "./getUserTeamProject";

//Create the type id in the decoded token so id is poperty is known
interface JwtPayload {
    id: string
}

export default async function ProjectData(id: string, userData: any) {
    const token = localStorage.getItem("token");

    var user_id = ""
    var projectData = {
        project: {
            name: "",
            start_date: "",
            end_date: "",
            color: "",
            description: "",
            id: ""
        },
        cdc: {},
        rex: {
            rexProbleme: "",
            rexReussite: "",
            rexAmelioration: "",
            isForm: false
        },
        ticket: {
            ticket: [],
            count: 0
        },
        userTeam: [{}],
        stat: {
            nbrTicketByUser: [{ userName: "", nbr_ticket: 0 }],
            nbrTicket: 0,
            nbrTicketPerWeek: { week: [""], nbr_ticket: [0] }
        }
    }
    if (token) {
        //Decode the token and define it as JwtPayload so it contain id poperty
        const decoded = jwtDecode(token) as JwtPayload;
        user_id = decoded.id;
        //Fill the ProjectData
        const project = await getProject(id, token);
        projectData.project = project.projectData;
        projectData.cdc = project.cdcData;

        projectData.userTeam = await getUserTeamProject(id, token);
        const rex = await getProjectRex(id, token)
        if(Object.keys(rex).length != 0){
            projectData.rex.rexProbleme = rex.answer1;
            projectData.rex.rexReussite = rex.answer2;
            projectData.rex.rexAmelioration = rex.answer3;
        } else {
            projectData.rex.isForm = true;
        }
        projectData.ticket = await getUserTicket(id, token);
        const dataWeek = GenerateDataWeekTicket(projectData.ticket?.ticket);
        projectData.stat.nbrTicketPerWeek.week = dataWeek.week;
        projectData.stat.nbrTicketPerWeek.nbr_ticket = dataWeek.nbr_ticket;


        projectData.stat.nbrTicketByUser = await getCountAllTicketByUserOneProject(user_id, token, id);
        //Récuperer le nombre de ticket de l'utilisateur sur le projet
        //Une alternative plus sur serait de passer directement à travers une requete (pas de problème si 2 utilisateurs ont le même nom/prénom)
        const userName = userData.user.firstname + ' ' + userData.user.lastname;
        projectData.stat.nbrTicket = findNumberTicketByUserName(userName, projectData.stat.nbrTicketByUser);
    }
    return projectData;
}