import {Config} from './config';

const windowEnv = (window as any)._env_ || {};

const config: Config = {...windowEnv, ...process.env};

export default config;
