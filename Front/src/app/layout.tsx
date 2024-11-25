import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Grid from '@mui/material/Unstable_Grid2';
import PermanentDrawerLeft from './components/PermanentDrawerLeft';
// import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Centralized',
	description: 'The brand new management tech project webapp',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='fr'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
