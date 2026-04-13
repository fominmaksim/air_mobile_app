import { useState } from 'react';
import { useMeasurementsStore } from '../store/measurements.store';
import { DataTypeEnum } from '../types';
import { formatTimeLabel } from '../utils/formatTimeLabel';
import { useSensorStore } from '../store/sensor.store';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';

export const useDisplaySelectedMeasurements = () => {
  const { measurements } = useMeasurementsStore();

  const { sensor } = useSensorStore();

  const [selectedDataType, setSelectedDataType] = useState(
    DataTypeEnum.TEMPERATURE,
  );

  const sensorLiveValue = sensor?.[selectedDataType];

  //  process labels
  const dataLength = measurements?.length || 0;
  const labelCount = 6;

  const labels = measurements?.map((el, i) => {
    if (dataLength <= labelCount) {
      return formatTimeLabel(el.bucket) ?? '';
    }

    const step = labelCount > 1 ? (dataLength - 1) / (labelCount - 1) : 0;
    const labelIndices = Array.from({ length: labelCount }, (_, k) =>
      Math.round(k * step),
    );
    const show = labelIndices.includes(i);
    return show ? formatTimeLabel(el.bucket) : '';
  });
  

  const chartData: ChartData = {
    labels: labels ?? [],
    datasets: measurements?.length
      ? [
          {
            data: measurements?.map(el => el?.[selectedDataType] || 0),
            color: () => `rgba(255, 232, 215, 0.821)`,
            strokeWidth: 2,
          },
        ]
      : [],
  };

  return {
    allLiveSensorValues: sensor,
    sensorLiveValue,
    selectedDataType,
    chartData,
    setSelectedDataType,
  };
};
