import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Notification from '../components/Notification.js';
import { createElement, addEventListener } from '../utils/helpers.js';
import { login } from '../services/auth.js';
import { validateForm } from '../utils/validator.js';
import { ROUTES, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants.js';
import router from '../utils/router.js';

class Login {
  async render() {
    const container = createElement('div', 'login-container');
    
    const header = new Header();
    container.appendChild(await header.render());

    const main = createElement('main', 'flex-col flex-center py-3xl');
    const card = createElement('div', 'card');
    card.style.maxWidth = '400px';
    card.style.width = '100%';

    card.innerHTML = `
      <div class="card-header">
        <h2 class="card-title">Login</h2>
      </div>
      <form class="login-form">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" name="email" placeholder="your@email.com" required>
          <span class="form-error hidden" id="error-email"></span>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" name="password" placeholder="••••••••" required>
          <span class="form-error hidden" id="error-password"></span>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Sign In</button>
      </form>
      <div class="mt-lg text-center">
        <p class="text-muted mb-md">Don't have an account? <a href="${ROUTES.REGISTER}">Register</a></p>
        <p class="text-muted"><a href="${ROUTES.FORGOT_PASSWORD}">Forgot password?</a></p>
      </div>
    `;

    const form = card.querySelector('.login-form');
    addEventListener(form, 'submit', async (e) => {
      e.preventDefault();
      await this.handleLogin(form);
    });

    main.appendChild(card);
    container.appendChild(main);

    const footer = new Footer();
    container.appendChild(footer.render());

    return container;
  }

  async handleLogin(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const errors = validateForm(data, {
      email: { required: true, type: 'email' },
      password: { required: true, type: 'password' }
    });

    if (Object.keys(errors).length > 0) {
      this.displayErrors(form, errors);
      return;
    }

    try {
      await login(data.email, data.password);
      Notification.success(SUCCESS_MESSAGES.LOGIN_SUCCESS);
      router.navigateTo(ROUTES.DASHBOARD);
    } catch (error) {
      Notification.error(ERROR_MESSAGES.GENERIC);
    }
  }

  displayErrors(form, errors) {
    for (const [field, message] of Object.entries(errors)) {
      const errorElement = form.querySelector(`#error-${field}`);
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
      }
    }
  }
}

export default Login;
