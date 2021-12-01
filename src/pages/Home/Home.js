import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { getData } from '../../components/Api/Api';

import logo from '../../assets/Logotyp-Punkta.png';
import './HomeContent.scss';

export const Home = () => {
  const [brandParam, setBrandParam] = useState('');
  const [brandInputParam, setBrandInputParam] = useState('');
  const [brands, setBrands] = useState([]);

  const [modelParam, setModelParam] = useState('');
  const [modelInputParam, setModelInputParam] = useState('');
  const [models, setModels] = useState([]);

  const [fuelParam, setFuelParam] = useState('');
  const [fuelInputParam, setFuelInputParam] = useState('');
  const [fuels, setFuels] = useState([]);

  const getBrands = () => {
    getData('')
      .then(response => {
        console.log('useEffect response - ', response.data);
        setBrands(response.data);
      })
  }

  useEffect(() => {
    getBrands();
  }, [])

  const handleBrand = (event, values) => {
    setBrandParam(values);
    setModelParam('');
    setFuelParam('');

    getData(`${values.make_name}/models`).then(response => {
      console.log('GET MODELS', response);
      setModels(response.data);
    })
  }

  const handleModel = (event, values) => {
    setModelParam(values);
    setFuelParam('');

    getData(`${brandInputParam}/models/${values.model_name}/fuels/`).then(response => {
      console.log('GET MODELS', response);
      setFuels(response.data);
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
              <Autocomplete
                disableClearable
                value={brandParam}
                onChange={handleBrand}
                // onChange={(event, newValue) => {
                //   setBrandParam(newValue);
                //   setModelParam('');
                //   setFuelParam('');

                //   getData(`${newValue.make_name}/models`).then(response => {
                //     console.log('GET MODELS', response);
                //     setModels(response.data);
                //   })
                // }}
                inputValue={brandInputParam}
                onInputChange={(event, newInputValue) => {
                  setBrandInputParam(newInputValue);
                }}
                options={brands}
                className='select'
                getOptionLabel={option => option.make_name || ''}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Marka"
                  />
                }
              />
            </div>

            <div className='select-item'>
              <Autocomplete
                disableClearable
                value={modelParam}
                onChange={handleModel}
                // onChange={(event, newValue) => {
                //   setModelParam(newValue);
                //   setFuelParam('');

                //   getData(`${brandInputParam}/models/${newValue.model_name}/fuels/`).then(response => {
                //     console.log('GET MODELS', response);
                //     setFuels(response.data);
                //   })
                // }}
                inputValue={modelInputParam}
                onInputChange={(event, newInputValue) => {
                  setModelInputParam(newInputValue);
                }}
                options={models}
                className='select'
                disabled={models.length === 0}
                getOptionLabel={option => option.model_name || ''}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Model"
                  />
                }
              />
            </div>

            <div className='select-item'>
              <Autocomplete
                disableClearable
                value={fuelParam}
                onChange={(event, newValue) => {
                  setFuelParam(newValue);
                }}
                inputValue={fuelInputParam}
                onInputChange={(event, newInputValue) => {
                  setFuelInputParam(newInputValue);
                }}
                options={fuels}
                className='select'
                disabled={fuels.length === 0}
                getOptionLabel={option => option.fuel_name || ''}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Typ paliwa"
                  />
                }
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