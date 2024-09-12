export type ProjectViewType = {
	color: number
	event: {
		end: Date
		start: Date
		title: string
	}
	finished: boolean
	id: string
	name: string
}
export const ModalContentStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '400px',
	maxWidth: '750px',
	minHeight: '300px',
	backgroundColor: 'white',
	padding: '30px',
	borderRadius: '10px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
}