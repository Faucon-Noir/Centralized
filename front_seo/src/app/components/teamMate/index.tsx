import { Avatar, Box, Typography } from "@mui/material";
import { TeamMateCardProps } from "./type";
import { gradeToString } from "@/app/helpers";
import { BoxTeamMate } from "./style";

export default function TeamMateCard({ avatar, firstName, lastName, grade, bio }: TeamMateCardProps) {
    return (
        <Box sx={BoxTeamMate}>
            <Avatar src={avatar} sx={{ height: "100px", width: "100px" }} />
            <Typography style={{ fontSize: '18px', fontWeight: '700' }}>
                {`${firstName} ${lastName}`}
            </Typography>
            {/* <Typography style={{ fontSize: '14px', fontWeight: '600', marginTop: -20 }}>
                {gradeToString(grade)}
            </Typography> */}
            <Typography>
                {bio}
            </Typography>
        </Box>
    );
}
