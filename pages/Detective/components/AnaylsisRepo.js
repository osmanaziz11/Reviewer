import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CiSaveDown2 } from 'react-icons/ci';
import { ToastContainer, toast } from 'react-toastify';
import useCustom from '../../../hooks/custom';
import FinalReport from './FinalReport';
import InitialReport from './InitialReport';
import SK__finalReport from './skeleton/SK__finalReport';
import SK__initialReport from './skeleton/SK__initialReport';
import { db } from '../../../Firebase/firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
const AnaylsisRepo = ({ url }) => {
  const router = useRouter();
  const { setProgress, dbinit, dbfinal } = useCustom();
  const [finalReport, setFinalReport] = useState({});
  const [initialReport, setInitialReport] = useState({});
  const [SK__initRepo__status, setSK__initRepo__status] = useState(true);
  const [SK__finalRepo__status, setSK__finalRepo__status] = useState(false);
  const [finalRepo__status, setFinalRepo__status] = useState(false);
  const [Review, setReview] = useState(0);
  const [Language, setLanguage] = useState('en');
  const [fdata, setFData] = useState({});

  function reviewChange(event) {
    setReview(event.target.value);
    setSK__finalRepo__status(true);
  }
  function langChange(event) {
    setLanguage(event.target.value);
  }
  async function saveReport() {
    setProgress(20);
    console.log(initialReport.product);
    try {
      const dbInstance = collection(db, 'report');
      addDoc(dbInstance, {
        initialReport: initialReport.product,
        finalreport: fdata.overallResult,
      });

      setTimeout(() => {
        setProgress(100);
        toast.success('Report Save successfully.', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }, 2000);
      const doc = new jsPDF('landscape', 'px', 'a4', 'false');
      doc.text(60, 10, 'Review Detection Report', 10, 10);
      doc.text(
        60,
        60,
        `Product Title: ${initialReport.product[0].title.substring(0, 5)}`
      );
      doc.text(60, 80, 'Overall Results');
      doc.text(60, 100, `Positive: ${fdata.overallResult.Positive}`);
      doc.text(60, 120, `Predicted Not Fake: ${fdata.overallResult.Positive}`);
      doc.save('Report.pdf');
    } catch (error) {
      toast.error("Report coudn't save Please try again.", {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setProgress(100);
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
                dbinit = [{ product: body, initialReport: data.body }];
                setFinalReport({ body: data.body, id: body[0].id });
                setInitialReport({ product: body, details: data.body });
                setSK__initRepo__status(false);
              });
          } catch (error) {
            //  /
          }
        }
      } else {
      }
    } catch (error) {
      // toast.error(error.message, {
      //   position: 'bottom-center',
      //   autoClose: false,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: 0.2,
      //   theme: 'dark',
      // });
    }
  };
  useEffect(() => {
    analyze(url);
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
          <InitialReport
            data={initialReport}
            func={[reviewChange, langChange]}
          />
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
    </>
  );
};
export default AnaylsisRepo;
