"use client";
import PermanentDrawerLeft from "@/app/components/PermanentDrawerLeft";
import { Button, Grid, TextField } from "@mui/material";
import './style.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import router from "next/router";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useData from './hook';
import { ProjectType } from "../specification/type";
import { CreateTeamProps, TeamProps } from "./type";



function CreateTeam() {
    const [userProjectList, setUserProjectList] = useState<ProjectType[]>([]);
    const [team, setTeam] = useState<CreateTeamProps>({ avatar: null, name: '', users: [] });
    const [formError, setFormError] = useState<boolean>(false);
    const [addUserCreate, setaddUserCreate] = useState<string>("")
    const { handleFileChange, handleCreateSubmit, VisuallyHiddenInput } = useData(setTeam, team, addUserCreate);

    if (typeof window !== 'undefined') {

        const isAuth: boolean = !!localStorage.getItem("token");
        let user_id: string = "";
        if (isAuth) {
            const token: any = localStorage.getItem("token");
            const decodeToken: any = jwtDecode(token);
            user_id = decodeToken["id"];
            useEffect(() => {
                console.log('user_id', user_id)
                try {
                    axios.get(`http://localhost:8000/api/project/user/${user_id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }).then(res => {
                        setUserProjectList(res.data);
                    })
                } catch (error: any) {
                    console.log('error', error.message);
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
                    <PermanentDrawerLeft page="team" />
                </Grid>
                <Grid xs={10}>
                    <form>
                        <div className="box">
                            <h1 className="title">Modifier mon équipe</h1>

                            <TextField
                                autoFocus
                                label="Nom de l'équipe"
                                sx={{ backgroundColor: '#eceeee', width: '100%', margin: '5px' }}
                                value={team.name}
                                onChange={(e) => {
                                    if (e.target.value.trim() === '') {
                                    } else {
                                        setTeam({ ...team, name: e.target.value });
                                    }
                                }}
                            />

                            <TextField
                                sx={{ backgroundColor: '#eceeee', width: '100%' }}
                                label="Ajouter des membres via leurs email"
                                placeholder="monemail@gmail.com, sonemail@gmail.com, leursemail@gmail.com"
                                onChange={(e) => {
                                    setaddUserCreate(e.target.value)
                                }}
                            />
                            <Button
                                sx={{
                                    backgroundColor: '#0293FC',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    color: 'white',
                                    minWidth: '200px',
                                    margin: '5px'
                                }}
                                component="label"
                                role={undefined}
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload avatar
                                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                            </Button>
                            <button
                                type="submit"
                                className="button"
                                onClick={e => handleCreateSubmit(e)}
                                disabled={formError}>
                                Créer
                            </button>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </>
    );
}

export default CreateTeam;
