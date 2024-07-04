import { json } from "body-parser";
import * as jwt from "jsonwebtoken";
import { env } from "process";

export const CheckAuth = function (req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (token == null || token == undefined)
			return res.sendStatus(401).json("Please Login");

		jwt.verify(
			token,
			process.env.SEC_KEY as string,
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
