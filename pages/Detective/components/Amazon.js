import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useState } from 'react';

import useCustom from '../../../hooks/custom';
import Layout from '../../../components/Layout';
import RecentReport from './RecentReport';
import AnaylsisRepo from './AnaylsisRepo';

const Amazon = () => {
  const { setProgress, theme } = useCustom();
  const router = useRouter();
  const [UrlStatus, setUrlStatus] = useState(false);
  const [anaylsis_status, setAnaylsis_Status] = useState(false);
  const [URL, setURL] = useState('');

  const retrieveProduct = async (event) => {
    event.preventDefault();
    setProgress(20);
    setURL(document.getElementById('url').value);

    setAnaylsis_Status(true);
    setProgress(100);
  };
  const isUrlValid = (event) => {
    const pattern =
      /^(https:\/\/www.amazon.|www.amazon.)+((com.be)|(com.au)|(com)|(com.tr)|(co.uk)|(ae)|(co.jp)|(it)|(in)|(de)|(fr)|(cn)|(ca))+(\/)+(([a-zA-z-0-9]*\/dp\/)|dp\/)+([A-Z0-9]{10})+[\/a-z8=_?UTF]*/;
    let check = pattern.test(event.target.value);

    check ? setUrlStatus(true) : setUrlStatus(false);
  };
  return (
    <Layout title="Amazon">
      {!anaylsis_status ? (
        <div className="container amazon_board_container">
          <div className="row">
            <div className="col">
              <p>
                <Link href="/Detective">
                  <a>Dectective </a>
                </Link>
                / {router.query.slug}
              </p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col URL__container w-100 px-3">
              <form onSubmit={retrieveProduct}>
                <div className="URL_box w-100 d-flex p-2 rounded justify-content-between">
                  <input
                    type="text"
                    name=""
                    id="url"
                    required
                    placeholder="Copy & Paste an Amazon Product Page URL"
                    onChange={isUrlValid}
                  />
                  <button
                    className={`px-4 py-2 ${!UrlStatus ? 'danger' : 'green'}`}
                    disabled={!UrlStatus ? 1 : 0}
                  >
                    Fetch Product
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col p-0">
              <h3>Recent Reports</h3>
            </div>
          </div>
          <div className="row px-3 mb-5">
            <div className="col product__container rounded p-4">
              <RecentReport></RecentReport>
            </div>
          </div>
        </div>
      ) : (
        <AnaylsisRepo url={URL} />
      )}
    </Layout>
  );
};
export default Amazon;
