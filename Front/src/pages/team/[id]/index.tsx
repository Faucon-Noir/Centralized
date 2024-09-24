import TeamMateCard from "@/app/components/Card/teamMate";
import { Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import PermanentDrawerLeft from "@/app/components/PermanentDrawerLeft";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Dashboard from "@/app/components/Dashboard/Dashboard";

function TeamPage() {
  // TODO: Compléter le back pour récupérer un grade et si possible une bio de l'utilisateur
  const [teamUser, setTeamUser] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const token: any = localStorage.getItem("token");

    try {
      axios.get(`http://localhost:8000/api/teamuser/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((res: any) => {
        setTeamUser(res.data);
      })
    } catch (error) {
      console.log(error);
    }
  }, [id, setTeamUser]);

  return (
    <Box>

      <div style={{ width: '100%', marginTop: "100px", marginLeft: '150px' }}>
        <Typography variant="h4" sx={{ margin: 1, color: '#0293FC', fontSize: '24px', fontWeight: '600' }}>
          {/* Chef de Projets ({switchApi.filter((item) => item.grade === 1).length}) */}
          Membres ({teamUser.length})
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          {teamUser
            // .filter((item) => item.grade === 1)
            .map((item: any) => (
              <div key={item.user.id} style={{ display: "flex", margin: '10px' }}>
                <TeamMateCard
                  avatar={item.user.avatar}
                  firstName={item.user.firstname}
                  lastName={item.user.lastname}
                  grade={0}
                  bio={item.user.bio}
                />
              </div>
            ))}
        </div>
        {/*<Typography variant="h4" sx={{ margin: 1, color: '#0293FC', fontSize: '24px', fontWeight: '600' }}>
              Architectes ({switchApi.filter((item) => item.grade === 2).length})
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              {switchApi
                .filter((item) => item.grade === 2)
                .map((item) => (
                  <div key={item.id} style={{ display: "flex", margin: '10px' }}>
                    <TeamMateCard
                      avatar={item.avatar}
                      firstName={item.firstName}
                      lastName={item.lastName}
                      grade={item.grade}
                      bio={item.bio}
                    />
                  </div>
                ))}
            </div>
            <Typography variant="h4" sx={{ margin: 1, color: '#0293FC', fontSize: '24px', fontWeight: '600' }}>
              Développeurs ({switchApi.filter((item) => item.grade === 3).length})
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              {switchApi
                .filter((item) => item.grade === 3)
                .map((item) => (
                  <div key={item.id} style={{ display: "flex", margin: '10px' }}>
                    <TeamMateCard
                      avatar={item.avatar}
                      firstName={item.firstName}
                      lastName={item.lastName}
                      grade={item.grade}
                      bio={item.bio}
                    />
                  </div>
                ))}
            </div>*/}
      </div>
    </Box>
  );
}

export default TeamPage;
