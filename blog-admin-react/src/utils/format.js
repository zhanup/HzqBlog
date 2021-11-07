export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


export function formateDate(time) {
  if (!time) return ''
  let date = new Date(time)
  return date.getFullYear() + '-' + (formatNumber(date.getMonth() + 1)) + '-' + formatNumber(date.getDate())
    + '  ' + formatNumber(date.getHours()) + ':' + formatNumber(date.getMinutes()) + ':' + formatNumber(date.getSeconds())
}
