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
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 px-2 mb-2">
          <div className="shadow report__box">
            <Skeleton containerClassName="h-100 " />
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 px-2 mb-2">
          <div className="shadow report__box ">
            <Skeleton containerClassName="h-100" />
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 px-2 mb-2">
          <div className="shadow report__box ">
            <Skeleton containerClassName="h-100" />
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 px-2 mb-2">
          <div className="shadow report__box ">
            <Skeleton containerClassName="h-100" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecentReport;
