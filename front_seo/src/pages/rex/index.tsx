import Grid from '@mui/material/Unstable_Grid2';
import "./style.scss";
import { jwtDecode } from "jwt-decode";
import RexItem from "@/app/components/LongCard/RexItem";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "@/app/components/Dashboard/Dashboard";
import { ProjectRexType } from './type';
import { ProjectType } from '../specification/type';

function TeamPage() {
  const [project, setProject] = useState<ProjectType[]>([]);
  if (typeof window !== 'undefined') {

    const isAuth: boolean = !!localStorage.getItem("token");
    let user_id: string = "";
    if (isAuth) {
      const token: any = localStorage.getItem("token");
      const decodeToken: any = jwtDecode(token);
      user_id = decodeToken["id"];

      useEffect(() => {
        //GET PROJECT OF USER
        try {
          axios.get(`http://localhost:8000/api/project/user/${user_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            setProject(res.data);
          })
        } catch (error) {
          console.log(error);
        }
      }, [token, user_id]);

    }
  }
  return (
    <>
      <Grid container>
        <Grid xs={2}>
          <Dashboard page="rex" />
        </Grid>
        <Grid xs={9}>
          <div className="rex_container">
            <div className="header" style={{ width: '100%', marginTop: "100px", marginLeft: '20px', }}>
              <h1>Projets en cours</h1>
            </div>
            <div className="card_container">
              {project.map((item: any) => (
                <>
                  <RexItem id={item.id}
                    name={item.name}
                    status={item.status}
                  /></>
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default TeamPage;
