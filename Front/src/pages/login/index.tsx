import RegistrationForm from "@/app/components/Form/registrationForm";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import './style.scss'

function LoginPage() {
    return (
        <div className="login_container">
            <div className="main_container">
                <RegistrationForm />
            </div>
            <div className="logo_container">
                <div className="logo">
                    <img src="/assets/logo/WhiteLogoUnder.png" alt="Logo" />
                    <p>Travaillez ensemble plus facilement 🤝</p>
                </div>
                <div className="icons">
                    <div className="common projects">
                        <img src="/assets/icons/project.svg" alt="" />
                        <p >Mes projets</p>
                    </div>
                    <div className="common plannings">
                        <img src="/assets/icons/planning.svg" alt="" />
                        <p >Mon Planning</p>
                    </div>
                    <div className="common specification">
                        <img src="/assets/icons/specification.svg" alt="" />
                        <p >Cahier des charges</p>
                    </div>
                    <div className="common tickets">
                        <img src="/assets/icons/tickets.svg" alt="" />
                        <p>Tickets</p>
                    </div>
                    <div className="common teams">
                        <img src="/assets/icons/teams.svg" alt="" />
                        <p >Équipe</p>
                    </div>
                    <div className="common rex">
                        <img src="/assets/icons/rex.svg" alt="" />
                        <p >Rex</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
