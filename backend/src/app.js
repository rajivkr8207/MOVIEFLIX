import cookieParser from 'cookie-parser';
import express from 'express'
import authrouter from './routes/auth.route.js';
import MovieRouter from './routes/movie.route.js';
import cors from 'cors';
import morgan from 'morgan';
import handleError from './middleware/error.middleware.js';
import Adminrouter from './routes/admin.route.js';
import FavoriteRouter from './routes/favorite.route.js';
import HistoryRouter from './routes/history.route.js';
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static('./public/dist'))
app.use(cors({
    origin: ["http://localhost:5173", "https://movieflix-otti.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));


app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "OK",
        timestamp: new Date(),
        message: "server is running properly"
    });
});



app.use('/api/auth', authrouter)
app.use('/api/movie', MovieRouter)
app.use('/api/admin', Adminrouter)
app.use('/api/favorites', FavoriteRouter)
app.use('/api/history', HistoryRouter)


app.use(handleError)

export default app