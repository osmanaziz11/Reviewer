/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RecentReport = () => {
  const key = localStorage.getItem('user') !== null;
  const data = JSON.parse(localStorage.getItem('user'));
  const [rs, setRS] = useState([]);
  const [a, setA] = useState(true);

  async function reports() {
    try {
      const req = await fetch(`/api/report`, {
        method: 'POST',
        body: JSON.stringify({ Username: key ? data[0].Username : 'Admin' }),
        headers: { 'content-type': 'application/json' },
      });
      const resp = await req.json();
      if (resp) {
        if (resp.status == 1) {
          setRS(resp.body);
          setA(false);
        } else {
        }
      }
    } catch (error) {
      alert('Please try again. Report coud not save');
    }
  }
  useEffect(() => {
    reports();
  }, []);

  return (
    <div className="container h-100  flex-column justify-content-center align-items-center">
      <div className="row mt-4">
        <ul className="list-unstyled m-0 p-0 d-flex">
          {a && (
            <>
              <li className="me-3 shadow report__box">
                <Skeleton containerClassName="h-100" />
              </li>
              <li className="me-3 shadow report__box">
                <Skeleton containerClassName="h-100" />
              </li>
              <li className="me-3 shadow report__box">
                <Skeleton containerClassName="h-100" />
              </li>
              <li className="me-3 shadow report__box">
                <Skeleton containerClassName="h-100" />
              </li>
            </>
          )}
          {rs &&
            rs.map((report, index) => {
              return (
                <li
                  className="me-3 shadow report__box bg-dark p-4 d-flex flex-column"
                  key={index}
                >
                  <p>{report.title}</p>
                  <div className="d-flex">
                    <div
                      className="img"
                      style={{ width: '130px', height: '100px' }}
                    >
                      <img
                        src={report.thumbnail}
                        alt=""
                        className="w-100 h-100"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div className="mx-2">
                      <p className="m-0">Reviews: 3</p>
                      <p className="m-0">Language: EN FR DE</p>

                      <p className="m-0">Predicted: 22 %</p>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default RecentReport;
