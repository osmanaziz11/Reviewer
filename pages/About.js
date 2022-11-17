import Layout from '../components/Layout';
import { Chart } from 'react-google-charts';

const About = () => {
  const data = [
    ['Users', 'Verified', 'Non verified'],

    ['60', 50, 460],
  ];

  return (
    <Layout title="About">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="bg-dark" style={{ width: '30%', height: '30%' }}>
              <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={data}
                options={options}
              />
            </div>
            {/* <Chart options={options} series={series} type="bar" width="500" /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default About;
