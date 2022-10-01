import axios from "axios"

export const searchMovie = async (req, res, next) => {
    const {title} = req.query
    const API = process.env.API_KEY
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API}&language=en-US&query=${title}&page=1&include_adult=false`
        )
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
        next(error)
    }
}
