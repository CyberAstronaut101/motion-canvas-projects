import { Circle, Txt } from '@motion-canvas/2d/lib/components';
import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { waitFor } from '@motion-canvas/core/lib/flow';
import { linear } from '@motion-canvas/core/lib/tweening';
import { Direction } from '@motion-canvas/core/lib/types';
import { beginSlide, createRef } from '@motion-canvas/core/lib/utils';
import { slideTransition, zoomOutTransition } from "@motion-canvas/core/lib/transitions";

export default makeScene2D(function* (view) {
  // Create your animations here

  const startText = createRef<Txt>();

  // # Initial Start View Text
  view.add(
    <>
      <Txt
        ref={startText}
        width={700}
        height={300}
        fontSize={120}
        alignItems={'center'}
        fontWeight={700}
        justifyContent={'center'}
        fontFamily={'Play'}
        fill={'#ffffff'} />
    </>
  )

  // # Prepare the scene, place all objects on the scene before transitioning into view
  yield* startText().text('Docker Dev Containers', 0, linear)

  // # Slide up the scene
  yield* slideTransition(Direction.Bottom);
  yield* waitFor(2);
  yield* beginSlide('Title Slide');


});
