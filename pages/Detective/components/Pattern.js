/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

const Pattern = ({ data }) => {
  return (
    <div className="container-fluid h-100  flex-column justify-content-center align-items-center ">
      {data.map((user, index) => {
        return (
          <div key={index} className="row p-0 mb-2">
            <div className="col-4 pe-1 p-0 d-flex justify-content-center align-items-center">
              <div className="container-fluid shadow bg-black  rounded mb-1 h-100 d-flex flex-column justify-content-center align-items-center">
                <div className="row ">
                  <div className="col profile d-flex justify-content-center align-items-center">
                    <div
                      className="circleAvatar d-flex justify-content-center align-items-center mt-1"
                      style={{ width: '103px' }}
                    >
                      <img
                        src={
                          user.userImage ==
                          'https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png'
                            ? '/avatar.png'
                            : user.userImage
                        }
                        alt=""
                        className=""
                        style={{ width: '33px !important' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col">
                    <h5 className="text-center">{user.userName}</h5>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col">
                    <p
                      className="text-center mb-1 p_p"
                      style={{ fontSize: '11px' }}
                    >
                      {user.userReview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8 p-0">
              <div className="container-fluid rounded bg-black">
                <div className="row px-3 pt-3">
                  <div className="col-6">
                    <div className="container-fluid p-0">
                      <div className="row p-0">
                        <div className="col">
                          <h6 className="h6_fake">Profile Anaylsis</h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-10">
                          <p className="mb-1">Total Reviews</p>
                          <p className="mb-1">Positive Reviews</p>
                          <p className="mb-1">Negative Reviews</p>

                          <p className="mb-1">Impacts</p>
                          <p className="mb-1">Reputation</p>

                          <p className="mb-1">Predicted Not Fake</p>
                          <p className="mb-1">Predicted Fake</p>
                        </div>
                        <div className="col-2">
                          <p className="mb-1 text-center">
                            {user.profile.totalReviews}
                          </p>
                          <p className="mb-1 text-center">
                            {
                              user.profile.semantic.filter((x) => x === 1)
                                .length
                            }
                          </p>
                          <p className="mb-1 text-center">
                            {
                              user.profile.semantic.filter((x) => x === -1)
                                .length
                            }
                          </p>

                          <p className="mb-1 text-center">
                            {user.profile.impacts}
                          </p>
                          <p className="mb-1 text-center">
                            {user.label.toFixed(2)}
                          </p>

                          <p className="mb-1 text-center">
                            {
                              user.profile.predictions.filter((x) => x === 0)
                                .length
                            }
                          </p>
                          <p className="mb-1 text-center">
                            {
                              user.profile.predictions.filter((x) => x === 1)
                                .length
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="container-fluid p-0">
                      <div className="row p-0">
                        <div className="col">
                          <h6 className="h6_fake">
                            Individual Review Analysis
                          </h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-10">
                          <p className="mb-1">Positive Review</p>
                          <p className="mb-1">Negative Review</p>

                          <p className="mb-1">Predicted Fake</p>
                          <p className="mb-1">Predicted Not Fake</p>
                        </div>
                        <div className="col-2">
                          {/* <p className="mb-1 text-center">-</p> */}
                          <p className="mb-1 text-center">
                            {user.sementic == 1 ? 'True' : '-'}
                          </p>
                          <p className="mb-1 text-center">
                            {user.sementic == 0 ? 'True' : '-'}
                          </p>

                          <p className="mb-1 text-center">
                            {user.prediction == 1 ? 1 : '-'}
                          </p>
                          <p className="mb-1 text-center">
                            {user.prediction == 0 ? 1 : '-'}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col d-flex justify-content-start align-content-start">
                          <h6 className="me-3">Overall</h6>{' '}
                          <p className="m-0">
                            <strong
                              className={`${
                                user.label >= 1 ? 'not_fake' : 'fake'
                              }`}
                            >
                              {user.label >= 1 ? 'NOT FAKE' : 'FAKE'}
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row px- pb-1">
                  <div className="col">
                    <p className="m-1" style={{ fontStyle: '12px' }}>
                      <strong className="me-2 h6_fake">Conclusion:- </strong>{' '}
                      According to current profile analysis this Reviewer seems
                      to be{' '}
                      {user.label >= 1 ? (
                        <strong>NOT FAKE</strong>
                      ) : (
                        <strong>FAKE</strong>
                      )}{' '}
                      as per report anaylsis {user.profile.totalReviews} reviews
                      in total where{' '}
                      {user.profile.semantic.filter((x) => x === 1).length}{' '}
                      reviews seems to be positive and{' '}
                      {user.profile.semantic.filter((x) => x === -1).length}{' '}
                      reviews seems to be negative on average. We find the
                      reputation by normalizing the results.
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
