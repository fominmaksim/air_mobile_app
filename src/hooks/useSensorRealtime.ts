import { useEffect } from 'react';
import { subscribe } from '../api/websocket';
import { useSensorStore } from '../store/sensor.store';

export const useSensorRealtime = () => {
  const setSensor = useSensorStore(store => store.setSensor);
  const room = useSensorStore(store => store.setRoom);

  useEffect(() => {
    const unsub = subscribe(setSensor);

    return unsub;
  }, [room, setSensor]);
};
