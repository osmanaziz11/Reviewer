import { useEffect, useState } from 'react';
import AnalyzeReport from './AnalyzeReport';

import Loader from './Loader';
import { AiFillStar } from 'react-icons/ai';
import useCustom from '../../../hooks/custom';
import Predicted from './Predicted';

const Product = ({ data }) => {
  const { ARStatus, setARStatus, totalReviews, selectedLang } = useCustom();
  const [Progress, setProgress] = useState(0);
  const [BtnStatus, setBtnStatus] = useState('Start Anaylze');
  const [ReportStatus, setReportStatus] = useState(false);
  const [response, setResponse] = useState([]);
  const [ARProgress, setARProgress] = useState(0);
  const [ARProgressStatus, setARProgressStatus] = useState('Processing');

  const [AResult, setAResult] = useState([]);

  const generateReport = async () => {
    if (ARStatus) {
      try {
        setARProgress(10);
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_HOST_NAME}api/filterArray`,
          {
            method: 'POST',
            body: JSON.stringify({
              data: response,
              allowReview: totalReviews,
              allowLang: selectedLang,
            }),
            headers: { 'content-type': 'application/json' },
          }
        );

        const resp = await req.json();
        setARProgress(40);
        setARProgressStatus('Preprocessing');
        if (resp) {
          if (resp.status == 1) {
            try {
              const req = await fetch(
                `${process.env.NEXT_PUBLIC_HOST_NAME}api/pp`,
                {
                  method: 'POST',
                  body: JSON.stringify({ data: resp.pp }),
                  headers: { 'content-type': 'application/json' },
                }
              );

              const resp1 = await req.json();
              if (resp1) {
                if (resp1.status == 1) {
                  setARProgress(60);
                  setARProgressStatus('Predicting');
                  try {
                    const req = await fetch(
                      `${process.env.NEXT_PUBLIC_HOST_NAME}api/predict`,
                      {
                        method: 'POST',
                        body: JSON.stringify({ data: resp1.pp }),
                        headers: { 'content-type': 'application/json' },
                      }
                    );

                    const resp2 = await req.json();
                    if (resp2) {
                      if (resp2.status == 1) {
                        setARProgress(80);
                        setARProgressStatus('Compiling Result');
                        try {
                          const req = await fetch(
                            `${process.env.NEXT_PUBLIC_HOST_NAME}api/predict`,
                            {
                              method: 'POST',
                              body: JSON.stringify({ data: resp1.pp }),
                              headers: { 'content-type': 'application/json' },
                            }
                          );

                          const resp3 = await req.json();
                          if (resp3) {
                            resp3.status == 1 && setAResult(resp3.body);
                            setARStatus(true);
                          }
                        } catch (error) {}
                      }
                    }
                  } catch (error) {}
                }
              }
            } catch (error) {}
          }
        }
      } catch (error) {}
    }
  };
  const analyzeProduct = () => {
    if (!ARStatus) {
      setProgress(20);
      try {
        fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}api/reviews`, {
          method: 'POST',
          body: JSON.stringify({ url: data[0].baseURL, id: data[0].id }),
          headers: { 'content-type': 'application/json' },
        })
          .then((response) => response.json())
          .then((data) => {
            setProgress(80);
            setBtnStatus('Compiling results');
            const { status, body } = data;
            setProgress(100);
            setBtnStatus('Thankyou for waiting');
            setTimeout(() => {
              status == 1 && setBtnStatus('Generate Report');
              setReportStatus(true);
              setResponse(body);
            }, 2000);
          });
      } catch (error) {}
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 d-flex flex-column shadow p-3 justify-content-center align-items-center">
            <p className="">{data[0].title}</p>
            <div className="product__box">
              <img src={data[0].imgSrc} alt="" />
            </div>
          </div>
          <div className="col-md-8 product__desc d-flex flex-column justify-content-center align-items-center">
            {ReportStatus ? (
              <AnalyzeReport data={response} />
            ) : (
              <Loader number={Progress} />
            )}
            <button
              className="px-5 py-2 shadow rounded"
              onClick={(event) => {
                analyzeProduct();
                generateReport();
              }}
            >
              {BtnStatus}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`container my-5 ${ARProgress > 0 ? 'd-block' : 'd-none'}`}
      >
        <div className="row">
          <div className="col">
            <p>Prediction based Report</p>
          </div>
        </div>
        <div className="row px-3 mb-5">
          <div className="col product__container border-0 rounded p-4">
            {!AResult.length > 0 ? (
              <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
                <h2>{ARProgressStatus}</h2>
                <p className="text-center">
                  Please be patient. Your report will be ready in a minute
                </p>
              </div>
            ) : (
              <Predicted data={AResult} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
