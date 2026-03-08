import { createMovie, getMovieUpdate, MovieDelete } from "../services/admin.api"
import { toast } from 'react-toastify'
const useMovie = () => {

  const handlecreateMovie = async (data) => {
    try {
      const res = await createMovie(data)
      toast.success(res.message)
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditmovie = async (id, data) => {
    try {
      const res = await getMovieUpdate(id,data)
      toast.success(res.message)
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteMovie = async(id)=>{
    try {
      const res = await MovieDelete(id)
      toast.success(res.message)
    } catch (error) {
      console.error(error);
    }
  }
  return { handlecreateMovie,handleEditmovie ,handleDeleteMovie}
}

export default useMovie