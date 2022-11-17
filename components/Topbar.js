import LoadingBar from 'react-top-loading-bar';
import useCustom from '../hooks/custom';

const Topbar = () => {
  const { progress, setProgress, theme } = useCustom();
  return (
    <LoadingBar
      color={theme}
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
