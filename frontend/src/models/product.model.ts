import axios from "axios"

class ProductModel {
  static all = async () => {
    const response = await axios.get(`https://api.pro.coinbase.com/products`)
    const data = response.data
    return data
  }
}

export default ProductModel
