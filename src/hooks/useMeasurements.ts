import { useCallback, useEffect } from 'react';
import { sensorsApi } from '../api';
import { useMeasurementsStore } from '../store/measurements.store';

export const useMeasurements = () => {
  const setMeasurements = useMeasurementsStore(store => store.setMeasurements);

  const fetchMeasurements = useCallback(async () => {
    const response = await sensorsApi.getRoomMeasurements();

    setMeasurements?.(response);
  }, [setMeasurements]);

  useEffect(() => {
    fetchMeasurements();
  }, [fetchMeasurements]);
};
