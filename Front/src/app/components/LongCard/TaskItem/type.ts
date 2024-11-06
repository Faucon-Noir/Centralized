export type TaskItemProps = {
	id: string;
	title: string;
	urgenceLevel: number;
	date: string;
	status: string;
	onOpen: () => void;
	onArchive: () => void;
	onRedirect: () => void;
};
