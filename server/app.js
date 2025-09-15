import express from 'express'
import cors from 'cors'
import dashboardRoutes from './routes/dashboard.routes.js'
import userRoutes from './routes/auth.routes.js'
import studentRoutes from './routes/student.routes.js'
import teacherRoutes from './routes/teacher.routes.js'
const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/auth", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teacher', teacherRoutes);

export {app}