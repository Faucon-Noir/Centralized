import * as jwt from "jsonwebtoken";

export const CheckAuth = function (req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (token == null || token == undefined)
			return res.sendStatus(401).json("Please Login");

		jwt.verify(
			token,
			"bc042227-9f88-414d" as string,
			(err: any, user: any) => {
				if (err) return res.sendStatus(403);

				req.user = user;

				next();
			}
		);
	} catch (error) {
		return { error: "Unauthorized" };
	}
};
