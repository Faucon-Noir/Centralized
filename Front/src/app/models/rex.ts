import { Common } from './common';

export type CreateRex = {
	project?: string;
	answer1: string;
	answer2: string;
	answer3: string;
};
export type Rex = Common & CreateRex;
export type UpdateRex = Partial<Rex>;
