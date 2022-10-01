import axios from "axios"

export const Trending = async(req, res, next) => {
    const API = process.env.API_KEY
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${API}`
        )
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
        next(error)
    }
}
