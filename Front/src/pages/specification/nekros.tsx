'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import './style.scss';
import UserData from '@/utils/User/UserData';
import { Button, Grid, Radio, RadioGroup, Tooltip } from '@mui/material';
import Dashboard from '@/app/components/Dashboard/Dashboard';


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

    console.log(userData)

    return (
        <>
            <Grid container>
                <Grid xs={2}>
                    <Dashboard />
                </Grid>
                <Grid xs={10}>
                    <div className='container'>
                        <div className='wrapper'>
                            <h1>new form for specification in progresss</h1>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
