import React, { useEffect, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { getData } from '../../components/Api/Api';

import logo from '../../assets/Logotyp-Punkta.png';
import './HomeContent.scss';

export const Home = () => {
  const [brandParam, setBrandParam] = useState({make_code: "351", make_name: "ACURA"});
  const [brandInputParam, setBrandInputParam] = useState('');
  const [brands, setBrands] = useState([]);

  const [modelParam, setModelParam] = useState({model_name: "Integra"});
  const [modelInputParam, setModelInputParam] = useState('');
  const [models, setModels] = useState([]);

  const [fuelParam, setFuelParam] = useState({});
  const [fuelInputParam, setFuelInputParam] = useState('');
  const [fuels, setFuels] = useState([]);

  const getInitialData = () => {
    getData('')
      .then(response => {
        console.log('useEffect response - ', response.data);
        setBrands(response.data);
      })

    if (brandParam.make_name) {
      getData(`${brandParam.make_name}/models`).then(response => {
        console.log('GET MODELS', response);
        setModels(response.data);
      });
    }

    if (modelParam.model_name) {
      getData(`${brandParam.make_name}/models/${modelParam.model_name}/fuels/`).then(response => {
        console.log('GET FUELS', response);
        setFuels(response.data);
      });
    }
  }

  useEffect(() => {
    getInitialData();
  }, [])

  const handleBrand = (event, values) => {
    getData(`${values.make_name}/models`).then(response => {
      console.log('GET MODELS', response);
      setModels(response.data);
    });

    setBrandParam(values);
    setModelParam('');
    setFuelParam('');
    setFuels([])
  }

  const handleModel = (event, values) => {
    getData(`${brandInputParam}/models/${values.model_name}/fuels/`).then(response => {
      console.log('GET FUELS', response);
      setFuels(response.data);
    });

    setModelParam(values);
    setFuelParam('');
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
            <Button
              variant="contained"
              href={`https://punkta.pl/ubezpieczenie-oc-ac/kalkulator-oc-ac?make_name=${brandInputParam}&model_name=${modelInputParam}`}
              // className='btn'
              disabled={!brandInputParam || !modelInputParam || !fuelInputParam}
            >
              OBLICZ SKŁADKĘ
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}