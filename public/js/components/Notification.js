import { createElement, addClass, removeClass } from '../utils/helpers.js';

class Notification {
  static show(message, type = 'info', duration = 3000) {
    const notificationRoot = document.getElementById('notification-root');
    const notification = createElement('div', `notification notification-${type}`);
    
    notification.innerHTML = `
      <div class="notification-content flex gap-md">
        <span class="notification-icon">${this.getIcon(type)}</span>
        <p class="notification-message">${message}</p>
      </div>
    `;

    notificationRoot.appendChild(notification);

    setTimeout(() => {
      addClass(notification, 'notification-exit');
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }

  static success(message, duration = 3000) {
    this.show(message, 'success', duration);
  }

  static error(message, duration = 3000) {
    this.show(message, 'error', duration);
  }

  static warning(message, duration = 3000) {
    this.show(message, 'warning', duration);
  }

  static info(message, duration = 3000) {
    this.show(message, 'info', duration);
  }

  static getIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '!',
      info: 'ℹ'
    };
    return icons[type] || icons.info;
  }
}

export default Notification;
