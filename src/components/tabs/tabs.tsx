import { useState } from 'react';
import { adaptTypeToClient } from '../../utils/utils';

interface TabsProps {
  vendorCode: string;
  type: string;
  stringCount: number;
  description: string;
}

function Tabs({ vendorCode, type, stringCount, description }: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState({
    characteristics: true,
    description: false,
  });

  const handleClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    if (evt.currentTarget.id === 'characteristics') {
      setActiveTab({
        characteristics: true,
        description: false,
      });
    }

    if (evt.currentTarget.id === 'description') {
      setActiveTab({
        characteristics: false,
        description: true,
      });
    }
  };
  console.log(activeTab);
  return (
    <div className="tabs">
      <a
        onClick={handleClick}
        className={`button button--medium tabs__button ${!activeTab.characteristics && 'button--black-border'}`}
        href="/"
        id="characteristics">
        Характеристики
      </a>
      <a
        onClick={handleClick}
        className={`button button--medium tabs__button ${!activeTab.description && 'button--black-border'}`}
        href="/"
        id="description">
        Описание
      </a>
      <div className="tabs__content">
        {activeTab.characteristics && (
          <table className="tabs__table">
            <tbody>
              <tr className="tabs__table-row">
                <td className="tabs__title">Артикул:</td>
                <td className="tabs__value">{vendorCode}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Тип:</td>
                <td className="tabs__value">{adaptTypeToClient(type)}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Количество струн:</td>
                <td className="tabs__value">{stringCount} струнная</td>
              </tr>
            </tbody>
          </table>
        )}
        {activeTab.description && <p className="tabs__product-description">{description}</p>}
      </div>
    </div>
  );
}

export default Tabs;
