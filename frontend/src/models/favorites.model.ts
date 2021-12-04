import axios from "axios"
import { IFavorite } from "../interfaces/IFavorite"

class FavoriteModel {
  static all = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static show = async (id: number) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static create = async (data: IFavorite) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}`,
        data
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  static update = async (id: number, note: string) => {
    try {
      const slug = note
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/${id}`,
        slug
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  static delete = async (id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/${id}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default FavoriteModel
