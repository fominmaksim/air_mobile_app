import { useEffect } from 'react';
import { useSensorStore } from '../store/sensor.store';
import { subscribe } from '../api/websocket';

export const useSensorRealtime = () => {
    console.log('useSensorRealtime');
  const setData = useSensorStore(store => store.setData);
  const room = useSensorStore(store => store.setRoom);

  useEffect(() => {
    const unsub = subscribe(setData);
    // send();
    return unsub;
  }, [room, setData]);
};
