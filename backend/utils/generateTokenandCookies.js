import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateTokensAndSetCookies = (res, userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    }); // 1 hour

    
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return { accessToken, refreshToken };
}