import React, { useState } from "react";
import "./style.scss"

function FirstStep({ setUserStep }: any) {
    return (
        <div className="team_form">
            <h3>Créez votre équipe</h3>
            <div className="same_line">
                <div className="input_grp">
                    <p>Nom de l&apos;équipe*</p>
                    <input type="text" placeholder="Centralized" name="" id="" />
                </div>
                <div className="input_grp">
                    <p>Avatar</p>
                    <input type="file" className="avatar_input" placeholder="Centralized" name="" id="" />
                </div>
            </div>
            <div className="second_line">
                <div className="input_grp">
                    <p>Membres</p>
                    <input type="input" placeholder="aaaa@gmail.com, bbbb@gmail.com, cccc@gmail.com" name="" id="" />
                </div>
            </div>

            <button className="next_btn" onClick={() => setUserStep(2)}>Suivant</button>
        </div>
    );
}

export default FirstStep;
