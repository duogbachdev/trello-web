// Sort Columns/Cards
export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []
  return [...originalArray].sort((a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]))
//   const clonedArray = [...originalArray]
//   const orderedArray = clonedArray.sort((a, b) => {
//     return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
//   })
//   return orderedArray
}