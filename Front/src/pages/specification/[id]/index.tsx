/* eslint-disable react-hooks/rules-of-hooks */
"use client";

// import { FormEvent } from 'react'
// import { useRouter } from 'next/router'
// import "./style.scss"
// import { Grid } from "@mui/material";
// import { jwtDecode } from "jwt-decode";
// import { useEffect, useState } from "react";

// import { useCallback } from 'react';
// import Dashboard from "@/app/components/Dashboard/Dashboard";



// export default function SpecificationEdit({ userData, updateUserData }: { userData: any, updateUserData: any }) {
//   const router = useRouter();
//   const [project, setProject] = useState<string>('');
//   const [specification, setSpecification] = useState<string>('');
//   const [mySpecification, setMySpecification] = useState<{ charge: string }>({ charge: "" });
//   let contentText: string = '';
//   const [text, setText] = useState<string | undefined>(contentText);

//   if (typeof window !== 'undefined') {

//     const isAuth: boolean = !!localStorage.getItem("token");
//     let user_id: string = "";
//     if (isAuth) {
//       const token: any = localStorage.getItem("token");
//       const decodeToken: any = jwtDecode(token);
//       user_id = decodeToken["id"];

//       useEffect(() => {
//         let idProject = new URL(window.location.href).pathname.split('/')[2]
//         setProject(idProject)
//         if (!idProject) {
//           router.push("/specification");
//         }
//         //GET PROJECT OF USER
//         try {
//           axios.get(`http://localhost:8000/api/cdc/project/${idProject}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           }).then(res => {
//             let new_specification = res.data.cdc;
//             setMySpecification({ charge: new_specification })
//             setText(new_specification)
//             setSpecification(res.data.id)
//           })
//         } catch (error) {
//           console.log(error);
//         }
//       }, [router, token]);

//     }
//   }



//   console.log(userData)

//   return (
//     <div>

//       <form onSubmit={handleSubmit}>
//         <div className="box-specification">
//           <CustomEditor content={mySpecification.charge} onChange={(value: string) => handleChangeContentText(value)} />
//           <button type="submit">
//             <CheckIcon />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import "./style.scss"
import { FormEvent, useCallback } from 'react'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { numberToColor } from '@/app/helpers';
import dynamic from 'next/dynamic';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
const CustomEditor = dynamic(() => import('@/app/components/customEditor'), { ssr: false });

export default function SpecificationEdit({ userData, updateUserData }: { userData: any, updateUserData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [projectMap, setProjectMap] = useState<{ [key: string]: any }>({});
  const [projectPageID, setprojectPageID] = useState("");
  const [text, setText] = useState<string | undefined>("");
  const [showPopPup, setShowPopPup] = useState(false);

  useEffect(() => {
    if (userData.project.length > 0) {
      let tempMap: { [key: string]: any } = {}; // Crée un objet temporaire pour stocker les projets
      for (let line of userData.project) {
        tempMap[line.id] = line;
      }
      setProjectMap(tempMap);
    }
    setprojectPageID(new URL(window.location.href).pathname.split('/')[2])
    setLoading(false);
  }, [userData])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token: any = localStorage.getItem("token");
    // TODO: data a revoir => x n'exsite pas sur le type EventTarget
    axios.patch(`http://localhost:8000/api/cdc/${projectMap[projectPageID]?.cdc?.id}`, {
      cdc: text
    }, { headers: { Authorization: `Bearer ${token}` } })
      .then(function (response) {
        if (response.status === 200) {
          setShowPopPup(true)
          setTimeout(() => {
            setShowPopPup(false)
          }, 10000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const handleChangeContentText = useCallback(
    (value: string) => {
      if (value !== text) {
        setText(value);
      }
    },
    [setText, text]
  );

  if (loading) {
    return <div>Chargement en cours...</div>
  }

  return (
    <>
      <div className="right_container">
        <div className="Presentation">
          <div className='TitrePage' style={{ color: numberToColor(projectMap[projectPageID]?.color !== undefined ? projectMap[projectPageID]?.color : 0) }}> {projectMap[projectPageID] ? <h1>Mon cahier des charges</h1> : null}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="box-specification">
            <CustomEditor content={projectMap[projectPageID]?.cdc?.cdc} onChange={(value: string) => handleChangeContentText(value)} />
            <button type="submit">
              <CheckIcon />
            </button>
          </div>
        </form>
        {showPopPup ?
          <div className='reqLoad'>
            <img src="/assets/icons/icon-cross.svg" alt="" className='cross' onClick={() => setShowPopPup(false)} />
            <p >Modification</p>
            <p style={{ fontSize: "10px" }}>Votre cahier des charges à été modifié avec succes</p>
          </div>
          : null}

      </div>
    </>
  );
}

