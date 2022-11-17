import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

const SK__finalReport = ({ review, lang, func, data }) => {
  const analyze = async () => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_NAME}api/predict`,
        {
          method: 'POST',
          body: JSON.stringify({
            data: data,
            allowReview: review,
            allowLang: lang,
          }),
          headers: { 'content-type': 'application/json' },
        }
      );

      const resp = await req.json();
      if (resp) {
        if (resp.status == 1) {
          func[2](resp.body);
          func[0](false);
          func[1](true);
        }
      }
    } catch (error) {
      alert('SCPY:1 Module Error');
    }
  };
  useEffect(() => {
    analyze();
  }, []);
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col p-0">
          <h4>Final Anaylsis</h4>
        </div>
      </div>
      <div className="row my-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-4 shdaow">
              <Skeleton height={300}></Skeleton>
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <Skeleton circle width={200} height={200}></Skeleton>
            </div>
            <div className="col-4 shdaow  ">
              <Skeleton height={300}></Skeleton>
            </div>
          </div>
          <div className="row my-4">
            <div className="col shadow">
              <Skeleton height={300}></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SK__finalReport;
