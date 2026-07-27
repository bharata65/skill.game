import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { createElement } from '../utils/helpers.js';
import { ROUTES } from '../config/constants.js';

class NotFound {
  async render() {
    const container = createElement('div', 'not-found-container');
    
    const header = new Header();
    container.appendChild(await header.render());

    const main = createElement('main', 'flex-col flex-center py-3xl');
    main.innerHTML = `
      <div class="container text-center">
        <h1 class="text-3xl text-bold mb-lg">404 - Page Not Found</h1>
        <p class="text-lg text-muted mb-2xl">The page you're looking for doesn't exist.</p>
        <a href="${ROUTES.DASHBOARD}" class="btn btn-primary">Back to Dashboard</a>
      </div>
    `;
    container.appendChild(main);

    const footer = new Footer();
    container.appendChild(footer.render());

    return container;
  }
}

export default NotFound;
