import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { PieChart } from 'react-minimal-pie-chart';
import { Chart } from 'react-google-charts';
import RecentReport from './RecentReport';
import Pattern from './Pattern';

const FinalReport = ({ data }) => {
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
                      value: data.semantic.Positive,
                      color: '#0092CD',
                    },
                    {
                      title: 'Negative',
                      value: data.semantic.Negative,
                      color: '#FF3334',
                    },
                    {
                      title: 'Neutral',
                      value: data.semantic.Neutral,
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
                      value: data.real_users.length,
                      color: '#0092CD',
                    },
                    {
                      title: 'Fake',
                      value: data.fake_users.length,
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
                  style={{ height: `${data.vp.vp}%` }}
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
            <div className="col shadow p-5">
              <div className="container-fluid">
                <div className="row">
                  <div className="col p-0">
                    <h3>Suspecious Profile Pattern</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Pattern></Pattern>
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
