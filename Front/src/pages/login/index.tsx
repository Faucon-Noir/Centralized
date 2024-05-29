import RegistrationForm from "@/app/components/registrationForm";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { BlueGrid, MainGridStyle } from "./style";
import './style.scss'
import { BlueGridCy, PlanningImgCy, PlanningsLabelCy, ProjectImgCy, ProjectsLabelCy, RegistrationFormCy, RexImgCy, RexLabelCy, SpecificationImgCy, SpecificationLabelCy, TeamsImgCy, TeamsLabelCy, TicketImgCy, TicketsLabelCy, WhiteGridCy, WhiteLogoImgCy, WhiteLogoLabelCy } from "./const";

function LoginPage() {
    return (
        <div className="page-container">
            <Grid container sx={MainGridStyle}>
                <Grid data-cy={WhiteGridCy} container xs={9} justifyContent='center' alignItems='center'>
                    <RegistrationForm data-cy={RegistrationFormCy} />
                </Grid>
                <Grid data-cy={BlueGridCy} xs={3} sx={BlueGrid}>
                    <div className="logo">
                        <img data-cy={WhiteLogoImgCy} src="/assets/logo/WhiteLogoUnder.png" alt="Logo" />
                        <p data-cy={WhiteLogoLabelCy}>Travaillez ensemble plus facilement 🤝</p>
                    </div>
                    <div className="icons">
                        <div className="common projects">
                            <img data-cy={ProjectImgCy} src="/assets/icons/project.svg" alt="" />
                            <p data-cy={ProjectsLabelCy}>Mes projets</p>
                        </div>
                        <div className="common plannings">
                            <img data-cy={PlanningImgCy} src="/assets/icons/planning.svg" alt="" />
                            <p data-cy={PlanningsLabelCy}>Mon Planning</p>
                        </div>
                        <div data-cy={SpecificationImgCy} className="common specification">
                            <img src="/assets/icons/specification.svg" alt="" />
                            <p data-cy={SpecificationLabelCy}>Cahier des charges</p>
                        </div>
                        <div className="common tickets">
                            <img data-cy={TicketImgCy} src="/assets/icons/tickets.svg" alt="" />
                            <p data-cy={TicketsLabelCy}>Tickets</p>
                        </div>
                        <div className="common teams">
                            <img data-cy={TeamsImgCy} src="/assets/icons/teams.svg" alt="" />
                            <p data-cy={TeamsLabelCy}>Équipe</p>
                        </div>
                        <div className="common rex">
                            <img data-cy={RexImgCy} src="/assets/icons/rex.svg" alt="" />
                            <p data-cy={RexLabelCy}>Rex</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default LoginPage;
