/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Pattern = () => {
  return (
    <div className="container h-100  flex-column justify-content-center align-items-center">
      <div className="row mt-4">
        <ul className="list-unstyled m-0 p-0 d-flex">
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
        </ul>
      </div>
    </div>
  );
};
export default Pattern;
