import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import CountrySelect from './CountrySelect';
import DataBoxes from './DataBoxes';
import Header from './Header';
import { Title } from './Title';

export const Covid = () => {
  const [title, setTitle] = useState('Global');
  const [dataDate, setDataDate] = useState('');
  const [stats, setStats] = useState({});
  const [countries, setCountries] = useState([]);
  const [select, setSelect] = useState(0);
  const [loading, setLoading] = useState('');

  //se carga componente y se ejecuta la función
  useEffect(() => {
    getDataCovid();
  }, []);

  const url = 'https://api.covid19api.com/summary';

  const getDataCovid = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);
      setLoading(false);
      setTitle('Global');
      setSelect(0);
      setDataDate(moment(data.Date).format('MMMM Do YYYY, h:mm:ss a'));
      setStats(data.Global);
      setCountries(data.Countries);
    } catch (error) {
      console.log('error en getDataCovid', error.message);
    }
  };

  const onChange = (e) => {
    const countrySelectID = e.target.value;
    if (countrySelectID === '0') {
      return getDataCovid();
    }
    const country = countries.find((item) => item.ID === countrySelectID);
    setSelect(countrySelectID);
    setStats(country);
    setTitle(country.Country);
  };

  return (
    <div>
      <Header />
      {loading ? (
        <div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <div className='container'>
          <Title title={title} dataDate={dataDate} />
          <DataBoxes stats={stats} />
          <CountrySelect
            select={select}
            onChange={onChange}
            countries={countries}
          />
          {stats.Country && (
            <button className='btn btn-success' onClick={() => getDataCovid()}>
              Clean Country
            </button>
          )}
        </div>
      )}
    </div>
  );
};
