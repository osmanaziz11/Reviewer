import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout title="About">
      <div className="container">
        <div className="row">
          <div className="col">
            <div
              className="bg-dark"
              style={{ width: '30%', height: '30%' }}
            ></div>
            {/* <Chart options={options} series={series} type="bar" width="500" /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default About;
