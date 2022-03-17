import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  swaggerEgg: {
    enable: true,
    package: "swagger-egg",
  }
};

export default plugin;
