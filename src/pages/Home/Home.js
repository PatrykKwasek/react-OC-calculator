import React, { useEffect, useState } from 'react';

import axios from 'axios';

import logo from '../../assets/Logotyp-Punkta.png';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { exampleBrands } from '../../data/brands';
import { exampleModels } from '../../data/models';
import { exampleFuels } from '../../data/fuels';

import './HomeContent.scss';

// brands -> https://api-dev.mfind.pl/cars
// models -> https://api-dev.mfind.pl/cars/${brand}/models
// fuels  -> https://api-dev.mfind.pl/cars/${brand}/models/${model}/fuels/

export const Home = () => {
  const [appParams, setAppParams] = useState({
    'brand': '',
    'model': '',
    'fuel': ''
  });
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [fuels, setFuels] = useState([]);

  // Decide what API call should be executed MAY fix to SWITCH...
  // const getApiData = () => {
  //   if (appParams.brand !== '' && appParams.model !== '' && appParams.fuel !== '') {
  //     axios.get(`https://api-dev.mfind.pl/cars/${brand}/models/${model}/fuels/`)
  //       .then(response => {
  //         setFuels(response)
  //       })
  //   } else if (appParams.brand !== '' && appParams.model !== '') {
  //     axios.get(`https://api-dev.mfind.pl/cars/${brand}/models`)
  //       .then(response => {
  //         setModels(response)
  //       })
  //   } else {
  //     axios.get(`https://api-dev.mfind.pl/cars`)
  //       .then(response => {
  //         setBrands(response)
  //       })
  //   }
  // }

  const getData = () => {
    axios.get('https://api-dev.mfind.pl/cars', {
      headers: {
        'Authorization': 'Basic YXV0a2FfYXBpOmF1dGthX2FwaV8yMDE5'
      }
    }).then(response => {
      console.log('Response', response);
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setAppParams({
      ...appParams,
      [name]: value
    })
  };

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
              <Autocomplete
                disablePortal
                options={exampleBrands}
                getOptionLabel={option => option.make_name}
                renderInput={(params) => <TextField {...params} label="Marka" />}
                className='select'
              />
            </div>

            <div className='select-item'>
              {/* Map MODELS */}
              <Autocomplete
                disablePortal
                options={exampleModels}
                getOptionLabel={option => option.model_name}
                renderInput={(params) => <TextField {...params} label="Model" />}
                className='select'
              />
            </div>

            <div className='select-item'>
              {/* Map FUELS */}
              <Autocomplete
                disablePortal
                options={exampleFuels}
                getOptionLabel={option => option.fuel_name}
                renderInput={(params) => <TextField {...params} label="Typ paliwa" />}
                className='select'
              />
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