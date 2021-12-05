import axios from "axios"

class CurrencyModel {
  static all = async () => {
    const response = await axios.get(`${process.env.REACT_APP_CURRENCY_API}`)
    return response.data
  }

  static show = async (data: any) => {
    const response = await axios.get(
      `${process.env.REACT_APP_CURRENCY_API}`,
      data
    )
    return response.data
  }
}

export default CurrencyModel
