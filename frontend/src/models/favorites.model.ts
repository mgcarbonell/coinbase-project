import axios from "axios"

class FavoriteModel {
  static all = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_FAVORITE_API}`)
      return await response.data
    } catch (error) {
      throw error
    }
  }

  static show = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_FAVORITE_API}/${id}`
      )
      return await response.data
    } catch (error) {
      throw error
    }
  }

  static create = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FAVORITE_API}`,
        data
      )
      return await response.data
    } catch (error) {
      throw error
    }
  }

  static update = async (id: number, note: string) => {
    try {
      const slug = note
      const response = await axios.put(
        `${process.env.REACT_APP_FAVORITE_API}/${id}`,
        slug
      )
      return await response.data
    } catch (error) {
      throw error
    }
  }

  static delete = async (id: number) => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_FAVORITE_API + "/" + id
      )
      return await response.data
    } catch (error) {
      throw error
    }
  }
}

export default FavoriteModel
