class Router {
  constructor() {
    this.routes = {}
  }

  add(routeName, pageURL) {
    this.routes[routeName] = pageURL
  }

  route(event) {
    event.preventDefault()
    const pathname = event.target.pathname || "/"
    window.history.pushState({}, "", pathname)
    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    const apiUrl = "https://api-api-api-production.up.railway.app/" // URL da sua API
    const url = apiUrl + route // Montando a URL completa para a API

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch page")
        }
        return response.text()
      })
      .then((html) => {
        document.querySelector("#app").innerHTML = html
      })
      .catch((error) => {
        console.error("Error:", error)
        // Lidar com o erro de busca da página
      })
  }
}

export default Router
