import React, { useEffect, useState } from 'react';

import axios from 'axios';

import logo from '../../assets/Logotyp-Punkta.png';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { getData } from '../../components/Api/Api';

import './HomeContent.scss';

export const Home = () => {
  const [brandParam, setBrandParam] = useState('');
  const [brands, setBrands] = useState([]);

  const [modelParam, setModelParam] = useState('');
  const [models, setModels] = useState([]);

  const [fuelParam, setFuelParam] = useState('');
  const [fuels, setFuels] = useState([]);

  const getBrands = () => {
    getData('').then(response => {
      console.log('useEffect response - ', response.data);
      setBrands(response.data);
    })
  }

  useEffect(() => {
    getBrands();
  }, [])

  const handleBrand = (event, values) => {
    setBrandParam(values.make_name);
    setModelParam('');
    setFuelParam('');

    getData(`${values.make_name}/models`)
      .then(response => {
        console.log('GET MODELS', response);
        setModels(response.data);
      })
  }

  const handleModel = (event, values) => {
    setModelParam(values.model_name);
    setFuelParam('');

    getData(`${brandParam}/models/${values.model_name}/fuels/`)
      .then(response => {
        console.log('GET FUELS', response);
        setFuels(response.data);
      })
  }

  const handleFuel = (event, values) => {
    setFuelParam(values.fuel_name);
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
              <Autocomplete
                options={brands}
                inputValue={brandParam}
                getOptionLabel={option => option.make_name}
                onChange={handleBrand}
                renderInput={(params) => <TextField {...params} label="Marka" />}
                className='select'
              />
            </div>

            <div className='select-item'>
              <Autocomplete
                options={models}
                inputValue={modelParam}
                getOptionLabel={option => option.model_name}
                onChange={handleModel}
                renderInput={(params) => <TextField {...params} label="Model" />}
                className='select'
                disabled={models.length === 0}
              />
            </div>

            <div className='select-item'>
              <Autocomplete
                options={fuels}
                inputValue={fuelParam}
                getOptionLabel={option => option.fuel_name}
                onChange={handleFuel}
                renderInput={(params) => <TextField {...params} label="Typ paliwa" />}
                className='select'
                disabled={fuels.length === 0}
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