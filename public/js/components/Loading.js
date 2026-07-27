import { createElement } from '../utils/helpers.js';

class Loading {
  static show(message = 'Loading...') {
    const loadingContainer = createElement('div', 'loading-container fixed inset-0 flex flex-center');
    loadingContainer.style.zIndex = '10000';
    loadingContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    loadingContainer.innerHTML = `
      <div class="loading-content flex flex-col flex-center gap-lg">
        <div class="spinner-lg"></div>
        <p class="text-white">${message}</p>
      </div>
    `;
    document.body.appendChild(loadingContainer);
    return loadingContainer;
  }

  static hide() {
    const container = document.querySelector('.loading-container');
    if (container) container.remove();
  }
}

export default Loading;
