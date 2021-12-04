import React, { useEffect, useState } from 'react';

import { getData } from '../../components/Api/Api';

import { HomeContent } from './HomeContent';

export const Home = () => {
  const [brandParam, setBrandParam] = useState({make_code: "351", make_name: "ACURA"});
  const [brandInputParam, setBrandInputParam] = useState('');
  const [brands, setBrands] = useState([]);

  const [modelParam, setModelParam] = useState({model_name: "Integra"});
  const [modelInputParam, setModelInputParam] = useState('');
  const [models, setModels] = useState([]);

  const [fuelParam, setFuelParam] = useState({fuel_code: "", fuel_name: ""});
  const [fuelInputParam, setFuelInputParam] = useState('');
  const [fuels, setFuels] = useState([]);

  const [themeColor, setThemeColor] = useState(
    localStorage.getItem('widget-theme-color') || 'orange'
  );

  const getInitialData = () => {
    getData('')
      .then(response => {
        setBrands(response.data);
      })

    if (brandParam.make_name) {
      getData(`${brandParam.make_name}/models`).then(response => {
        setModels(response.data);
      });
    }

    if (modelParam.model_name) {
      getData(`${brandParam.make_name}/models/${modelParam.model_name}/fuels/`).then(response => {
        setFuels(response.data);
      });
    }
  }

  useEffect(() => {
    getInitialData();
  }, [])

  const handleBrand = (event, values) => {
    getData(`${values.make_name}/models`).then(response => {
      setModels(response.data);
    });

    setBrandParam(values);
    setModelParam('');
    setFuelParam('');
    setFuels([])
  }

  const handleModel = (event, values) => {
    getData(`${brandInputParam}/models/${values.model_name}/fuels/`).then(response => {
      setFuels(response.data);
    });

    setModelParam(values);
    setFuelParam('');
  }

  const setColor = (e) => {
    const {value} = e.target;
    localStorage.setItem('widget-theme-color', value);
    setThemeColor(value);
  }

  return (
    <HomeContent 
      brandParam={brandParam}
      handleBrand={handleBrand}
      brandInputParam={brandInputParam}
      setBrandInputParam={setBrandInputParam}
      brands={brands}
      modelParam={modelParam}
      handleModel={handleModel}
      modelInputParam={modelInputParam}
      setModelInputParam={setModelInputParam}
      models={models}
      fuelParam={fuelParam}
      setFuelParam={setFuelParam}
      fuelInputParam={fuelInputParam}
      setFuelInputParam={setFuelInputParam}
      fuels={fuels}
      setColor={setColor}
      themeColor={themeColor}
    />
  )
}