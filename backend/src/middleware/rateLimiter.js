import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit(req.ip) // Using IP address as key for better rate limiting

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later"
            })
        }

        next()
    } catch (error) {
        console.error(`Rate Limit Error: ${error}`)
        return res.status(500).json({
            message: "Error in rate limiting"
        })
    }
}

export default rateLimiter