import React from "react"
import { Line } from "react-chartjs-2"

interface IOptions {
  tooltips: {
    intersect: boolean
    mode: string
  }
  responsive: boolean
  maintainAspectRatio: boolean
}

const Dash = ({ string: price, data }) => {
  const options: IOptions = {
    tooltips: {
      intersect: false,
      mode: "index",
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  if (price === "0.00") {
    return <h2>No currency select</h2>
  }
  return (
    <div className="dashboard">
      <h2>{`$${price}`}</h2>

      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default Dash
