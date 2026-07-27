import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { createElement } from '../utils/helpers.js';
import { getCurrentUser } from '../services/auth.js';
import { getUserProfile } from '../services/auth.js';
import { getContests } from '../services/contest.js';
import { getWalletBalance } from '../services/wallet.js';
import { formatCurrency } from '../utils/datetime.js';
import { ROUTES, CONTEST_STATUS } from '../config/constants.js';

class Dashboard {
  async render() {
    const container = createElement('div', 'dashboard-container');
    
    const header = new Header();
    container.appendChild(await header.render());

    const user = getCurrentUser();
    const userProfile = user ? await getUserProfile(user.uid) : null;
    const walletBalance = user ? await getWalletBalance(user.uid) : 0;
    const contests = await getContests({ status: CONTEST_STATUS.UPCOMING });

    const main = createElement('main', 'flex-col gap-2xl py-2xl');

    const dashboardContent = createElement('div', 'container');
    dashboardContent.innerHTML = `
      <div class="grid grid-cols-1">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Welcome, ${userProfile?.displayName || 'User'}!</h2>
          </div>
          <div class="grid grid-cols-3 gap-lg">
            <div class="card text-center">
              <p class="text-muted">Wallet Balance</p>
              <p class="text-2xl text-bold text-primary">${formatCurrency(walletBalance)}</p>
            </div>
            <div class="card text-center">
              <p class="text-muted">Contests Joined</p>
              <p class="text-2xl text-bold">0</p>
            </div>
            <div class="card text-center">
              <p class="text-muted">Total Winnings</p>
              <p class="text-2xl text-bold text-success">₹0</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header flex flex-between">
          <h3 class="card-title">Upcoming Contests</h3>
          <a href="${ROUTES.CONTEST_LIST}" class="btn btn-sm btn-ghost">View All</a>
        </div>
        <div class="grid grid-cols-1 gap-lg">
          ${contests.slice(0, 3).map(contest => `
            <div class="flex flex-between p-lg" style="background: var(--color-secondary); border-radius: var(--radius-lg);">
              <div>
                <p class="text-semibold">${contest.name}</p>
                <p class="text-muted">Entry Fee: ${formatCurrency(contest.entryFee)}</p>
              </div>
              <a href="${ROUTES.CONTEST_LIST}" class="btn btn-sm btn-primary">Join</a>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    main.appendChild(dashboardContent);
    container.appendChild(main);

    const footer = new Footer();
    container.appendChild(footer.render());

    return container;
  }
}

export default Dashboard;
