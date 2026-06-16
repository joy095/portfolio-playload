import * as migration_20260616_170540 from './20260616_170540';

export const migrations = [
  {
    up: migration_20260616_170540.up,
    down: migration_20260616_170540.down,
    name: '20260616_170540'
  },
];
