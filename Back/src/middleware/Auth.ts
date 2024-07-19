import * as jwt from "jsonwebtoken";

export const CheckAuth = function (req, res, next) {
	try {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(" ")[1];
			jwt.verify(
				token,
				process.env.SEC_KEY as string,
				(err: any, user: any) => {
					if (err) return res.sendStatus(403);

					req.user = user;

					next();
				}
			);
		} else {
			return res.sendStatus(401).json("Please Login");
		}
	} catch (error) {
		return { error: "Unauthorized" };
	}
};
