import { ROUTES } from '../config/constants.js';
import { getCurrentUser } from '../services/auth.js';

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.previousRoute = null;
    this.middlewares = [];
  }

  register(path, component, options = {}) {
    this.routes.set(path, { component, options });
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  async navigateTo(path, params = {}) {
    this.previousRoute = this.currentRoute;
    this.currentRoute = { path, params };

    for (const middleware of this.middlewares) {
      const result = await middleware(path, params);
      if (!result) {
        this.currentRoute = this.previousRoute;
        return false;
      }
    }

    window.history.pushState(null, '', path);
    await this.render(path, params);
    return true;
  }

  async render(path, params = {}) {
    const route = this.routes.get(path);
    if (!route) {
      this.navigateTo(ROUTES.NOT_FOUND);
      return;
    }

    const { component } = route;
    const appRoot = document.getElementById('app-root');
    appRoot.innerHTML = '';
    
    const instance = new component(params);
    const element = await instance.render();
    appRoot.appendChild(element);
  }

  back() {
    if (this.previousRoute) {
      this.navigateTo(this.previousRoute.path, this.previousRoute.params);
    } else {
      window.history.back();
    }
  }
}

export default new Router();
