export class EventEmitter {
  #listeners = {};

  #getCallbacks(eventName) {
    return this.#listeners[eventName];
  }

  #setCallbacks(eventName, listeners) {
    if (listeners.length === 0) {
      delete this.#listeners[eventName];
    } else {
      this.#listeners[eventName] = listeners;
    }
  }

  subscribe(eventName, callback) {
    if (!this.#listeners[eventName]) {
      this.#listeners[eventName] = [];
    }
    this.#listeners[eventName].push(callback);
  }

  unsubscribe(eventName, callback) {
    if (this.#listeners[eventName]) {
      this.#listeners[eventName] = this.#listeners[eventName].filter(cb => cb !== callback);
      this.#setCallbacks(eventName, this.#listeners[eventName]);
    }
  }

  dispatch(eventName) {
    const callbacks = this.#getCallbacks(eventName) || [];
    callbacks.forEach(callback => callback());
  }
}
