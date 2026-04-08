import { MessageHandler } from '../types';

const WS_URLS = ['ws://192.168.0.24:3000/ws', 'ws://10.0.2.2:3000/ws'];

let socket: WebSocket | null = null;
const listeners = new Set<MessageHandler>();

export const connectWS = () => {
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  const connectAt = (index: number) => {
    const url = WS_URLS[index];
    if (!url) {
      return;
    }

    socket = new WebSocket(url);

    socket.onopen = () => {
      console.log(`WS connected: ${url}`);
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      listeners.forEach(subscriber => subscriber(data));
    };

    socket.onerror = () => {
      console.log(`WS error: ${url}`);

      if (index + 1 < WS_URLS.length) {
        connectAt(index + 1);
      }
    };

    socket.onclose = () => {
      console.log(`WS closed: ${url}`);
    };
  };

  connectAt(0);
};

export const subscribe = (subscriber: MessageHandler) => {
  listeners.add(subscriber);
  return () => {
    listeners.delete(subscriber);
  };
};

export const send = (payload: unknown) => {
  socket?.send(JSON.stringify(payload));
};
