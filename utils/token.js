


import jwt from "jsonwebtoken"

// Token generate karne ke liye
export const getToken = (user) => {
  try{
      const token = jwt.sign(
        {userId: user}, process.env.JWT_SECRET,{expiresIn: "7d"}
  )
  console.log(token)
  return token
}catch(error){
   console.log(error)
}
} 


// // Token verify karne ke liye
// const verifyToken = (token) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     return decoded
//   } catch (error) {
//     return null
//   }
// }

// module.exports = {
//   generateToken,
//   verifyToken,
// }