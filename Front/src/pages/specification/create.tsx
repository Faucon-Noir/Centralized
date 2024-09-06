'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import './style.scss';
import UserData from '@/utils/User/UserData';
import { Grid } from '@mui/material';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import SpecificationForm from '@/app/components/Form/specificationForm';

export default function CreateSpecification() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>({
        project: [{
            rex: [],
            ticket: []
        }],
        team: [],
        user: [],
        specification: []
    });
    useEffect(() => {
        UserData().then(result => {
            setUserData(result)
        })
    }, [])

    return (
        <>
            <Grid container>
                <Grid xs={2}>
                    <Dashboard />
                </Grid>
                <Grid xs={10}>
                    <div className='container'>
                        <div className='wrapper'>
                            <SpecificationForm userData={userData} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
