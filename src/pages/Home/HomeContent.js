import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import logo from '../../assets/Logotyp-Punkta.png';

import './HomeContent.scss';

export const HomeContent = ({
  brandParam,
  handleBrand,
  brandInputParam,
  setBrandInputParam,
  brands,
  modelParam,
  handleModel,
  modelInputParam,
  setModelInputParam,
  models,
  fuelParam,
  setFuelParam,
  fuelInputParam,
  setFuelInputParam,
  fuels,
  themeColor,
  setColor
}) => {
  return (
    <div className='wrapper'>
      <div className='container'>
        <div className={`header ${themeColor}`}>
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
                    size='small'
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
                    size='small'
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
                    size='small'
                  />
                }
              />
            </div>
          </div>

          <div className='submit'>
            <Button
              variant="contained"
              href={`https://punkta.pl/ubezpieczenie-oc-ac/kalkulator-oc-ac?make_name=${brandInputParam}&model_name=${modelInputParam}`}
              className={`btn ${themeColor}`}
              // disabled={!brandInputParam || !modelInputParam || !fuelInputParam}
            >
              <span>OBLICZ SKŁADKĘ</span>
            </Button>
          </div>
        </form>
      </div>

      <div className='color-switcher'>
        <h2>COLORS</h2>
        <div className='btn-container'>
          <button onClick={setColor} className='button yellow' value='yellow'></button>
          <button onClick={setColor} className='button blue' value='blue'></button>
          <button onClick={setColor} className='button orange' value='orange'></button>
        </div>
      </div>
    </div>
  )
}