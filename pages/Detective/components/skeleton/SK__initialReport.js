import Skeleton from 'react-loading-skeleton';

const SK__initialReport = () => {
  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-md-4 d-flex flex-column  shadow p-3 justify-content-center align-items-center">
          <p className="w-100 p-0">
            <Skeleton containerClassName="h-100"></Skeleton>
          </p>
          <p className="w-100 p-0">
            <Skeleton containerClassName="h-100"></Skeleton>
          </p>

          <div className="product__box ">
            <Skeleton containerClassName="h-100"></Skeleton>
          </div>
        </div>
        <div className="col-md-8 product__desc d-flex flex-column justify-content-center align-items-center">
          <div className="container anaylsis__container  w-100 h-100  shadow  p-3">
            <div className="row">
              <div className="col">
                <h4 className="text-center ">
                  <Skeleton width={350}></Skeleton>
                </h4>
              </div>
            </div>
            <div className="row my-3">
              <div className="col d-flex justify-content-center">
                <ul className="list-unstyled d-flex m-0 p-0">
                  <li className="mx-3">
                    <Skeleton circle width={80} height={80}></Skeleton>
                    <p className="m-0 p-0 mt-3">
                      <Skeleton></Skeleton>
                    </p>
                  </li>
                  <li className="mx-3">
                    <Skeleton circle width={80} height={80}></Skeleton>
                    <p className="m-0 p-0 mt-3">
                      <Skeleton></Skeleton>
                    </p>
                  </li>
                  <li className="mx-3">
                    <Skeleton circle width={80} height={80}></Skeleton>
                    <p className="m-0 p-0 mt-3">
                      <Skeleton></Skeleton>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="bar"></div>
              </div>
            </div>
            <form action="">
              <div className="row">
                <div className="col d-flex flex-column justify-content-center options align-items-center">
                  <p className="text-center">
                    <Skeleton width={350}></Skeleton>
                  </p>

                  <Skeleton width={350} height={40}></Skeleton>
                  <p className="text-center mt-3">
                    <Skeleton width={350}></Skeleton>
                  </p>
                  <Skeleton width={350} height={40}></Skeleton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SK__initialReport;
