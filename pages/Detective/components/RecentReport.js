/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db } from '../../../Firebase/firebase.config';
import { collection, addDoc } from 'firebase/firestore';
const RecentReport = () => {
  async function reports() {
    try {
      const entries = await db.collection('report').get();
      const entriesData = entries.docs.map((entry) => ({
        id: entry.id,
        ...entry.data(),
      }));
      console.log(entriesData);
    } catch (error) {}
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
