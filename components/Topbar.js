import LoadingBar from 'react-top-loading-bar';
import useCustom from '../hooks/custom';

const Topbar = () => {
  const { progress, setProgress } = useCustom();
  return (
    <LoadingBar
      color="#f78166"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      height={2}
      shadow={true}
      background="transparent"
      waitingTime={400}
    />
  );
};
export default Topbar;
