export const formatData = (data: any) => {
  let finalData = {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255,99,132,0.2)",
        fill: false,
      },
    ],
  }

  let dates = data.map((val: any) => {
    const timeStamp: number = val[0]
    let date: Date = new Date(timeStamp * 1000)
    let day: number = date.getDate()
    let month: number = date.getMonth() + 1
    let year: number = date.getFullYear()

    let final = `${month}-${day}-${year}`
    return final
  })

  let priceArr = data.map((val: any) => {
    return val[4]
  })

  priceArr.reverse()

  dates.reverse()

  finalData.labels = dates

  finalData.datasets[0].data = priceArr

  return finalData
}
