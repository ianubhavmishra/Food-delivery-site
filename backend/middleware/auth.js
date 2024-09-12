import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        res.json({ success: false, message: "Not authorized please login again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id;
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Not authorized please login again" });
    }
    next();
}

export default authMiddleware; 