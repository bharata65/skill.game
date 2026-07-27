import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { createElement } from '../utils/helpers.js';
import { ROUTES } from '../config/constants.js';

class Welcome {
  async render() {
    const container = createElement('div', 'welcome-container');
    
    const header = new Header();
    container.appendChild(await header.render());

    const main = createElement('main', 'flex-col flex-center gap-3xl py-3xl');
    main.innerHTML = `
      <div class="container text-center">
        <h1 class="text-3xl text-bold mb-lg">Welcome to SKILL GAME</h1>
        <p class="text-lg text-muted mb-3xl">Premium platform for skill-based contests and puzzles</p>
        <div class="flex gap-lg flex-center flex-wrap">
          <a href="${ROUTES.LOGIN}" class="btn btn-primary btn-lg">Login</a>
          <a href="${ROUTES.REGISTER}" class="btn btn-outline btn-lg">Register</a>
        </div>
      </div>
    `;
    container.appendChild(main);

    const footer = new Footer();
    container.appendChild(footer.render());

    return container;
  }
}

export default Welcome;
