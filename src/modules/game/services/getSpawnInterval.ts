import { BASE_INTERVAL } from '@game/constants';

function getSpawnInterval(ticks: number): number {
  return Math.max(BASE_INTERVAL - Math.sqrt(ticks / 1.5), 1);
}

export { getSpawnInterval };
