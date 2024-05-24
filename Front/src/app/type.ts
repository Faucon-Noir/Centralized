import { Theme } from '@mui/material'

export type UseDataProps = {
	theme: Theme
}

export type NavItemProps = {
	id: string
	icon: React.ReactNode
	name: string
	alias: string
	url: string
}[]
