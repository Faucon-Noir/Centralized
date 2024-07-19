export type Login = {
	mail: string;
	password: string;
};

export type Register = Login & {
	lastname: string;
	firstname: string;
	phone: string;
};
