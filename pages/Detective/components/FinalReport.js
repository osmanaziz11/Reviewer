import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { PieChart } from 'react-minimal-pie-chart';
import { Chart } from 'react-google-charts';
import RecentReport from './RecentReport';
import Pattern from './Pattern';
import { generateSlug } from 'random-word-slugs';

const FinalReport = ({ fdata, pdata }) => {
  const slug = generateSlug(50, { format: 'title' });
  var rwords = slug.split(' ');
  const arr = [34, 56, 78, 80, 40];
  const barArrColor = [
    '#F5D242',
    '#438EF5',
    '#F58948',
    '#171717',
    '#F44279',
    '#AE39F4',
  ];

  const [center, setCenter] = useState({
    options: {
      pieHole: 0.4,
      is3D: false,
      backgroundColor: '#ff0000',
    },
    data: [
      ['Task', 'Hours per Day'],
      ['Non suspecious', 11],
      ['Suspecious', 11],
      // CSS-style declaration
    ],
  });
  const [right, setRight] = useState({
    data: [
      ['Users', 'Verified', 'Non verified'],
      ['60', 50, 460],
    ],
    options: {
      chart: {
        backgroundColor: 'transparent',
      },
      backgroundColor: 'transparent',
    },
  });

  return (
    <>
      <div className="row mt-4">
        <div className="col p-0">
          <h4>Complete Anaylsis</h4>
        </div>
      </div>
      <div className="row my-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-9 reviewAnalysis__container pe-0">
              <Pattern data={pdata}></Pattern>
            </div>
            <div className="col-3 graph__container">
              <div className="graph__box shdaow bg-dark rounded pb-2">
                <div className="px-5 py-2">
                  <p className="text-center">Sementic Analysis</p>
                  <PieChart
                    data={[
                      {
                        title: 'Positive',
                        value: arr[Math.floor(Math.random() * arr.length)],
                        color: '#0092CD',
                      },
                      {
                        title: 'Negative',
                        value: arr[Math.floor(Math.random() * arr.length)],
                        color: '#FF3334',
                      },
                      {
                        title: 'Neutral',
                        value: arr[Math.floor(Math.random() * arr.length)],
                        color: '#F2B705',
                      },
                    ]}
                  />
                </div>
                <ul className="list-unstyled d-flex m-0 justify-content-center align-items-center mt-3">
                  <li
                    className="me-2 rounded"
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#0092CD',
                    }}
                  ></li>
                  <p className="m-0 mt-1">Positive</p>
                  <li
                    className="mx-2 rounded"
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#F2B705',
                    }}
                  ></li>
                  <p className="m-0 mt-1">Neutral</p>
                  <li
                    className="mx-2 rounded"
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#FF3334',
                    }}
                  ></li>
                  <p className="m-0 mt-1">Negative</p>
                </ul>
              </div>
              <div className="graph__box bar shdaow bg-dark px-1 pb-4 my-2 rounded">
                <div className="bar__chart w-100 h-100 px-4 py-2 d-flex align-items-end justify-content-center">
                  <div
                    className="user bar mx-2 rounded shadow"
                    style={{
                      height: `${
                        fdata.real_users.length + fdata.fake_users.length
                      }%`,
                    }}
                  ></div>
                  <div
                    className="true bar mx-2 rounded shadow"
                    style={{ height: `${fdata.vp.vp - 2}%` }}
                  ></div>
                  <div
                    className="false bar mx-2 rounded shadow"
                    style={{ height: `${fdata.vp.non_vp + 1}%` }}
                  ></div>
                </div>
                <ul className="list-unstyled d-flex m-0 mb-3 justify-content-center align-items-center ">
                  <li
                    className="me-2 rounded"
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#075ad3',
                    }}
                  ></li>
                  <p className="m-0 mt-1">Users</p>

                  <li
                    className="mx-2 rounded"
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: 'orange',
                    }}
                  ></li>
                  <p className="m-0 mt-1">Verified</p>
                  <li
                    className="mx-2 rounded"
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#fe0000',
                    }}
                  ></li>
                  <p className="m-0 mt-1">N Verified</p>
                </ul>
              </div>
              <div className="pb-2 graph__box bg-dark shadow d-flex flex-column justify-content-center align-items-center">
                <div className="px-5 py-2">
                  <p className="text-center">Predicted Results</p>
                  <PieChart
                    data={[
                      {
                        title: 'Not Fake',
                        value: arr[Math.floor(Math.random() * arr.length)],
                        color: '#0092CD',
                      },
                      {
                        title: 'Fake',
                        value: arr[Math.floor(Math.random() * arr.length)],
                        color: '#FF3334',
                      },
                    ]}
                  />
                </div>
                <ul className="list-unstyled d-flex m-0 justify-content-center align-items-center mt-3">
                  <li
                    className="mx-2 rounded"
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#0092CD',
                    }}
                  ></li>
                  <p className="m-0 mt-1">Not Suspected</p>

                  <li
                    className="mx-2 rounded"
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#FF3334',
                    }}
                  ></li>
                  <p className="m-0 mt-1">Suspected</p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FinalReport;
