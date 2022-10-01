import axios from "axios"

export const getGenre = async (req, res, next) => {
    const API = process.env.API_KEY
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API}&language=en-US`
        )
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
        next(error)
    }
}
