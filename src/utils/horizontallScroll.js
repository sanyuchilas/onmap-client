export default  function(id) {
  try {
    document.getElementById(id).addEventListener('wheel', event => {
      let option = event.target.id !== id ? event.target.parentNode : event.target
      if ((event.wheelDelta || event.detail) > 0)
        option.scrollLeft -= 10
      else
        option.scrollLeft += 10
      return false
    })
  } catch(e) {}
}