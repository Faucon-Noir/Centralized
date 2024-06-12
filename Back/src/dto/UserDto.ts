export interface CommonUserDto {
	lastname: string;
	firstname: string;
	mail: string;
	phone: string;
}

// GET USER
export interface UserDto extends CommonUserDto {
	id: string;
	avatar: string;
	phone: string;
	bio: string;
}

// CREATE USER
export interface CreateUserDto extends CommonUserDto {
	password: string;
}

// UPDATE USER
export interface UpdateUserDto extends Partial<UserDto> {}

// LOGIN USER
export interface LoginUserDto {
	mail: string;
	password: string;
	// token: string;
}
