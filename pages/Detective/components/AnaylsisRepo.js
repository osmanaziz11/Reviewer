import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CiSaveDown2 } from 'react-icons/ci';
import useCustom from '../../../hooks/custom';
import FinalReport from './FinalReport';
import InitialReport from './InitialReport';
import SK__finalReport from './skeleton/SK__finalReport';
import SK__initialReport from './skeleton/SK__initialReport';

const AnaylsisRepo = ({ url }) => {
  const router = useRouter();
  const { setProgress } = useCustom();
  const [finalReport, setFinalReport] = useState([]);
  const [initialReport, setInitialReport] = useState({});
  const [SK__initRepo__status, setSK__initRepo__status] = useState(true);
  const [SK__finalRepo__status, setSK__finalRepo__status] = useState(false);
  const [finalRepo__status, setFinalRepo__status] = useState(false);
  const [Review, setReview] = useState(0);
  const [Language, setLanguage] = useState('en');
  const [fdata, setFData] = useState([]);

  function reviewChange(event) {
    setReview(event.target.value);
    setSK__finalRepo__status(true);
  }
  function langChange(event) {
    setLanguage(event.target.value);
  }
  async function saveReport() {
    setProgress(20);
    try {
      const req = await fetch(`/api/save`, {
        method: 'POST',
        body: JSON.stringify({ initialRepo: finalReport, finalRepo: fdata }),
        headers: { 'content-type': 'application/json' },
      });

      const resp = await req.json();
      if (resp) {
        setProgress(30);
        console.log(resp);
        if (resp.status == 1) {
          setProgress(100);
          router.replace('/Detective/Amazon');
        }
      }
    } catch (error) {
      alert('Please try again. Report coud not save');
    }
  }

  const analyze = async (URL) => {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}api/pd`, {
        method: 'POST',
        body: JSON.stringify({ url: URL }),
        headers: { 'content-type': 'application/json' },
      });

      const resp = await req.json();
      if (resp) {
        if (resp.status == 1) {
          const { body } = resp;
          try {
            fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}api/reviews`, {
              method: 'POST',
              body: JSON.stringify({ url: body[0].baseURL, id: body[0].id }),
              headers: { 'content-type': 'application/json' },
            })
              .then((response) => response.json())
              .then((data) => {
                setFinalReport(data.body);
                setInitialReport({ product: body, details: data.body });
                setSK__initRepo__status(false);
              });
          } catch (error) {}
        }
      } else {
        alert('SCPY:2 Module Error');
      }
    } catch (error) {
      alert('SCPY:1 Module Error');
    }
  };
  useEffect(() => {
    analyze(url);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 p-0">
          <h4>Initial Anaylsis</h4>
        </div>
        <div className="col-6 p-0 d-flex justify-content-end pe-4 ">
          {finalRepo__status && (
            <CiSaveDown2
              onClick={saveReport}
              style={{ color: 'white', fontSize: '2rem', cursor: 'pointer' }}
            ></CiSaveDown2>
          )}
        </div>
      </div>
      {SK__initRepo__status && <SK__initialReport></SK__initialReport>}
      {!SK__initRepo__status && (
        <InitialReport data={initialReport} func={[reviewChange, langChange]} />
      )}

      {SK__finalRepo__status && (
        <SK__finalReport
          review={Review}
          lang={Language}
          data={finalReport}
          func={[setSK__finalRepo__status, setFinalRepo__status, setFData]}
        />
      )}
      {!SK__finalRepo__status && finalRepo__status && (
        <FinalReport data={fdata} />
      )}
    </div>
  );
};
export default AnaylsisRepo;
