"use client";
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import "./style.scss"
import PermanentDrawerLeft from '@/app/components/PermanentDrawerLeft';
import { Grid } from '@mui/material';
import { jwtDecode } from "jwt-decode";
import axios, { AxiosResponse } from "axios";
import { MyRexType, RexType } from './type';
import { ProjectType } from '../specification/type';

export default function Page() {
  // On récupère l'id dans l'url et on le change en nombre
  const router = useRouter()
  const [IsForm, setIsForm] = useState<boolean>(true)
  const [myRex, setMyRex] = useState<MyRexType>({
    rexProbleme: "",
    rexReussite: "",
    rexAmelioration: "",
    idProjet: ""
  })
  const [rex, setRex] = useState<RexType>({
    answer1: "",
    answer2: "",
    answer3: ""
  });
  const [project, setProject] = useState<ProjectType>({
    budget: "",
    constraint: "",
    description: "",
    end_date: "",
    forecast: "",
    functionality: "",
    id: "",
    name: "",
    start_date: "",
    status: false,
    team_user: "",
    technology: "",
    validation: "",
    team: "",
    user: "",
    template: "",
    constraints: "",
  });
  const [isError, setIsError] = useState<number>(0);

  function verificationRex() {
    if (myRex.rexReussite.trim() == '')
      return 1;
    else if (myRex.rexProbleme.trim() == '')
      return 2;
    else if (myRex.rexAmelioration.trim() == '')
      return 3;
    else
      return 0;
  }

  if (typeof window !== 'undefined') {

    const isAuth: boolean = !!localStorage.getItem("token");
    let user_id: string = "";
    if (isAuth) {
      const token: any = localStorage.getItem("token");
      const decodeToken: any = jwtDecode(token);
      user_id = decodeToken["id"];

      useEffect(() => {
        //GET PROJECT OF ID
        try {
          const idProjet: string = new URL(window.location.href).pathname.split('/')[2]
          axios.get(`http://localhost:8000/api/project/${idProjet}`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            setProject(res.data);
            console.log('getProject', res.data)
            if (res.data.id) {
              if (res.data.status === true) {
                setIsForm(false)
                axios.get(`http://localhost:8000/api/rex/project/${idProjet}`, {
                  headers: { Authorization: `Bearer ${token}` }
                }).then((res: any) => {
                  setRex(res.data);
                  console.log('getRex', res.data)
                })
              }
            } else {
              // router.push("/rex")
            }
          })
        } catch (error) {
          console.log(error);
        }

      }, [token]);
    } else {
      router.push("/login")
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token: any = localStorage.getItem("token");
    {/* TODO verifier si on passer autrement que par une variable intermediaire pour bloquer les validations directs */ }
    let statusError = verificationRex();
    setIsError(statusError);

    if (statusError == 0) {
      axios.post(`http://localhost:8000/api/rex`, {
        project: project.id,
        answer1: myRex.rexReussite.trim(),
        answer2: myRex.rexProbleme.trim(),
        answer3: myRex.rexAmelioration.trim(),
      }, { headers: { Authorization: `Bearer ${token}` } })
        .then(function (response: AxiosResponse<any, any>) {
          if (response.status === 200 && response.data.success) {
            window.location.reload();
          } else {
            setIsError(4);
          }
        })
        .catch(function (error: any) {
          console.log("error", error);
          setIsError(4);
        });
    }
  }

  return (
    <div>
      <Grid container>
        <Grid xs={2}>
          <PermanentDrawerLeft page="rex" />
        </Grid>
        <Grid xs={10}>
          {IsForm ?
            <form onSubmit={e => handleSubmit(e)}>
              <div className='box'>
                <h1 className='title'>Retour d&apos;Expérience</h1>

                <div className='input_form'>
                  <label htmlFor='rexReussite'>
                    Ce qui s&apos;est bien passé?
                  </label>
                  <textarea id="rexReussite" name="rexReussite" required onChange={e => setMyRex({ ...myRex, rexReussite: e.target.value })} />
                  {isError == 1 ?
                    <p className="error_message">Veuillez écrire les points positifs trouvés </p> : ""
                  }
                </div>

                <div className='input_form'>
                  <label htmlFor='rexProbleme'>
                    Ce qui s&apos;est mal passé?
                  </label>
                  <textarea id="rexProbleme" name="rexProbleme" required onChange={e => setMyRex({ ...myRex, rexProbleme: e.target.value })} />
                  {isError == 2 ?
                    <p className="error_message">Veuillez écrire les points bloquants trouvés </p> : ""
                  }
                </div>

                <div className='input_form'>
                  <label htmlFor='rexAmelioration'>
                    Ce qui pourrait être amélioré?
                  </label>
                  <textarea id="rexAmelioration" name="rexAmelioration" required onChange={e => setMyRex({ ...myRex, rexAmelioration: e.target.value })} />
                  {isError == 3 ?
                    <p className="error_message">Veuillez écrire les points pouvant être améliorés </p> : ""
                  }
                </div>
                {isError == 4 ?
                  <p className="error_message">Une erreur est survenue</p> : ""
                }
                <button type="submit">Cloturer le projet</button>
              </div>
            </form>
            :
            <div className='box'>
              <h1 className='title'>Retour d&apos;Expérience</h1>

              <div className='result_form'>
                <h4>
                  Ce qui s&apos;est bien passé?
                </h4>
                {rex ? <p>{rex.answer1}</p> : null}
              </div>

              <div className='result_form'>
                <h4>
                  Ce qui s&apos;est mal passé?
                </h4>
                {rex ? <p>{rex.answer2}</p> : null}
              </div>

              <div className='result_form'>
                <h4>
                  Ce qui pourrait être amélioré?
                </h4>
                {rex ? <p>{rex.answer3}</p> : null}
              </div>
            </div>
          }
        </Grid>
      </Grid>
    </div>
  );
}
