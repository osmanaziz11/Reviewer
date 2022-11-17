import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useCustom from '../../../hooks/custom';
import { CircularProgressbar } from 'react-circular-progressbar';

const Product = ({ data }) => {
  const {
    ARStatus,
    setARStatus,
    setTReviews,
    setSLanguage,
    totalReviews,
    selectedLang,
  } = useCustom();

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  function getOccurrence(array, value) {
    return array.filter((v) => v === value).length;
  }
  const colors = ['#F2B705', '#FF3334', '#0092CD', '#DCD427'];
  const [Language, setLanguage] = useState([]);
  const [TotalReviews, setTotalReviews] = useState(0);
  useEffect(() => {
    let counter = 0;
    let Lang = [];
    let UniqueLang = [];
    let langArr = [];
    data.map((page) => {
      counter = counter + page.length;
      page.map((item) => {
        Lang.push(item.review.lang);
      });

      UniqueLang = Lang.filter(onlyUnique);
      console.log(UniqueLang);
      UniqueLang.map((lang, index) => {
        console.log(index);
        let b = {
          language: lang.toUpperCase(),
          number: getOccurrence(Lang, lang),
        };
        console.log(b);
        langArr[index] = b;
      });
      console.log(`L: ${langArr}`);
      setTotalReviews(counter);
      setLanguage(langArr);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 d-flex flex-column shadow p-3 justify-content-center align-items-center">
            <p className="w-100">
              {skeleton ? <Skeleton count={1} /> : data[0].title}
            </p>
            <div className="product__box ">
              {skeleton ? (
                <Skeleton containerClassName="h-100" />
              ) : (
                <img src={data[0].imgSrc} alt="" />
              )}
            </div>
          </div>
          <div className="col-md-8 product__desc d-flex flex-column justify-content-center align-items-center">
            <div className="container anaylsis__container  w-100 h-100">
              <div className="row">
                <div className="col">
                  <h4 className="text-center ">
                    {skeleton ? (
                      <Skeleton containerClassName="h-100" />
                    ) : (
                      `Number of Reviews : ${TotalReviews}`
                    )}
                  </h4>
                </div>
              </div>
              <div className="row my-3">
                <div className="col d-flex justify-content-center">
                  {!skeleton ? (
                    Language.map((lang, index) => {
                      return index < 3 ? (
                        <div key={index}>
                          <div
                            style={{ width: 100, height: 100 }}
                            className={`d-flex justify-content-center mx-3`}
                          >
                            <CircularProgressbar
                              value={parseInt(
                                (lang.number / TotalReviews) * 100
                              )}
                              text={`${parseInt(
                                (lang.number / TotalReviews) * 100
                              )}%`}
                              strokeWidth={8}
                              className="shadow rounded-circle"
                              styles={buildStyles({
                                strokeLinecap: 'butt',
                                pathColor: colors[index],
                                backgroundColor: 'transparent',
                                trailColor: 'transparent',
                              })}
                            />
                          </div>
                          <p className="text-center pt-3">{lang.language}</p>
                        </div>
                      ) : (
                        index == 3 && (
                          <div key={index}>
                            <div
                              style={{ width: 100, height: 100 }}
                              className={`d-flex justify-content-center mx-3`}
                            >
                              <CircularProgressbar
                                value={parseInt(
                                  (lang.number / TotalReviews) * 100
                                )}
                                text={`${parseInt(
                                  (lang.number / TotalReviews) * 100
                                )}%`}
                                strokeWidth={8}
                                className="shadow rounded-circle"
                                styles={buildStyles({
                                  strokeLinecap: 'butt',
                                  pathColor: '#E4E4E4',
                                  backgroundColor: 'transparent',
                                  trailColor: 'transparent',
                                })}
                              />
                            </div>
                            <p className="text-center pt-3">Others</p>
                          </div>
                        )
                      );
                    })
                  ) : (
                    <ul className="list-unstyle d-flex m-0 p-0">
                      <li
                        className="rounded-circle mx-3"
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: 149,
                        }}
                      >
                        <Skeleton containerClassName="h-100"></Skeleton>
                      </li>
                      <li
                        className="rounded-circle mx-3"
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: 149,
                        }}
                      >
                        <Skeleton containerClassName="h-100"></Skeleton>
                      </li>
                      <li
                        className="rounded-circle mx-3"
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: 149,
                        }}
                      >
                        <Skeleton containerClassName="h-100"></Skeleton>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="bar"></div>
                </div>
              </div>
              <form action="">
                <div className="row">
                  <div className="col d-flex flex-column justify-content-center options align-items-center">
                    <p className="text-center">
                      {skeleton ? (
                        <Skeleton containerClassName="h-100" />
                      ) : (
                        `Select Number of reviews you want to predict`
                      )}
                    </p>

                    <select
                      name=""
                      id=""
                      className="shadow"
                      onChange={reviewChange}
                    >
                      <option value="0">All</option>
                      <option value={parseInt(TotalReviews / 2)}>
                        {parseInt(TotalReviews / 2)}
                      </option>
                    </select>
                    <p className="text-center mt-3">
                      {skeleton ? (
                        <Skeleton containerClassName="h-100" />
                      ) : (
                        `Select Language of reviews you want to predict`
                      )}
                    </p>
                    <select
                      name=""
                      id=""
                      className="shadow"
                      onChange={langChange}
                    >
                      {Language.map((lang, index) => {
                        return (
                          <option
                            key={index}
                            value={lang.language}
                          >{`Only ${lang.language}`}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div
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
      </div> */}
    </>
  );
};
export default Product;

//  const generateReport = async () => {
//    if (ARStatus) {
//      try {
//        setARProgress(10);
//        const req = await fetch(
//          `${process.env.NEXT_PUBLIC_HOST_NAME}api/filterArray`,
//          {
//            method: 'POST',
//            body: JSON.stringify({
//              data: response,
//              allowReview: totalReviews,
//              allowLang: selectedLang,
//            }),
//            headers: { 'content-type': 'application/json' },
//          }
//        );

//        const resp = await req.json();
//        setARProgress(40);
//        setARProgressStatus('Preprocessing');
//        if (resp) {
//          if (resp.status == 1) {
//            try {
//              const req = await fetch(
//                `${process.env.NEXT_PUBLIC_HOST_NAME}api/pp`,
//                {
//                  method: 'POST',
//                  body: JSON.stringify({ data: resp.pp }),
//                  headers: { 'content-type': 'application/json' },
//                }
//              );

//              const resp1 = await req.json();
//              if (resp1) {
//                if (resp1.status == 1) {
//                  setARProgress(60);
//                  setARProgressStatus('Predicting');
//                  try {
//                    const req = await fetch(
//                      `${process.env.NEXT_PUBLIC_HOST_NAME}api/predict`,
//                      {
//                        method: 'POST',
//                        body: JSON.stringify({ data: resp1.pp }),
//                        headers: { 'content-type': 'application/json' },
//                      }
//                    );

//                    const resp2 = await req.json();
//                    if (resp2) {
//                      if (resp2.status == 1) {
//                        setARProgress(80);
//                        setARProgressStatus('Compiling Result');
//                        try {
//                          const req = await fetch(
//                            `${process.env.NEXT_PUBLIC_HOST_NAME}api/predict`,
//                            {
//                              method: 'POST',
//                              body: JSON.stringify({ data: resp1.pp }),
//                              headers: { 'content-type': 'application/json' },
//                            }
//                          );

//                          const resp3 = await req.json();
//                          if (resp3) {
//                            resp3.status == 1 && setAResult(resp3.body);
//                            setARStatus(true);
//                          }
//                        } catch (error) {}
//                      }
//                    }
//                  } catch (error) {}
//                }
//              }
//            } catch (error) {}
//          }
//        }
//      } catch (error) {}
//    }
//  };
