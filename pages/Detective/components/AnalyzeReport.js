import { useContext, useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useCustom from '../../../hooks/custom';

const AnalyzeReport = ({ data }) => {
  const { setTReviews, setSLanguage, setARStatus } = useCustom();

  function reviewChange(event) {
    setTReviews(event.target.value);
    setARStatus(true);
  }
  function langChange(event) {
    setSLanguage(event.target.value);
    setARStatus(true);
  }
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
    <div className="container anaylsis__container  w-100 h-100">
      <div className="row">
        <div className="col">
          <h4 className="text-center">Number of Reviews : {TotalReviews}</h4>
        </div>
      </div>
      <div className="row my-3">
        <div className="col d-flex justify-content-center">
          {Language.map((lang, index) => {
            return index < 3 ? (
              <div key={index}>
                <div
                  style={{ width: 100, height: 100 }}
                  className={`d-flex justify-content-center mx-3`}
                >
                  <CircularProgressbar
                    value={parseInt((lang.number / TotalReviews) * 100)}
                    text={`${parseInt((lang.number / TotalReviews) * 100)}%`}
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
                      text={`${parseInt((lang.number / TotalReviews) * 100)}%`}
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
            <select name="" id="" className="shadow" onChange={reviewChange}>
              <option value="0">All</option>
              <option value={parseInt(TotalReviews / 2)}>
                {parseInt(TotalReviews / 2)}
              </option>
            </select>
            <p className="text-center mt-3">
              Select Language of reviews you want to predict
            </p>
            <select name="" id="" className="shadow" onChange={langChange}>
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
  );
};
export default AnalyzeReport;
