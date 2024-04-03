import { MersenneTwister19937, Random } from "random-js";

export const rng = new Random(MersenneTwister19937);

rng.d6 = () => rng.die(6);
rng.sum2d6 = () => rng.dice(6, 2).reduce((sum, current) => (sum += current));
