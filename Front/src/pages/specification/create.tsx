'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import './create.scss';
import UserData from '@/utils/User/UserData';
import { Grid } from '@mui/material';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import SpecificationForm from '@/app/components/Form/specificationForm';
import { TaskProvider, useTask } from "../../app/contexts/isReq"; // Importation du contexte

export default function CreateSpecification({ userData }: any) {
    return (
        <>
            <div className='container'>
                <div className='wrapper'>
                    <SpecificationForm userData={userData} />
                </div>
            </div>

        </>
    );
}
