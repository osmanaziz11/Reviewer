import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useState } from 'react';

import Product from './Product';
import useCustom from '../../../hooks/custom';
import Layout from '../../../components/Layout';

const Amazon = () => {
  const { setProgress } = useCustom();
  const router = useRouter();
  const [product, setProduct] = useState([]);

  const fetchProduct = async (event) => {
    event.preventDefault();
    setProgress(20);
    try {
      let URL = document.getElementById('url').value;
      const req = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}api/pd`, {
        method: 'POST',
        body: JSON.stringify({ url: URL }),
        headers: { 'content-type': 'application/json' },
      });
      setProgress(50);
      const resp = await req.json();
      if (resp) {
        setProgress(100);
        if (resp.status == 1) {
          setProduct([resp.product[0]]);
        }
      } else {
        setProgress(100);
      }
    } catch (error) {
      setProgress(100);
    }
  };

  const [UrlStatus, setUrlStatus] = useState(false);
  const isUrlValid = (event) => {
    const pattern =
      /^(https:\/\/www.amazon.|www.amazon.)+((com.be)|(com.au)|(com)|(com.tr)|(co.uk)|(ae)|(co.jp)|(it)|(in)|(de)|(fr)|(cn)|(ca))+(\/)+(([a-zA-z-0-9]*\/dp\/)|dp\/)+([A-Z0-9]{10})+[\/a-z8=_?UTF]*/;
    let check = pattern.test(event.target.value);

    check ? setUrlStatus(true) : setUrlStatus(false);
  };
  return (
    <Layout title="Amazon">
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
            <form onSubmit={fetchProduct}>
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
                  className={`px-4 py-2 green ${
                    UrlStatus ? 'green' : 'danger'
                  }`}
                  disabled={!UrlStatus ? 1 : 0}
                >
                  Fetch Product
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row px-3 mb-5">
          <div className="col product__container rounded p-4">
            {product.length > 0 ? (
              <Product data={product}></Product>
            ) : (
              <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
                <h2>Hurry up !</h2>
                <p className="text-center">
                  Paste product link to see the magic
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Amazon;
