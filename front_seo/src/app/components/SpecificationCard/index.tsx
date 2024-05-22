"use client";
import "./style.scss"
import { SpecificationCardProps } from "./type";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Icon } from "@mui/material";
import { numberToColor } from "@/app/helpers";

export default function SpecificationCard({ title, id }: SpecificationCardProps) {
    return (
        <a className="specification_redirection" href={`/specification/${id}`}>
            <div className="specification_card">
                <Icon sx={{ color: numberToColor(id) }}>
                    <FileCopyIcon />
                </Icon>
                <p className="title">{title}</p>
            </div>
        </a>
    );
}

