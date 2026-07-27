import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Notification from '../components/Notification.js';
import { createElement, addEventListener } from '../utils/helpers.js';
import { register } from '../services/auth.js';
import { validateForm } from '../utils/validator.js';
import { ROUTES, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants.js';
import router from '../utils/router.js';

class Register {
  async render() {
    const container = createElement('div', 'register-container');
    
    const header = new Header();
    container.appendChild(await header.render());

    const main = createElement('main', 'flex-col flex-center py-3xl');
    const card = createElement('div', 'card');
    card.style.maxWidth = '400px';
    card.style.width = '100%';

    card.innerHTML = `
      <div class="card-header">
        <h2 class="card-title">Create Account</h2>
      </div>
      <form class="register-form">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" name="displayName" placeholder="Your Full Name" required>
          <span class="form-error hidden" id="error-displayName"></span>
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" name="email" placeholder="your@email.com" required>
          <span class="form-error hidden" id="error-email"></span>
        </div>
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input type="tel" class="form-input" name="phone" placeholder="10-digit phone number" required>
          <span class="form-error hidden" id="error-phone"></span>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" name="password" placeholder="••••••••" required>
          <span class="form-error hidden" id="error-password"></span>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Create Account</button>
      </form>
      <div class="mt-lg text-center">
        <p class="text-muted">Already have an account? <a href="${ROUTES.LOGIN}">Login</a></p>
      </div>
    `;

    const form = card.querySelector('.register-form');
    addEventListener(form, 'submit', async (e) => {
      e.preventDefault();
      await this.handleRegister(form);
    });

    main.appendChild(card);
    container.appendChild(main);

    const footer = new Footer();
    container.appendChild(footer.render());

    return container;
  }

  async handleRegister(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const errors = validateForm(data, {
      displayName: { required: true, minLength: 2 },
      email: { required: true, type: 'email' },
      phone: { required: true, type: 'phone' },
      password: { required: true, type: 'password' }
    });

    if (Object.keys(errors).length > 0) {
      this.displayErrors(form, errors);
      return;
    }

    try {
      await register(data.email, data.password, {
        displayName: data.displayName,
        phone: data.phone
      });
      Notification.success(SUCCESS_MESSAGES.REGISTRATION_SUCCESS);
      router.navigateTo(ROUTES.LOGIN);
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

export default Register;
