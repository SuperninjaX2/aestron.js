//our framework 
class DomManipulator {
  constructor(selector) {
    if (typeof selector === 'string') {
      this.elements = Array.from(document.querySelectorAll(selector));
    } else if (selector instanceof HTMLElement) {
      this.elements = [selector];
    } else if (Array.isArray(selector)) {
      this.elements = selector.filter(item => item instanceof HTMLElement);
    } else {
      throw new Error('Invalid selector');
    }
  }

  addClass(className) {
    this.elements.forEach(element => element.classList.add(className));
    return this;
  }

  removeClass(className) {
    this.elements.forEach(element => element.classList.remove(className));
    return this;
  }

  toggleClass(className) {
    this.elements.forEach(element => element.classList.toggle(className));
    return this;
  }

  text(value) {
    if (value !== undefined) {
      this.elements.forEach(element => element.textContent = value);
      return this;
    } else {
      return this.elements[0].textContent;
    }
  }

  html(value) {
    if (value !== undefined) {
      this.elements.forEach(element => element.innerHTML = value);
      return this;
    } else {
      return this.elements[0].innerHTML;
    }
  }

  on(event, callback) {
    this.elements.forEach(element => element.addEventListener(event, callback));
    return this;
  }

  off(event, callback) {
    this.elements.forEach(element => element.removeEventListener(event, callback));
    return this;
  }

  animate(animationName) {
    const animationClasses = {
      fadeIn: 'fade-in',
      fadeOut: 'fade-out',
      slideUp: 'slide-up',
      slideDown: 'slide-down',
      slideLeft: 'slide-left',
      slideRight: 'slide-right',
      zoomIn: 'zoom-in',
      zoomOut: 'zoom-out'
    };

    if (animationClasses[animationName]) {
      this.elements.forEach(element => element.classList.add(animationClasses[animationName]));
    } else {
      throw new Error(`Invalid animation name: ${animationName}`);
    }

    return this;
  }

  stopAnimation(animationName) {
    const animationClasses = {
      fadeIn: 'fade-in',
      fadeOut: 'fade-out',
      slideUp: 'slide-up',
      slideDown: 'slide-down',
      slideLeft: 'slide-left',
      slideRight: 'slide-right',
      zoomIn: 'zoom-in',
      zoomOut: 'zoom-out'
    };

    if (animationClasses[animationName]) {
      this.elements.forEach(element => element.classList.remove(animationClasses[animationName]));
    } else {
      throw new Error(`Invalid animation name: ${animationName}`);
    }

    return this;
  }

  css(property, value) {
    this.elements.forEach(element => {
      element.style[property] = value;
    });
    return this;
  }
  appendElement(tagName, attributes = {}, text = '') {
          const newElement = document.createElement(tagName);
          Object.entries(attributes).forEach(([key, value]) => {
                  newElement.setAttribute(key, value);
          });
          newElement.textContent = text;
          this.elements.forEach(element => {
                  element.appendChild(newElement);
          });
          return this;
  }
  getCssValue(property) {
          return window.getComputedStyle(this.elements[0]).getPropertyValue(property);
  }
   getPosition() {
    const element = this.elements[0];
    const parent = element.offsetParent;
    const position = {
      top: element.offsetTop,
      left: element.offsetLeft
    };

    while (parent !== null) {
      position.top += parent.offsetTop;
      position.left += parent.offsetLeft;
      parent = parent.offsetParent;
    }

    return position;
  }
  find(selector) {
  const descendants = this.elements.flatMap(element => Array.from(element.querySelectorAll(selector)));
  return new DomManipulator(descendants);
}
mergeElement(tagName, {
    attributes = {},
    text = '',
    replace = false,
    targetSelector = null,
    code = '',
    css = '',
    textNode = '',
    classes = [],
    dataset = {},
    events = {},
    callback = null,
    children = [],
    style = {},
  } = {}) {
    const newElement = document.createElement(tagName);
    Object.entries(attributes).forEach(([key, value]) => {
      newElement.setAttribute(key, value);
    });
    if (textNode) {
      const textNodeElement = document.createTextNode(textNode);
      newElement.appendChild(textNodeElement);
    } else {
      newElement.textContent = text;
    }
    if (css) {
      newElement.style.cssText = css;
    } else {
      Object.entries(style).forEach(([property, value]) => {
        newElement.style[property] = value;
      });
    }
    if (classes.length) {
      classes.forEach(className => {
        newElement.classList.add(className);
      });
    }
    Object.entries(dataset).forEach(([key, value]) => {
      newElement.dataset[key] = value;
    });
    Object.entries(events).forEach(([event, handler]) => {
      newElement.addEventListener(event, handler);
    });
    children.forEach(child => {
      newElement.appendChild(child);
    });
    if (code) {
      newElement.innerHTML = code;
    }
    if (callback) {
      callback(newElement);
    }
    if (replace && targetSelector) {
      const oldElement = document.querySelector(targetSelector);
      if (oldElement) {
        oldElement.replaceWith(newElement);
        return new DomManipulator(targetSelector);
      }
    } else {
      this.elements.forEach(element => {
        element.appendChild(newElement);
      });
      return this;
    }
  }


}



function $(selector) {
  return new DomManipulator(selector);
}

window.Aestron = {
  DomManipulator,
  $
};


