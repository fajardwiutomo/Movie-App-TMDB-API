import axios from "axios"

export const getVideo = async (req, res, next) => {
    const {id} = req.query
    const API = process.env.API_KEY
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API}&language=en-US`
        )
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
        next(error)
    }
}
