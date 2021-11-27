/**
 * 将文本复制到粘贴板
 *
 * @param {String} content
 * @return {Boolean} rue: 复制成功; false: 复制失败
 */
export const copyToClipboard = content => {
  const clipboardData = window.clipboardData
  if (clipboardData) {
    clipboardData.clearData()
    clipboardData.setData('Text', content)
    return true
  } else if (document.execCommand) {
    const el = document.createElement('textarea')
    el.value = content
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    return true
  }
  return false
}
