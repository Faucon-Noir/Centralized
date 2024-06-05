"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "./style.scss";
import { creationTicket } from "@/app/constant";
import { Grid, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { urgenceIdToString } from "@/app/helpers";
import { ErrorStyle } from "./style";
import Dashboard from "@/app/components/Dashboard/Dashboard";
import { TicketProps } from "./type";

export default function CreateSpecification() {
    const router = useRouter();
    const [projectList, setProjectList] = useState<any[]>([]);
    const [load, setLoad] = useState<boolean>(false);
    const [ticket, setTicket] = useState<TicketProps>({
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        planningId: "",
        user_id: "",
        title: "",
        urgenceId: -1,
        description: ""
    })
    const [isError, setIsError] = useState<number>(0);
    const options: any = [];
    for (let id: number = 0; id <= 4; id++) {
        options.push(<option key={id} value={id}>{urgenceIdToString(id)}</option>);
    }

    function verificationTicket() {
        if (ticket.title?.trim() == '')
            return 1;
        else if (ticket.start_date?.trim() == '')
            return 2;
        else if (ticket.end_date?.trim() == '')
            return 3;
        else if (ticket.planningId == '')
            return 4;
        else if (ticket.urgenceId == -1)
            return 5;
        else if (ticket.description?.trim() == '')
            return 6;
        else
            return 0;
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (!load) {
            setLoad(true);

            //TODO verifier si on passer autrement que par une variable intermediaire pour bloquer les validations directs
            let statusError = verificationTicket();
            setIsError(statusError);
            if (statusError == 0) {
                console.log(isError + "gs")
                const token: any = localStorage.getItem("token");
                axios.post(`http://localhost:8000/api/ticket`, {
                    title: ticket.title?.trim(),
                    start_date: ticket.start_date?.trim(),
                    end_date: ticket.end_date?.trim(),
                    planning: ticket.planningId,
                    user: ticket.user_id,
                    urgenceId: ticket.urgenceId,
                    description: ticket.description?.trim()
                }, { headers: { Authorization: `Bearer ${token}` } })
                    .then(function (response) {
                        if (response.status === 200 && response.data.success) {
                            router.push("/ticket")
                        } else {
                            setIsError(7)
                        }
                    })
                    .catch(function (error) {
                        console.log('error', error);
                        alert('Une erreur est survenue')
                        setIsError(7)
                    });
            }
            setLoad(false);
        }
    };

    if (typeof window !== 'undefined') {

        const isAuth: boolean = !!localStorage.getItem("token");
        let user_id: string = "";
        if (isAuth) {
            const token: any = localStorage.getItem("token");
            const decodeToken: any = jwtDecode(token);
            user_id = decodeToken["id"];

            useEffect(() => {
                setTicket({ ...ticket, user_id: user_id });
                // On récupère les projets de l'utilisateur
                try {
                    axios.get(`http://localhost:8000/api/planning/user/${user_id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }).then(res => {
                        setProjectList(res.data);
                    })
                } catch (error) {
                    console.log('useEffect error', error);
                }
            }, [token, user_id]);
        } else {
            router.push("/login")
        }
    }

    return (
        <>
            <Grid container>
                <Grid xs={2}>
                    <Dashboard page="ticket" />
                </Grid>
                <Grid xs={10}>
                    <form>
                        <div className="box">
                            <h1 className="title">Nouveau ticket</h1>
                            <div className="form_container">
                                {creationTicket.map((item) => (
                                    <>
                                        {item.type == "textarea" ? (
                                            // Si le form est un textarea
                                            <div className="input_form">
                                                <label htmlFor={item.name}>{item.label}</label>
                                                <textarea
                                                    id={item.name}
                                                    name={item.name}
                                                    required
                                                    onChange={e => setTicket({ ...ticket, [item.name as string]: e.target.value })}
                                                />
                                                {isError == item.idError ?
                                                    <Typography sx={ErrorStyle}>{item.NameError}</Typography> : ""
                                                }
                                            </div>
                                        ) : item.type == "text" ? (
                                            // Si le form est un simple texte
                                            <div className="input_form">
                                                <label htmlFor={item.name}>{item.label}</label>
                                                <input
                                                    type="text"
                                                    id={item.name}
                                                    name={item.name}
                                                    required
                                                    onChange={e => setTicket({ ...ticket, [item.name as string]: e.target.value })}
                                                />
                                                {isError == item.idError ?
                                                    <Typography sx={ErrorStyle}>{item.NameError}</Typography> : ""
                                                }
                                            </div>
                                        ) : item.type == "date" ? (
                                            // Si le form est un groupe de date
                                            <div className="box_date">
                                                {item.input.map((item) => (
                                                    <>
                                                        <div className="input_date">
                                                            <label htmlFor={item.name}>{item.label}</label>
                                                            <input
                                                                type="date"
                                                                id={item.name}
                                                                name={item.name}
                                                                required
                                                                defaultValue={new Date().toISOString().split('T')[0]}
                                                                onChange={e => setTicket({ ...ticket, [item.name as string]: e.target.value })}
                                                            />
                                                            {isError == item.idError ?
                                                                <Typography sx={ErrorStyle}>{item.NameError}</Typography> : ""
                                                            }
                                                        </div>
                                                    </>

                                                ))}
                                            </div>
                                        ) : item.type == "select" ? (
                                            // Si c'est un select
                                            item.name == 'urgenceId' ?
                                                <div className="input_form">
                                                    <label htmlFor={item.name}>{item.label}</label>
                                                    <select
                                                        name={item.name}
                                                        id={item.name}
                                                        required
                                                        onChange={e => setTicket({ ...ticket, [item.name as string]: parseInt(e.target.value) })}>
                                                        <option value="-1">--Please choose an option--</option>
                                                        {options}
                                                    </select>
                                                    {isError == item.idError ?
                                                        <Typography sx={ErrorStyle}>{item.NameError}</Typography> : ""
                                                    }
                                                </div>
                                                : <div className="input_form">
                                                    <label htmlFor={item.name}>{item.label}</label>
                                                    <select
                                                        name={item.name}
                                                        id={item.name}
                                                        required
                                                        onChange={e => setTicket({ ...ticket, [item.name as string]: e.target.value })}>
                                                        <option value="">--Please choose an option--</option>
                                                        {projectList ? projectList.map((item) => (
                                                            <option key={item.planning_id} value={item.planning_id}>{item.project_name}</option>
                                                        ))
                                                            : null}
                                                    </select>
                                                    {isError == item.idError ?
                                                        <Typography sx={ErrorStyle}>{item.NameError}</Typography> : ""
                                                    }
                                                </div>
                                        ) : (null)}
                                    </>
                                ))}
                                <div className="btn_container">
                                    <button type="submit" disabled={load} onClick={e => handleSubmit(e)}>Créer</button>

                                </div>
                            </div>
                            {isError == 7 ?
                                <Typography sx={ErrorStyle}>Une erreur est survenue</Typography> : ""
                            }
                        </div>
                    </form>
                </Grid>
            </Grid>
        </>
    );
}
