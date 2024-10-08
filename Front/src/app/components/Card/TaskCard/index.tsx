"use client";
import "./style.scss"
import { TaskCardProps } from './type';
import { numberToColor, urgenceIdToString } from "../../../helpers";
import { Icon } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';

export default function TaskCard({ id, urgenceId, title, date, color }: any) {
    let dateString = new Date(date);
    let dateFormat = dateString.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return (
        <>
            <div className="container">
                <div className="container_title">
                    <Icon sx={{ color: numberToColor(color) }}>
                        <FolderIcon />
                    </Icon>
                    <h2 className="task-title">{title}</h2>
                </div>
                <div className="container_infos">
                    <p>Urgence: {urgenceIdToString(urgenceId)} </p>
                    <p>posté le {dateFormat}</p>

                </div>
            </div>
        </>
    );
}
