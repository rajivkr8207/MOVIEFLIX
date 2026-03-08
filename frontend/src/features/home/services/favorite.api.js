import api from "../../../lib/api/axios";


export const addFavorite =  async (id)=>{
   const res = await api.post(`/favorites/${id}`)
   return res.data
} 
export const removeFavorite =  async (id)=>{
   const res = await api.delete(`/favorites/${id}`)
   return res.data
} 