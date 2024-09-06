"use client";

import "./style.scss"
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { numberToColor } from '@/app/helpers';
import Dashboard from "@/app/components/Dashboard/Dashboard";
import { ProjectType } from "../type";

export default function Specification() {
    const router = useRouter();
    const [project, setProject] = useState<ProjectType>({
        id: "",
        color: 0,
        team: "",
        user: "",
        name: "",
        description: "",
        functionality: "",
        forecast: "",
        start_date: "",
        end_date: "",
        budget: "",
        technology: "",
        constraints: "",
        validation: "",
        team_user: "",
        constraint: "",
        template: "",
        status: false
    });
    // let project: string = '' ou setProject(...project, id: idProject)
    if (typeof window !== 'undefined') {

        const isAuth: boolean = !!localStorage.getItem("token");
        let user_id: string = "";
        if (isAuth) {
            const token: any = localStorage.getItem("token");
            const decodeToken: any = jwtDecode(token);
            user_id = decodeToken["id"];

            useEffect(() => {
                let idProject: string = new URL(window.location.href).pathname.split('/')[2]
                if (!idProject) {
                    router.push("/specification");
                }

                //GET PROJECT OF USER
                try {
                    axios.get(`http://localhost:8000/api/project/${idProject}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }).then(res => {
                        setProject(res.data)
                        console.log(res.data)
                    })
                } catch (error) {
                    console.log(error);
                }
                //GET PROJECT OF USER
                try {
                    axios.get(`http://localhost:8000/api/cdc/project/${idProject}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }).then(res => {
                        let new_specification = res.data.cdc;
                        const element: Element | null = document.querySelector('.box-specification');
                        if (element) { element.innerHTML = new_specification; }

                    })
                } catch (error) {
                    console.log(error);
                }
            }, [router, token]);

        }
    }

    return (
        <>
            <Grid container>
                <Grid xs={2}>
                    <Dashboard page="specification" />
                </Grid>
                <Grid xs={10}>
                    <div className="right_container">
                        <div className="Presentation">
                            <div className='TitrePage' style={{ color: numberToColor(project.color !== undefined ? project.color : 0) }}> {project ? <h1>Mon cahier des charges</h1> : null}</div>
                        </div>
                        <div className="box-specification" onClick={(e) => router.push(`/specification/${project.id}/edit`)} style={{ color: numberToColor(project.color !== undefined ? project.color : 0) }}></div>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
