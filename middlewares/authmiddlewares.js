import JWT from "jsonwebtoken";

export const authmiddle = async (req, res, next) => {
    try {
        // Get token from headers
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Authorization header missing"
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Token missing"
            });
        }

        // Verify token
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized user"
                });
            } else {
                req.body.id = decode._id; // assuming the decoded token contains `_id`
                next();
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in auth middleware",
            error,
        });
    }
};
