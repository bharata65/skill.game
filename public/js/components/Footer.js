import { createElement } from '../utils/helpers.js';

class Footer {
  render() {
    const footer = createElement('footer', 'footer mt-lg');
    
    const footerContent = createElement('div', 'footer-content container py-md');
    footerContent.innerHTML = `
      <div class="grid grid-cols-1">
        <div class="text-center">
          <p class="text-muted mb-md">&copy; 2024 SKILL GAME. All rights reserved.</p>
          <div class="footer-links flex flex-center gap-lg">
            <a href="#" class="text-muted">Privacy Policy</a>
            <a href="#" class="text-muted">Terms of Service</a>
            <a href="#" class="text-muted">Contact Us</a>
          </div>
        </div>
      </div>
    `;

    footer.appendChild(footerContent);
    return footer;
  }
}

export default Footer;
