export interface CreateRexDto {
	answer1: string;
	answer2: string;
	answer3: string;
}
export interface RexDto extends CreateRexDto {
	id: string;
}

export interface UpdateRexDto extends Partial<RexDto> {}
