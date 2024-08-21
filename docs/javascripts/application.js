document.querySelectorAll("code[data-url]").forEach(function (element) {
  const url = element.getAttribute("data-url")
  fetch(url)
    .then(function (resp) {
      return resp.json()
    })
    .then(function (data) {
      element.innerHTML = `/* ${url} */\n${JSON.stringify(data, undefined, 2)}`
    })
})
