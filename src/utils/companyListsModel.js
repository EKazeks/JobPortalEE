import React, { useRef, useEffect } from 'react';

const CompanyListsModel = ({ companyLists, loadSelectedCompany, formName, closeCompanyLists }) => {
  const componentRef = useRef();

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
    function handleClick(e) {
      if (componentRef && componentRef.current) {
        const ref = componentRef.current;
        if (!ref.contains(e.target)) {
          closeCompanyLists();
        }
      }
    }
  }, [closeCompanyLists]);

  const companyListsUl = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxHeight: 160,
  };
  const companyListsli = { padding: '7px', margin: 0 };
  return (
    <ul className="companyLists" style={companyListsUl} ref={componentRef}>
      {companyLists &&
        companyLists.map((list, index) => (
          <li
            key={index}
            style={companyListsli}
            onClick={() =>
              loadSelectedCompany(
                list.detailsUri == null
                  ? `https://avoindata.prh.fi/opendata/bis/v1/${list.businessId}`
                  : list.detailsUri && list.detailsUri.replace(/http/g, 'https'),
                formName,
              )
            }
          >
            {list.name}
          </li>
        ))}
    </ul>
  );
};

export default CompanyListsModel;
