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
    let position = {
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
  return descendants.length ? new DomManipulator(descendants) : $([]);
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
    function add(selector, options) {
  const target = document.querySelector(selector);
  if (!target) return;

  if (options.text) {
    target.textContent = options.text;
  }

  if (options.classes && options.classes.length > 0) {
    target.classList.add(...options.classes);
  }

  if (options.attributes) {
    Object.keys(options.attributes).forEach(key => {
      target.setAttribute(key, options.attributes[key]);
    });
  }

  if (options.dataset) {
    Object.keys(options.dataset).forEach(key => {
      target.dataset[key] = options.dataset[key];
    });
  }

  if (options.children && options.children.length > 0) {
    options.children.forEach(child => {
      const childElem = document.createElement(child.tagName);
      if (child.text) {
        childElem.textContent = child.text;
      }
      if (child.attributes) {
        Object.keys(child.attributes).forEach(key => {
          childElem.setAttribute(key, child.attributes[key]);
        });
      }
      if (child.dataset) {
        Object.keys(child.dataset).forEach(key => {
          childElem.dataset[key] = child.dataset[key];
        });
      }
      if (child.events) {
        Object.keys(child.events).forEach(key => {
          childElem.addEventListener(key, child.events[key]);
        });
      }
      target.appendChild(childElem);
    });
  }

  if (options.replace) {
    const newElem = document.createElement(options.tagName);
    if (options.text) {
      newElem.textContent = options.text;
    }
    if (options.classes && options.classes.length > 0) {
      newElem.classList.add(...options.classes);
    }
    if (options.attributes) {
      Object.keys(options.attributes).forEach(key => {
        newElem.setAttribute(key, options.attributes[key]);
      });
    }
    if (options.dataset) {
      Object.keys(options.dataset).forEach(key => {
        newElem.dataset[key] = options.dataset[key];
      });
    }
    if (options.children && options.children.length > 0) {
      options.children.forEach(child => {
        const childElem = document.createElement(child.tagName);
        if (child.text) {
          childElem.textContent = child.text;
        }
        if (child.attributes) {
          Object.keys(child.attributes).forEach(key => {
            childElem.setAttribute(key, child.attributes[key]);
          });
        }
        if (child.dataset) {
          Object.keys(child.dataset).forEach(key => {
            childElem.dataset[key] = child.dataset[key];
          });
        }
        if (child.events) {
          Object.keys(child.events).forEach(key => {
            childElem.addEventListener(key, child.events[key]);
          });
        }
        newElem.appendChild(childElem);
      });
    }
    target.parentNode.replaceChild(newElem, target);
  }
}

  }

 fadeIn(duration = 1000) {
         this.elements.forEach(element => {
                 element.style.opacity = 0;
                 element.style.display = "block";
                 let start = null;
                 const step = timestamp => {
                         if (!start) start = timestamp;
                         const progress = timestamp - start;
                         element.style.opacity = Math.min(progress / duration, 1);
                         if (progress < duration) {
                                 window.requestAnimationFrame(step);
                         }
                 };
                 window.requestAnimationFrame(step);
         });
         return this;
 }

 fadeOut(duration = 1000) {
         this.elements.forEach(element => {
                 element.style.opacity = 1;
                 let start = null;
                 const step = timestamp => {
                         if (!start) start = timestamp;
                         const progress = timestamp - start;
                         element.style.opacity = Math.max(1 - progress / duration, 0);
                         if (progress < duration) {
                                 window.requestAnimationFrame(step);
                         } else {
                                 element.style.display = "none";
                         }
                 };
                 window.requestAnimationFrame(step);
         });
         return this;
 }

 slideIn(duration = 1000, distance = "100%") {
         this.elements.forEach(element => {
                 element.style.transform = `translateX(${distance})`;
                 element.style.display = "block";
                 let start = null;
                 const step = timestamp => {
                         if (!start) start = timestamp;
                         const progress = timestamp - start;
                         element.style.transform = `translateX(${Math.min(
           progress / duration,
           1
         ) * parseInt(distance)}px)`;
                         if (progress < duration) {
                                 window.requestAnimationFrame(step);
                         }
                 };
                 window.requestAnimationFrame(step);
         });
         return this;
 }

 slideOut(duration = 1000, distance = "100%") {
         this.elements.forEach(element => {
                 element.style.transform = "translateX(0)";
                 let start = null;
                 const step = timestamp => {
                         if (!start) start = timestamp;
                         const progress = timestamp - start;
                         element.style.transform = `translateX(${Math.max(
           1 - progress / duration,
           0
         ) * parseInt(distance)}px)`;
                         if (progress < duration) {
                                 window.requestAnimationFrame(step);
                         } else {
                                 element.style.display = "none";
                         }
                 };
                 window.requestAnimationFrame(step);
         });
         return this;
 }
}



function el(selector) {
  return new DomManipulator(selector);
}
function $(selector) {
        return new DomManipulator(selector);
}

window.Aestron = {
  DomManipulator,
  el,
  $

};

//ripple 
function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}
