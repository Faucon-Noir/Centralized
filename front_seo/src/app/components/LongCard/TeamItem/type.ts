export type TeamListItemProps = {
	id: string
	avatar?: string
	name: string
	onOpen: () => void
	onDelete?: () => void
}
