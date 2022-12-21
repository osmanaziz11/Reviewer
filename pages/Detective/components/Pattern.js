/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

const Pattern = ({ data }) => {
  console.log(data);
  return (
    <div className="container-fluid h-100  flex-column justify-content-center align-items-center">
      {data.map((user, index) => {
        var pf = Math.floor(Math.random() * user.totalReviews);
        return (
          <div key={index} className="row p-0 mb-2">
            <div className="col-4 pe-1 p-0 d-flex justify-content-center align-items-center">
              <div className="container-fluid shadow bg-dark  rounded mb-1 h-100 d-flex flex-column justify-content-center align-items-center">
                <div className="row ">
                  <div className="col profile d-flex justify-content-center align-items-center">
                    <div
                      className="circleAvatar d-flex justify-content-center align-items-center mt-1"
                      style={{ width: '103px' }}
                    >
                      <img
                        src="/avatar.png"
                        alt=""
                        className=""
                        style={{ width: '33px !important' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col">
                    <h5 className="text-center">{user.name}</h5>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col">
                    <p
                      className="text-center mb-1"
                      style={{ fontSize: '11px' }}
                    >
                      {user.review}
                    </p>
                    <a href={'{user.link}'} target="_blank" rel="noreferrer">
                      <p className="text-center mb-1">Goto Profile</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8 p-0">
              <div className="container-fluid rounded bg-dark">
                <div className="row px-3 pt-3">
                  <div className="col-4">
                    <ps className="mb-1">Total Reviews</ps>
                    <p className="mb-1">Positive Reviews</p>
                    <p className="mb-1">Negative Reviews</p>

                    <p className="mb-1">Impacts</p>
                    <p className="mb-1">Reputation</p>
                    <h6 className="mb-1">Text Analysis</h6>
                    <p className="mb-1">Predicted Fake</p>
                    <p className="mb-1">Predicted Not</p>
                  </div>
                  <div className="col-2">
                    <p className="mb-1 text-center">{user.totalReviews}</p>
                    <p className="mb-1 text-center">{user.positive}</p>
                    <p className="mb-1 text-center">
                      {user.totalReviews - user.positive}
                    </p>

                    <p className="mb-1 text-center">{user.impacts}</p>
                    <p className="mb-1 text-center">
                      {parseInt(
                        user.positive +
                          1 / user.positive +
                          (user.totalReviews - user.positive) +
                          2
                      )}
                    </p>
                    <p className="mb-1 text-center">-</p>
                    <p className="mb-1 text-center">{user.totalReviews - pf}</p>
                    <p className="mb-1 text-center">{user.totalReviews - pf}</p>
                  </div>
                  <div className="col-4">
                    <h6>This Review</h6>
                    <p className="mb-1">Positive Review</p>
                    <p className="mb-1">Negative Review</p>
                    <h6 className="mt-2">Text Analysis</h6>
                    <p className="mb-1">Predicted Fake</p>
                    <p className="mb-1">Predicted Not</p>
                  </div>
                  <div className="col-2">
                    <p className="mb-1 text-center">-</p>
                    <p className="mb-1 text-center">True</p>
                    <p className="mb-1 text-center">False</p>
                    <p className="mb-1 text-center">-</p>
                    <p className="mb-1 text-center">False</p>
                    <p className="mb-1 text-center">True</p>
                  </div>
                </div>

                <div className="row px- pb-1">
                  <div className="col">
                    <p className="m-1" style={{ fontStyle: '12px' }}>
                      According to profile analysis this user give{' '}
                      {user.totalReviews} reviews in total where {user.positive}{' '}
                      reviews seems to be positive and{' '}
                      {user.totalReviews - user.positive} reviews seems to be
                      negative. But the intersting thing is {user.impacts}{' '}
                      Impacts which means {user.impacts} Persons like their
                      review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Pattern;
