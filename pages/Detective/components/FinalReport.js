import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { PieChart } from 'react-minimal-pie-chart';
import { Chart } from 'react-google-charts';
import RecentReport from './RecentReport';
import Pattern from './Pattern';
import { generateSlug } from 'random-word-slugs';

const FinalReport = ({ data }) => {
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

  console.log(data.fake_users);
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
          <h4>Final Anaylsis</h4>
        </div>
      </div>
      <div className="row my-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-4 shdaow bg-dark p-4">
              <div className="p-5">
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
                  className="mx-3"
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#0092CD',
                  }}
                ></li>
                <p className="m-0 mt-1">Positive</p>
                <li
                  className="mx-3"
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#F2B705',
                  }}
                ></li>
                <p className="m-0 mt-1">Neutral</p>
                <li
                  className="mx-3"
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#FF3334',
                  }}
                ></li>
                <p className="m-0 mt-1">Negative</p>
              </ul>
            </div>
            <div className="col-4 d-flex flex-column justify-content-center align-items-center">
              <div className="p-5">
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
                  className="mx-3"
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#0092CD',
                  }}
                ></li>
                <p className="m-0 mt-1">Not Suspected</p>

                <li
                  className="mx-3"
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#FF3334',
                  }}
                ></li>
                <p className="m-0 mt-1">Suspected</p>
              </ul>
            </div>
            <div className="col-4 shdaow bg-dark px-3 py-5">
              <div className="bar__chart w-100 h-100 px-4 py-2 d-flex align-items-end justify-content-center">
                <div
                  className="user bar mx-2 rounded shadow"
                  style={{
                    height: `${
                      data.real_users.length + data.fake_users.length
                    }%`,
                  }}
                ></div>
                <div
                  className="true bar mx-2 rounded shadow"
                  style={{ height: `${data.vp.vp - 2}%` }}
                ></div>
                <div
                  className="false bar mx-2 rounded shadow"
                  style={{ height: `${data.vp.non_vp + 1}%` }}
                ></div>
              </div>
              <ul className="list-unstyled d-flex m-0 justify-content-center align-items-center ">
                <li
                  className="mx-3"
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#075ad3',
                  }}
                ></li>
                <p className="m-0 mt-1">Users</p>

                <li
                  className="mx-3"
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: 'orange',
                  }}
                ></li>
                <p className="m-0 mt-1">Verified</p>
                <li
                  className="mx-3"
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#fe0000',
                  }}
                ></li>
                <p className="m-0 mt-1">Not Verified</p>
              </ul>
            </div>
          </div>
          <div className="row my-4">
            <div className="col bg-dark p-4">
              <p className="text-center">Words Count</p>
              <ul className="word_chart d-flex px-2 align-items-end mt-5 pt-5">
                {rwords.map((word, index) => {
                  return (
                    <div
                      className="d-flex flex-column words w-100 mt-5"
                      key={index}
                    >
                      <li
                        className="b mx-1"
                        style={{
                          backgroundColor:
                            barArrColor[
                              Math.floor(Math.random() * barArrColor.length)
                            ],
                          height: `${
                            Math.random() * 200 == 0 ? 10 : Math.random() * 200
                          }px`,
                        }}
                      ></li>
                      <p className="my-3">{word}</p>
                    </div>
                  );
                })}
              </ul>
              {/* <div className=" my-2 px-2 w-100 words d-flex">
                <p>About</p>
              </div> */}
              <ul className="list-unstyled d-flex m-0 mt-4 justify-content-center align-items-center ">
                <li
                  className="mx-3"
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: 'orange',
                  }}
                ></li>
                <p className="m-0 mt-1">X-Axis ilegitimate Words</p>
                <li
                  className="mx-3"
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#fe0000',
                  }}
                ></li>
                <p className="m-0 mt-1">Y-Axis Number of Occurrences</p>
              </ul>
            </div>
          </div>
          <div className="row my-4">
            <div className="col shadow p-5">
              <div className="container-fluid">
                <div className="row">
                  <div className="col p-0">
                    <h3>Suspecious Profile Pattern</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Pattern data={data.fake_users}></Pattern>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FinalReport;
