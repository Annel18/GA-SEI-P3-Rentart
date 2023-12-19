// Loader for individual art page
import axios from "axios"

export async function getIndUser(userId) {
      const res = await axios.get(`/api/profile/${userId}`)
      // console.log(res.data)
      return res.data
  }
