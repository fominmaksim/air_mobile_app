export type ComfortResult = {
  score: number; // 0–100
  label: string; // human readable
};

/**
 * Indoor apparent temperature (°C) from dry-bulb T and RH (Steadman-style, no wind).
 */
export function indoorFeelsLikeCelsius(
  tempC: number,
  rhPercent: number,
): number {
  const T = tempC;
  const rh = Math.min(100, Math.max(0, rhPercent));
  const e =
    (rh / 100) * 6.105 * Math.exp((17.27 * T) / (237.3 + T));
  return T + 0.33 * e - 4.0;
}

export function getComfortScore(
  tempC: number,
  rhPercent: number,
): ComfortResult {
  const T = tempC;
  const rh = Math.min(100, Math.max(0, rhPercent));

  // --- Temperature score (ideal ~22°C) ---
  const tempDiff = Math.abs(T - 22);
  const tempScore = Math.max(0, 100 - tempDiff * 12);
  // loses ~12 points per °C away

  // --- Humidity score (ideal 40–60%) ---
  let humidityScore = 100;

  if (rh < 40) {
    humidityScore = 100 - (40 - rh) * 2;
  } else if (rh > 60) {
    humidityScore = 100 - (rh - 60) * 2;
  }

  humidityScore = Math.max(0, humidityScore);

  // --- Combine (weighted) ---
  const score = Math.round(tempScore * 0.6 + humidityScore * 0.4);

  // --- Label ---
  let label = 'Good';

  if (score >= 85) label = 'Excellent';
  else if (score >= 70) label = 'Good';
  else if (score >= 50) label = 'Okay';
  else if (score >= 30) label = 'Poor';
  else label = 'Bad';

  return { score, label };
}
