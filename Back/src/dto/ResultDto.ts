export interface ErrorDto {
	error: Error;
	success?: undefined;
}

export interface SuccessDto {
	success: string;
	error?: undefined;
}

export interface SuccessAuthDto extends SuccessDto {
	token: string;
}

export interface ErrorAuthDto extends ErrorDto {
	token?: undefined;
}
