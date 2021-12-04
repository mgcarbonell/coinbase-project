import axios from "axios"
import IPairs from "../interfaces/IPairs"

class ProductModel {
  static all = async () => {
    let pairs: IPairs
    const response = await axios.get(`https://api.pro.coinbase.com/products`)
    const data = response.data
    pairs = data
    return pairs
  }
}

export default ProductModel
