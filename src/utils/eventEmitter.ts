export const eventEmitter: {
  _events: {[key: string]: any}
  dispatch: (event: string, data?: any) => void
  subscribe: (event: string, callback: (data: any) => any) => void
  unsubscribe: (event: string) => void
} = {
  _events: {},
  dispatch(event, data) {
    if (!this._events?.[event]) return;
    this._events[event].forEach((callback: any) => callback(data))
  },
  subscribe(event, callback) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  },
  unsubscribe(event) {
    if (!this._events[event]) return;
    delete this._events[event];
  }
}
