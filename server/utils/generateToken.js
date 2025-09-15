import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'

export const generateToken =  (id, role) => {
   return  jwt.sign({id, role},
    JWT_SECRET,
    {
        expiresIn: JWT_EXPIRES_IN
    }
  )

};