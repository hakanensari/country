document.querySelectorAll(".window").forEach(function (element) {
	const url = element.querySelector(".address").innerText
	fetch(url)
		.then(function (resp) {
			return resp.json()
		})
		.then(function (data) {
			const content = element.querySelector(".content")
			content.innerHTML = JSON.stringify(data, undefined, 2)
		})
})
