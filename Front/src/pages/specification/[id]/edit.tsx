"use client";

import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import "./style.scss"
import { Grid } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomEditor from '@/app/components/customEditor';
import CheckIcon from '@mui/icons-material/Check';
import { useCallback } from 'react';
import Dashboard from "@/app/components/Dashboard/Dashboard";

export default function SpecificationEdit() {
  const router = useRouter();
  const [project, setProject] = useState<string>('');
  const [specification, setSpecification] = useState<string>('');
  const [mySpecification, setMySpecification] = useState<{ charge: string }>({ charge: "" });
  let contentText: string = '';
  const [text, setText] = useState<string | undefined>(contentText);

  const handleChangeContentText = useCallback(
    (value: string) => {
      if (value !== text) {
        setText(value);
      }
    },
    [setText, text]
  );

  if (typeof window !== 'undefined') {

    const isAuth: boolean = !!localStorage.getItem("token");
    let user_id: string = "";
    if (isAuth) {
      const token: any = localStorage.getItem("token");
      const decodeToken: any = jwtDecode(token);
      user_id = decodeToken["id"];

      useEffect(() => {
        let idProject = new URL(window.location.href).pathname.split('/')[2]
        setProject(idProject)
        if (!idProject) {
          router.push("/specification");
        }
        //GET PROJECT OF USER
        try {
          axios.get(`http://localhost:8000/api/cdc/project/${idProject}`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            let new_specification = res.data.cdc;
            setMySpecification({ charge: new_specification })
            console.log('new_specification', new_specification)
            setText(new_specification)
            setSpecification(res.data.id)
            // console.log('setSpecification', res.data.id)
          })
        } catch (error) {
          console.log(error);
        }
      }, [router, token]);

    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token: any = localStorage.getItem("token");
    // TODO: data a revoir => x n'exsite pas sur le type EventTarget
    axios.patch(`http://localhost:8000/api/cdc/${specification}`, {
      specification: text
    }, { headers: { Authorization: `Bearer ${token}` } })
      .then(function (response) {
        if (response.status === 200) {
          router.push(`/specification/${project}`)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Grid container>
        <Grid xs={2}>
          <Dashboard page="specification" />
        </Grid>
        <Grid xs={10}>
          <form onSubmit={handleSubmit}>
            <div className="box-specification">
              <CustomEditor content={mySpecification.charge} onChange={(value: string) => handleChangeContentText(value)} />
              <button type="submit">
                <CheckIcon />
              </button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
