/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Pattern = ({ data }) => {
  const [sk, setsk] = useState(true);
  setTimeout(() => {
    setsk(false);
  }, 5000);
  return (
    <div className="container h-100  flex-column justify-content-center align-items-center">
      <div className="row mt-4">
        <ul className="list-unstyled m-0 p-0 d-flex">
          {!sk &&
            data.map((profile, index) => {
              if (index > 3) {
                return;
              }
              return (
                <li
                  className="me-3 shadow report__box bg-dark pt-2"
                  key={index}
                >
                  <div className="profile w-100 h-100 d-flex justify-content-center flex-column align-items-center">
                    <div className="circleAvatar">
                      <img src="/avatar.png" alt="" className="w-100" />
                    </div>
                    <h5 className="text-center mt-3">{profile.Username}</h5>
                    <a href={profile.link} target="_blank" rel="noreferrer">
                      {' '}
                      <p>Goto Profile</p>
                    </a>
                  </div>
                </li>
              );
            })}
          {sk && (
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
        </ul>
      </div>
    </div>
  );
};
export default Pattern;
