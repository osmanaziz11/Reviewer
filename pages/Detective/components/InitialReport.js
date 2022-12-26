import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const InitialReport = ({ data, func }) => {
  const { product, details } = data;

  const colors = ['#F2B705', '#FF3334', '#0092CD', '#DCD427'];
  const [Language, setLanguage] = useState([]);
  const [TotalReviews, setTotalReviews] = useState(0);
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  function getOccurrence(array, value) {
    return array.filter((v) => v === value).length;
  }
  useEffect(() => {
    let counter = 0;
    let Lang = [];
    let UniqueLang = [];
    let langArr = [];
    details.map((page) => {
      counter = counter + page.length;
      page.map((item) => {
        Lang.push(item.review.lang);
      });

      UniqueLang = Lang.filter(onlyUnique);

      UniqueLang.map((lang, index) => {
        let b = {
          language: lang.toUpperCase(),
          number: getOccurrence(Lang, lang),
        };

        langArr[index] = b;
      });
      setTotalReviews(counter);

      setLanguage(langArr);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row my-4">
      <div className="col-md-4 d-flex flex-column bg-dark rounded mb-md-0 mb-4 shadow p-3 justify-content-center align-items-center">
        <p className="w-100">{product[0].title}</p>
        <div className="product__box ">
          <img src={product[0].imgSrc} alt="" />
        </div>
      </div>
      <div className="col-md-8 product__desc d-flex flex-column justify-content-center align-items-center">
        <div className="container anaylsis__container  w-100 h-100 rounded shadow bg-dark p-3">
          <div className="row">
            <div className="col">
              <h4 className="text-center ">
                Number of Reviews : {TotalReviews}
              </h4>
            </div>
          </div>
          <div className="row my-3">
            <div className="col d-flex flex-sm-row flex-column justify-content-center align-items-center">
              {Language.map((lang, index) => {
                return index < 3 ? (
                  <div key={index}>
                    <div
                      style={{ width: 100, height: 100 }}
                      className={`d-flex justify-content-center mx-3`}
                    >
                      <CircularProgressbar
                        value={parseInt((lang.number / TotalReviews) * 100)}
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
                          value={parseInt((lang.number / TotalReviews) * 100)}
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
              })}
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
                  Select Number of reviews you want to predict
                </p>

                <select name="" id="" className="shadow" onChange={func[0]}>
                  <option defaultValue={TotalReviews}>Choose reviews</option>

                  <option value={TotalReviews}>{TotalReviews}</option>
                  <option value={parseInt(TotalReviews / 2)}>
                    {parseInt(TotalReviews / 2)}
                  </option>
                </select>
                <p className="text-center mt-3">
                  Select Language of reviews you want to predict
                </p>
                <select name="" id="" className="shadow" onChange={func[1]}>
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
  );
};
export default InitialReport;
