import SpecificationHomeCard from "@/app/components/SpecificationHomeCard";
import Grid from '@mui/material/Unstable_Grid2';
import "./style.scss";
import { jwtDecode } from "jwt-decode";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "@/app/components/Dashboard/Dashboard";
import { ButtonBase } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ProjectType } from "./type";

function TeamPage() {
  const [specification, setSpecification] = useState<ProjectType[]>([]);
  if (typeof window !== 'undefined') {

    const isAuth: boolean = !!localStorage.getItem("token");
    let user_id: string = "";
    if (isAuth) {
      const token: any = localStorage.getItem("token");
      const decodeToken: any = jwtDecode(token);
      user_id = decodeToken["id"];

      useEffect(() => {
        //GET PROJECT OF USER
        [/* TODO Soit on récupère les projets et on doit réussi a pointé le specification, soit on récupère les specification mais ils auraient besoin d'un nom */]
        try {
          axios.get(`http://localhost:8000/api/project/user/${user_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            setSpecification(res.data);
            console.log(res.data);
          })
        } catch (error) {
          console.log(error);
        }
      }, [token, user_id]);

    }
  }

  return (
    <Box>
      <Grid container>
        <Grid xs={2} id="Drawer">
          <Dashboard page="specification" />
        </Grid>
        <Grid xs={9} id="Affichage-Equipe">
          <div className="specification_title">
            <div className="specification_title_cross">
              <h1>Mes cahiers des charges</h1>
              <ButtonBase href="/specification/create"><AddIcon fontSize='medium' sx={{ color: "#000000" }} /></ButtonBase>
            </div>
            <hr align="left" />
          </div>
          <div className="specification_container">
            {specification && specification.map((item: ProjectType) => (
              <div key={item.id}>
                <SpecificationHomeCard
                  id={item.id}
                  name={item.name}
                  color={item.color}
                  start={item.start_date}
                  end={item.end_date}
                  budget={item.budget}
                  desc={item.description}
                />
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TeamPage;
