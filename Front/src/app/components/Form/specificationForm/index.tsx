import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import checkFilledForm from '@/utils/checkFilledForm';
import PopConfetti from '@/utils/popConfetti';
import { Mosaic } from 'react-loading-indicators';

function SpecificationForm({ userData, setIsRequesting }: { userData: any, setIsRequesting: (value: String) => void }) {
    const router = useRouter();
    const [timer, setTimer] = useState(0);
    const [project, setProject] = useState<any>({
        team: '',
        user: '',
        name: '',
        description: '',
        functionality: '',
        forecast: '',
        start_date: new Date(),
        end_date: new Date(),
        budget: '',
        technology: '',
        constraints: '',
        validation: '',
        teamUser: '',
        template: 0,
        status: false,
    });

    async function sleep(ms: number) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        })
    }

    async function checkReq() {
        await sleep(10000)
        let responseStatus = await axios.get(`http://localhost:8000/api/specification/check-status`, { headers: { Authorization: `Bearer ${userData.user.token}` } })
        if (responseStatus.data.status === true) return true;
        return false
    }

    async function handleSubmit() {
        // add user to project
        setProject({ ...project, user: userData.user.id })
        if (await checkFilledForm(project)) {
            let checkReqFinished = false
            setIsRequesting("true");
            localStorage.setItem("isREQ", "true")
            //start the request create specification
            await axios.post(`http://localhost:8000/api/project/${project.team}/${project.user}`, project,
                { headers: { Authorization: `Bearer ${userData.user.token}` } })

            while (!checkReqFinished) {
                checkReqFinished = await checkReq();
                setTimer(timer => timer + 10);
            }

            router.push('/specification');
            setIsRequesting("false");
            localStorage.setItem("isREQ", "false")
            PopConfetti();
        }
    }

    return (
        <>
            <h1>Crée un nouveau projet</h1>
            <div className='line'>
                <input type="text" placeholder='Titre du projet' onChange={(e) => setProject({ ...project, name: e.target.value.trim() })} required />
                <input type="text" placeholder='Description du projet' onChange={(e) => setProject({ ...project, description: e.target.value.trim() })} />
            </div>
            <div className='line'>
                <textarea placeholder='Fonctionnalités du projet' rows={5} cols={50} onChange={(e) => setProject({ ...project, functionality: e.target.value.trim() })} />
                <textarea placeholder='Planning prévisionnel' rows={5} cols={50} onChange={(e) => setProject({ ...project, forecast: e.target.value.trim() })} />
            </div>
            <div className='line'>
                <input type="date" placeholder='Date de début' onChange={(e) => setProject({ ...project, start_date: e.target.value.trim() })} />
                <input type="date" placeholder='Date de fin' onChange={(e) => setProject({ ...project, end_date: e.target.value.trim() })} />
                <input type="text" placeholder='Budget prévisionnel' onChange={(e) => setProject({ ...project, budget: e.target.value.trim() })} />
            </div>
            <div className='line'>
                <select onChange={(e) => setProject({ ...project, team: e.target.value.trim() })} required>
                    <option value=''>Veuillez choisir une équipe</option>
                    {userData?.team ? userData?.team.map((item: any) => (<option key={item.team.id} value={item.team.id}>{item.team.name}</option>)) : null}
                </select>
            </div>
            <div className='line'>
                <textarea placeholder='Technologies du projet' rows={5} cols={30} onChange={(e) => setProject({ ...project, technology: e.target.value.trim() })} />
                <textarea placeholder='Contraintes du projet' rows={5} cols={30} onChange={(e) => setProject({ ...project, constraints: e.target.value.trim() })} />
                <textarea placeholder='Conditions de validation' rows={5} cols={30} onChange={(e) => setProject({ ...project, validation: e.target.value.trim() })} />
            </div>
            <div className='line'>
                <textarea placeholder='Répartition de l&apos;équipe' rows={5} cols={100} onChange={(e) => setProject({ ...project, teamUser: e.target.value.trim() })} />
            </div>
            <button onClick={handleSubmit} disabled={!project.name || !project.description || !project.functionality || !project.forecast || !project.start_date || !project.end_date || !project.budget || !project.team || !project.technology || !project.constraints || !project.validation || !project.teamUser}>Générer</button>
        </>
    );
}

export default SpecificationForm;
