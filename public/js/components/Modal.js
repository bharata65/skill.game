import { createElement, addEventListener } from '../utils/helpers.js';

class Modal {
  constructor(title, content, options = {}) {
    this.title = title;
    this.content = content;
    this.options = {
      size: 'md',
      closeable: true,
      onClose: null,
      actions: []
    };
    Object.assign(this.options, options);
  }

  render() {
    const container = createElement('div', 'modal-container');
    
    const backdrop = createElement('div', 'modal-backdrop');
    addEventListener(backdrop, 'click', () => this.close());
    
    const modal = createElement('div', 'modal');
    
    const modalContent = createElement('div', 'modal-content');
    
    const header = createElement('div', 'modal-header flex flex-between mb-lg');
    header.innerHTML = `
      <h2 class="text-xl text-bold">${this.title}</h2>
      ${this.options.closeable ? '<button class="btn btn-ghost" id="closeBtn">✕</button>' : ''}
    `;
    
    const body = createElement('div', 'modal-body mb-lg');
    if (typeof this.content === 'string') {
      body.innerHTML = this.content;
    } else {
      body.appendChild(this.content);
    }
    
    let footer = null;
    if (this.options.actions.length > 0) {
      footer = createElement('div', 'modal-footer flex gap-md');
      this.options.actions.forEach(action => {
        const btn = createElement('button', `btn btn-${action.type || 'primary'}`);
        btn.textContent = action.label;
        addEventListener(btn, 'click', () => {
          if (action.onClick) action.onClick();
          this.close();
        });
        footer.appendChild(btn);
      });
    }
    
    modalContent.appendChild(header);
    modalContent.appendChild(body);
    if (footer) modalContent.appendChild(footer);
    
    modal.appendChild(modalContent);
    container.appendChild(backdrop);
    container.appendChild(modal);
    
    if (this.options.closeable) {
      const closeBtn = modalContent.querySelector('#closeBtn');
      addEventListener(closeBtn, 'click', () => this.close());
    }
    
    this.element = container;
    return container;
  }

  show() {
    const modalRoot = document.getElementById('modal-root');
    const element = this.render();
    modalRoot.appendChild(element);
  }

  close() {
    if (this.element) this.element.remove();
    if (this.options.onClose) this.options.onClose();
  }
}

export default Modal;
