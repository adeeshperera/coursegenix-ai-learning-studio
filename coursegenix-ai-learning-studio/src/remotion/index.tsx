import { Composition } from 'remotion';
import { CourseDesignFlow } from './compositions/CourseDesignFlow';

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="CourseDesignFlow"
        component={CourseDesignFlow}
        durationInFrames={150}
        fps={30}
        width={600}
        height={400}
      />
    </>
  );
};