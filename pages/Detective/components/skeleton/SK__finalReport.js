import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import useCustom from '../../../../hooks/custom';

const SK__finalReport = ({ review, lang, func, data }) => {
  const { dbfinal } = useCustom();
  const analyze = async () => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_NAME}api/predict`,
        {
          method: 'POST',
          body: JSON.stringify({
            pid: data.id,
            data: data.body,
            allowReview: review,
            allowLang: lang,
          }),
          headers: { 'content-type': 'application/json' },
        }
      );

      const resp = await req.json();
      if (resp) {
        if (resp.status == 1) {
          console.log(resp.body);
          dbfinal = [{ finalReport: resp.body }];
          func[2](resp.body);
          func[1](true);
          func[0](false);
        } else {
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    analyze();
  }, []);
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col p-0">
          <h4>Complete Anaylsis</h4>
        </div>
      </div>
      <div className="row my-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-9 reviewAnalysis__container">
              <Skeleton height={250}></Skeleton>
              <Skeleton height={250}></Skeleton>
              <Skeleton height={250}></Skeleton>
              <Skeleton height={250}></Skeleton>
            </div>
            <div className="col-3 graph__container">
              <div className="grpahBox shdaow">
                <Skeleton height={250}></Skeleton>
              </div>
              <div className="grpahBox shdaow">
                <Skeleton height={250}></Skeleton>
              </div>
              <div className="grpahBox shdaow">
                <Skeleton height={250}></Skeleton>
              </div>
            </div>

            {/* <div className=" shdaow  ">
              <Skeleton height={300}></Skeleton>
            </div> */}
          </div>
          {/* <div className="row my-4">
            <div className="col shadow">
              <Skeleton height={300}></Skeleton>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default SK__finalReport;
