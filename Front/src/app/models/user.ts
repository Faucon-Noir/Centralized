import { Common } from './common';

type CommonUser = Common & {
	lastname: string;
	firstname: string;
	mail: string;
	phone: string;
};
export type User = CommonUser & {
	avatar: string;
	bio: string;
};

export type UpdateUser = Partial<User>;
