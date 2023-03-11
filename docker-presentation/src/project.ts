import { makeProject } from '@motion-canvas/core';

import example from './scenes/example?scene';
import start_title from './scenes/start_title?scene';
import docker_start from './scenes/docker_start?scene';
import dev_scene from './scenes/dev/dev_scene?scene';

export default makeProject({
  // scenes: [start_title, docker_start],
  scenes: [dev_scene]
});
