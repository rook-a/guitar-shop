import { Link } from 'react-router-dom';
import Catalog from '../../components/catalog/catalog';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

function Main(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to="/">
                Главная
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="/">
                Каталог
              </Link>
            </li>
          </ul>

          <Catalog />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Main;
