import { jwtDecode } from "jwt-decode";
import getUserTicket from "./getUserTicket";
import getProjectRex from "./getProjectRex";
import getCountAllTicketByUserOneProject from "./getCountAllTicketByUserOneProject";
import { GenerateDataWeekTicket } from "@/app/helpers";
import getProject from "./getProject";
import getUserTeamProject from "./getUserTeamProject";
import getCountAllTicketByStatusOneProject from "./getCountAllTicketByStatusOneProject";
import getCountAllTicketOneProjectOneUserByStatus from "./getCountAllTicketOneProjectOneUserByStatus";

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
            nbrTicketPerWeek: { week: [""], nbr_ticket: [0] },
            nbrTicketByStatus: [{ status: "", nbr_ticket: 0 }],
            nbrTicketOpenProject: 0,
            nbrTicketProject: 0,
            nbrMyTicketOpenProject: 0,
            nbrMyTicketProject: 0
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

        projectData.stat.nbrTicketByStatus = await getCountAllTicketByStatusOneProject(user_id, token, id);
        //Pour réduire le nombre de requête, on récupère le nombre de ticket par status.
        //On a plus qu'a additionner les bons nombres
        for (let ticket of projectData.stat.nbrTicketByStatus) {
            let new_number = Number(ticket.nbr_ticket);
            if(ticket.status != 'résolu') {
                projectData.stat.nbrTicketOpenProject = projectData.stat.nbrTicketOpenProject + new_number;
            }
            projectData.stat.nbrTicketProject = projectData.stat.nbrTicketProject + new_number;
        }

        const ticketByStatusForMe = await getCountAllTicketOneProjectOneUserByStatus(user_id, token, id)

        for (let ticket of ticketByStatusForMe) {
            let new_number = Number(ticket.nbr_ticket);
            if(ticket.status != 'résolu') {
                projectData.stat.nbrMyTicketOpenProject =  projectData.stat.nbrMyTicketOpenProject + new_number;
            }
            projectData.stat.nbrMyTicketProject = projectData.stat.nbrMyTicketProject + new_number;
        }

        projectData.stat.nbrTicketByUser = await getCountAllTicketByUserOneProject(user_id, token, id);
    }
    return projectData;
}