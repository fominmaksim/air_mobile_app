import { MessageHandler } from '../types';

let socket: WebSocket;
const listeners = new Set<MessageHandler>();

export const connectWS = () => {
  socket = new WebSocket('ws://192.168.0.24:3000/ws');

  socket.onmessage = event => {
    const data = JSON.parse(event.data);

    listeners.forEach(subscriber => subscriber(data));
  };
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