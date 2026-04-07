class ActivityNotifier {
  events = [];
  handlers = [];
  connected = false;

  constructor() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    this.socket.onopen = () => {
      this.connected = true;
      this.notify('system', 'System', 'Connected to live feed');
    };

    this.socket.onmessage = async (event) => {
      const text = await event.data.text();
      const msg = JSON.parse(text);
      this.notify('received', msg.from, msg.text);
    };

    this.socket.onclose = () => {
      this.connected = false;
      this.notify('system', 'System', 'Disconnected from live feed');
    };
  }

  broadcastEvent(from, text) {
    this.notify('sent', from, text);
    this.socket.send(JSON.stringify({ from, text }));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  notify(type, from, text) {
    this.handlers.forEach((h) => h({ type, from, text }));
  }
}

const notifier = new ActivityNotifier();
export default notifier;