import { getCurrentUser, logout } from '../services/auth.js';
import { createElement, addEventListener, removeClass, addClass } from '../utils/helpers.js';
import router from '../utils/router.js';
import { ROUTES } from '../config/constants.js';

class Header {
  constructor() {
    this.user = getCurrentUser();
  }

  async render() {
    const header = createElement('header', 'header');
    
    const headerContent = createElement('div', 'header-content flex flex-between container');
    headerContent.innerHTML = `
      <div class="header-logo">
        <h1 class="text-2xl text-bold">SKILL GAME</h1>
      </div>
      <nav class="header-nav hidden-mobile">
        <ul class="nav-list flex gap-lg">
          ${this.user ? `
            <li><a href="${ROUTES.DASHBOARD}">Dashboard</a></li>
            <li><a href="${ROUTES.CONTEST_LIST}">Contests</a></li>
            <li><a href="${ROUTES.WALLET}">Wallet</a></li>
            <li><a href="${ROUTES.PROFILE}">Profile</a></li>
          ` : ''}
        </ul>
      </nav>
      <div class="header-actions flex gap-md">
        ${this.user ? `
          <button class="btn btn-ghost" id="notificationBtn">
            🔔
          </button>
          <button class="btn btn-ghost" id="logoutBtn">
            Logout
          </button>
        ` : `
          <a href="${ROUTES.LOGIN}" class="btn btn-primary">Login</a>
          <a href="${ROUTES.REGISTER}" class="btn btn-secondary hidden-mobile">Register</a>
        `}
      </div>
    `;

    header.appendChild(headerContent);

    if (this.user) {
      const logoutBtn = header.querySelector('#logoutBtn');
      addEventListener(logoutBtn, 'click', async () => {
        await logout();
        router.navigateTo(ROUTES.LOGIN);
      });
    }

    return header;
  }
}

export default Header;
