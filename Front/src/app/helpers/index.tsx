import { Chip } from "@mui/material"
import { jwtDecode } from "jwt-decode"
import { addMonths, addWeeks, format, getISOWeekYear, startOfISOWeek } from 'date-fns';

export function gradeToString(grade: number): string {
	let teamRole: string
	switch (grade) {
		case 1:
			teamRole = 'Chef de projet'
			break
		case 2:
			teamRole = 'Architecte'
			break
		case 3:
			teamRole = 'Développeur'
			break
		case 0:
		default:
			teamRole = 'Spectateur'
			break
	}
	return teamRole
}

export function urgenceIdToString(urgenceId: number): string {
	let urgenceLevel: string = ''
	switch (urgenceId) {
		case 1:
			urgenceLevel = 'Faible'
			break
		case 2:
			urgenceLevel = 'Moyenne'
			break
		case 3:
			urgenceLevel = 'Haute'
			break
		case 4:
			urgenceLevel = 'Très haute'
			break
		default:
		case 0:
			urgenceLevel = 'Inconnu'
			break
	}
	return urgenceLevel
}

export function chipVariant(urgenceId: number): JSX.Element {
	switch (urgenceId) {
		case 1:
			return <Chip color="success" size='small' label={urgenceIdToString(1)} />
		case 2:
			return <Chip color="info" size='small' label={urgenceIdToString(2)} />
		case 3:
			return <Chip color="warning" size='small' label={urgenceIdToString(3)} />
		case 4:
			return <Chip color="error" size='small' label={urgenceIdToString(4)} />
		default:
		case 0:
			return <Chip size='small' label={urgenceIdToString(0)} />
	}
}

export function numberToColorRex(status: boolean): string {
	let colorName: string = ''
	switch (status) {
		case false:
			colorName = 'white'
			break
		case true:
			colorName = '#E0E0E0'
			break
		default:
			colorName = 'white'
			break
	}
	return colorName
}

export function numberToColorRexButton(status: boolean): string {
	let colorName: string = ''
	switch (status) {
		case false:
			colorName = '#0293FC'
			break
		case true:
			colorName = '#8C8C8C'
			break
		default:
			colorName = '#0293FC'
			break
	}
	return colorName
}

export function numberToColorTicket(num: number): string {
	let colorName: string = ''
	switch (num) {
		case 0:
			colorName = 'white'
			break
		case 1:
			colorName = '#67AE5E'
			break
		case 2:
			colorName = '#79A9FF'
			break
		case 3:
			colorName = '#FEA25F'
			break
		case 4:
			colorName = '#F98B8E'
			break
		default:
			colorName = 'white'
			break
	}
	return colorName
}

export function numberToColorTicketBorder(num: number): string {
	let colorName: string = ''
	switch (num) {
		case 0:
			colorName = 'white'
			break
		case 1:
			colorName = '#528b4b'
			break
		case 2:
			colorName = '#6087cc'
			break
		case 3:
			colorName = '#cb814c'
			break
		case 4:
			colorName = '#c76f71'
			break
		default:
			colorName = 'white'
			break
	}
	return colorName
}

export function numberToColor(num: number): string {
	let colorName: string = ''
	switch (num % 10) {
		case 0:
			colorName = '#FB2C39'
			break
		case 2:
			colorName = '#8BC729'
			break
		case 3:
			colorName = '#FAC602'
			break
		case 4:
			colorName = '#8129C7'
			break
		case 5:
			colorName = '#0A122A'
			break
		case 6:
			colorName = '#698F3F'
			break
		case 7:
			colorName = '#074F57'
			break
		case 8:
			colorName = '#9ECE9A'
			break
		case 9:
			colorName = '#9AD1D4'
			break
		case 10:
			colorName = '#CCDBDC'
			break
		case 1:
		default:
			colorName = '#0293FC'
			break
	}
	return colorName
}

export function GenerateDataWeekTicket(tickets: any) {
	const labels = Array.from({ length: 9 }, (_, i) => format(startOfISOWeek(addWeeks(new Date(), i - 4)), 'dd/MM/yyyy'));
	const data = Array.from({ length: 9 }, (_, i) => 0);
	for (let ticket of tickets) {
		if (ticket.status != 'résolu') {
			const FindElement = (element: any) => element == format(startOfISOWeek(new Date(ticket.end_date)), 'dd/MM/yyyy');
			const index = labels.findIndex(FindElement);
			if (index != -1) {
				data[index]++;
			}
		}
	}
	return { week: labels, nbr_ticket: data }
}

export function findNumberTicketByUserName(name: string, tickets: any) {
	for (let userDetail of tickets) {
		if (name == userDetail.userName) {
			return userDetail.nbr_ticket;
		}
	}
	return 0;
}

export function numberToArrayColor(num: number): Array<string> {
	let colorName: Array<string> = ['#FB2C39', '#8BC729', '#FAC602', '#8129C7', '#0A122A', '#698F3F', '#074F57', '#9ECE9A', '#9AD1D4', '#CCDBDC', '#0293FC']
	colorName.splice(0, 11 - num)
	return colorName
}
