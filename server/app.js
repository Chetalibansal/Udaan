import express from 'express'
import cors from 'cors'
import dashboardRoutes from './routes/dashboard.routes.js'
import router from './routes/auth.routes.js'

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/auth", router);
app.use("/api/dashboard", dashboardRoutes);


export {app}