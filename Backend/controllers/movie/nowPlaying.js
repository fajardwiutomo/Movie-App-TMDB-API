import axios from "axios"

export const getNowPlaying = async(req, res, next) => {
    const API = process.env.API_KEY
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API}&language=en-US&page=1`
        )
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
        next(error)
    }
}
