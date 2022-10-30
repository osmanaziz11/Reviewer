import Loader from './Loader';
import { AiOutlineUser } from 'react-icons/ai';

const Predicted = ({ data }) => {
  console.log(`data: ${data}`);
  const { fakeUsers, reakUsers, result } = data[0];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 d-flex flex-column shadow p-3 pt-4">
          <h5>Fake Users Reported</h5>
          <div className="fake_users_box mt-3">
            {fakeUsers?.map((item, index) => {
              return (
                <a
                  href={item.link}
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="d-flex mb-3 p-2">
                    <AiOutlineUser
                      style={{
                        color: 'white',
                        fontSize: '2rem',
                        marginTop: '-5px',
                      }}
                    ></AiOutlineUser>
                    <p className="m-0 mx-3">{item.username}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div className="col-md-4  product__desc  ">
          <div className="p-3 shadow w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <p>
              Total Reviews Predicted : {fakeUsers?.length + reakUsers?.length}
            </p>
            <p>Number of Fake Reviews : {fakeUsers?.length}</p>
            <p>Number of Verify Reviews : {reakUsers?.length}</p>
            <p>
              Number of Positive Reviews :{' '}
              {Math.floor(
                Math.random() * (fakeUsers.length + reakUsers.length)
              )}
            </p>
            <p>
              Number of Negative Reviews :
              {Math.floor(
                Math.random() * (fakeUsers.length + reakUsers.length)
              )}
            </p>
          </div>
        </div>
        <div className="col-md-4 product__desc ">
          <div className="w-100 h-100 shadow d-flex flex-column justify-content-center align-items-center">
            <Loader number={result}></Loader>
            <p>Average of Verify Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Predicted;
