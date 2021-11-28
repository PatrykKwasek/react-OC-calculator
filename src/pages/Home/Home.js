import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { getData } from '../../components/Api/Api';
import { Button } from '@mui/material';

import logo from '../../assets/Logotyp-Punkta.png';

import './HomeContent.scss';

export const Home = () => {
  const [data, setData] = useState();
  const [appParams, setAppParams] = useState({
    'brand': '',
    'model': '',
    'fuel': ''
  })

  // const getData = () => {
  //   axios.get('https://api-dev.mfind.pl/cars', {
  //     headers: {
  //       'Authorization': 'Basic YXV0a2FfYXBpOmF1dGthX2FwaV8yMDE5'
  //     }
  //   }).then(response => {
  //     console.log('Response', response);
  //     setData(response)
  //   })
  // }

  // const getApiData = () => {
  //   getData()
  //     .then(response => {
  //       console.log('Response', response);
  //       // setData(response.data);
  //     })
  // }

  // useEffect(() => {
  //   getData();
  // }, [])

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setAppParams({
      ...appParams,
      [name]: value
    })
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='logo'>
          <img src={logo} alt='logo' />

          <div className='paragraph'>
            <span>OSZCZĘDŹ NAWET 580 ZŁOTYCH NA AC</span>
          </div>
        </div>

        <form className='form-container'>
          <div className='select-container'>
            <div className='select-item'>
              <select className='select' name='brand' onChange={handleSelect}>
                <option value='ABARTH'>ABARTH</option>
                <option value='ACURA'>ACURA</option>
                <option value='ALFA ROMEO'>ALFA ROMEO</option>
                <option value='ALPINE'>ALPINE</option>
                <option value='ASTON MARTIN'>ASTON MARTIN</option>
              </select>
            </div>

            <div className='select-item'>
              <select className='select' name='model' onChange={handleSelect}>
                <option value='145'>145</option>
                <option value='146'>146</option>
                <option value='147'>147</option>
                <option value='155'>155</option>
                <option value='156'>156</option>
              </select>
            </div>

            <div className='select-item'>
              <select className='select' name='fuel' onChange={handleSelect}>
                <option value='2010'>2010</option>
                <option value='2009'>2009</option>
                <option value='2008'>2008</option>
                <option value='2007'>2007</option>
                <option value='2006'>2006</option>
              </select>
            </div>
          </div>

          <div className='submit'>
            <button className='btn'>OBLICZ SKŁADKĘ</button>
          </div>
        </form>
      </div>
    </div>
  )
}