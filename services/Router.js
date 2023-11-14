const Router = {
  init: () => {
    document.querySelectorAll("a").forEach((link) => {
      console.log(link.parentElement.parentElement.children[0].firstChild);
      link.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(link);
        const href = link.getAttribute("href");
        Router.go(href);
      });
    });

    Router.go(location.pathname);

    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
  },
  go: (route, addToHistory = true) => {
    console.log(route);

    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("personal-info");
        break;
      case "/plan":
        pageElement = document.createElement("plan-plan");
        break;
      case "/add-ons":
        pageElement = document.createElement("add-on");
        break;
      case "/summary":
        pageElement = document.createElement("summary-summary");
        break;
    }
    if (pageElement) {
      document.querySelector("div#inputpages").innerHTML = "";
      document.querySelector("div#inputpages").appendChild(pageElement);
    }
  },
};

export default Router;
