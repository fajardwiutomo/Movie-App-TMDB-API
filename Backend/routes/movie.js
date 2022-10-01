import express from "express"
import { getCast } from "../controllers/movie/getCast.js"
import { getGenre } from "../controllers/movie/getGenre.js"
import { getVideo } from "../controllers/movie/getVideo.js"
import { getNowPlaying } from "../controllers/movie/nowPlaying.js"
import { searchMovie } from "../controllers/movie/searchMovie.js"
import { Trending } from "../controllers/movie/trending.js"

const router = express.Router()

router.get("/now-playing", getNowPlaying)
router.get("/trending", Trending)
router.get("/video", getVideo)
router.get("/genre", getGenre)
router.get('/cast', getCast)
router.get("/searchMovie",searchMovie )

export default router