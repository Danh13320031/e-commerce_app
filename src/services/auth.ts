// ** Axios
import axios from 'axios'

// ** Configs
import { CONFIG_API } from 'src/configs/api'

// ** Types
import { TloginAuth } from 'src/types/auth'

export const loginAuth = async (data: TloginAuth) => {
  try {
    const res = await axios.post(CONFIG_API.AUTH.INDEX, data)

    return res.data
  } catch (error) {
    return null
  }
}
