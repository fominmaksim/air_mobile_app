import Toast from 'react-native-toast-message';
import { MessageHandler } from '../types';
import Config from 'react-native-config';

const WS_URLS = [

  `ws://${Config.API_BASE_URL}/ws`,
];
const RETRY_BASE_DELAY_MS = 1000;
const RETRY_MAX_DELAY_MS = 10000;
let socket: WebSocket | null = null;
const listeners = new Set<MessageHandler>();
let retryAttempt = 0;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

const clearReconnectTimer = () => {
  if (!reconnectTimer) {
    return;
  }
  clearTimeout(reconnectTimer);
  reconnectTimer = null;
};

export const connectWS = () => {
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  const connectAt = (index: number) => {
    clearReconnectTimer();

    const url = WS_URLS[index];
    if (!url) {
      return;
    }
    Toast.show({
      type: 'info',
      text1: 'Connecting...',
      position: 'bottom',
    });

    const ws = new WebSocket(url);
    socket = ws;

    ws.onopen = () => {
      if (socket !== ws) {
        return;
      }
      retryAttempt = 0;
      clearReconnectTimer();
      Toast.hide();
      Toast.show({
        type: 'success',
        text1: 'Connected',
        position: 'bottom',
      });

      console.log(`WS connected: ${url}`);
    };

    ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        listeners.forEach(subscriber => subscriber(data));
      } catch (e) {
        console.warn('onMessage', e);
      }
    };

    ws.onerror = e => {
      if (socket !== ws) {
        return;
      }
      console.warn('error', e);
      console.log(`WS error: ${url}`);
    };

    ws.onclose = event => {
      if (socket !== ws) {
        return;
      }
      socket = null;
      retryAttempt += 1;
      const delayMs = Math.min(
        RETRY_BASE_DELAY_MS * 2 ** (retryAttempt - 1),
        RETRY_MAX_DELAY_MS
      );
      const nextIndex = (index + 1) % WS_URLS.length;

      Toast.hide();
      Toast.show({
        type: 'info',
        text1: `Retrying in ${Math.round(delayMs / 1000)}s...`,
        position: 'bottom',
      });
      reconnectTimer = setTimeout(() => connectAt(nextIndex), delayMs);

      console.log(
        `WS closed: ${url}; code=${event.code}; reason=${event.reason || 'n/a'}`
      );
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
