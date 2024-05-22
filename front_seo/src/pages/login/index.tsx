import RegistrationForm from "@/app/components/registrationForm";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { BlueGrid, BodyStyle, MainGridStyle } from "./style";
import BlueSideRight from "@/app/components/blueSideRight";
import { Box } from "@mui/system";
import './style.scss'



function LoginPage() {
    return (
        <div className="page-container">
            <Grid container sx={MainGridStyle}>
                <Grid container xs={9} justifyContent='center' alignItems='center'>
                    <RegistrationForm />
                </Grid>
                <Grid xs={3} sx={BlueGrid}>
                    <div className="logo">
                        <img src="/assets/logo/WhiteLogoUnder.png" alt="Logo" />
                        <p>Travaillez ensemble plus facilement 🤝</p>
                    </div>
                    <div className="icons">
                        <div className="common projects">
                            <img src="/assets/icons/project.svg" alt="" />
                            <p>Mes projets</p>
                        </div>
                        <div className="common plannings">
                            <img src="/assets/icons/planning.svg" alt="" />
                            <p>Mon Planning</p>
                        </div>
                        <div className="common specification">
                            <img src="/assets/icons/specification.svg" alt="" />
                            <p>Cahier des charges</p>
                        </div>
                        <div className="common tickets">
                            <img src="/assets/icons/tickets.svg" alt="" />
                            <p>Tickets</p>
                        </div>
                        <div className="common teams">
                            <img src="/assets/icons/teams.svg" alt="" />
                            <p>Équipe</p>
                        </div>
                        <div className="common rex">
                            <img src="/assets/icons/rex.svg" alt="" />
                            <p>Rex</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default LoginPage;
