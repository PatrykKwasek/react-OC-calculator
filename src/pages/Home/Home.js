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

  const [themeColor, setThemeColor] = useState('');

  const getDataFromLocalStorage = () => {
    if (JSON.parse(localStorage.getItem('brandName')) === null) {
      localStorage.setItem('brandName', JSON.stringify({make_code: "351", make_name: "ACURA"}));
      localStorage.setItem('modelName', JSON.stringify({model_name: "Integra"}));
      localStorage.setItem('fuelName', JSON.stringify({fuel_code: "", fuel_name: ""}));
    } else {
      setBrandParam(JSON.parse(localStorage.getItem('brandName')))
    }

    if (JSON.parse(localStorage.getItem('modelName')) === null) {
      localStorage.setItem('modelName', JSON.stringify({model_name: ""}));
      setModelParam({model_name: ""});
    } else {
      setModelParam(JSON.parse(localStorage.getItem('modelName')))
    }

    if (JSON.parse(localStorage.getItem('fuelName')) === null) {
      localStorage.setItem('fuelName', JSON.stringify({fuel_code: "", fuel_name: ""}));
    } else {
      setFuelParam(JSON.parse(localStorage.getItem('fuelName')))
    }

    setThemeColor(localStorage.getItem('widget-theme-color') || 'orange')
  }

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
    getDataFromLocalStorage();
  }, []);

  useEffect(() => {
    getInitialData();
  }, [brandParam, modelParam, fuelParam])

  const handleBrand = (event, values) => {
    getData(`${values.make_name}/models`).then(response => {
      setModels(response.data);
    });

    setBrandParam(values);
    localStorage.setItem('brandName', JSON.stringify(values));
    setModelParam('');
    setFuelParam('');
    localStorage.setItem('modelName', JSON.stringify({model_name: ""}));
    localStorage.setItem('fuelName', JSON.stringify({fuel_code: "", fuel_name: ""}));
    setFuels([])
  }

  const handleModel = (event, values) => {
    getData(`${brandInputParam}/models/${values.model_name}/fuels/`).then(response => {
      setFuels(response.data);
    });

    setModelParam(values);
    localStorage.setItem('modelName', JSON.stringify(values));
    setFuelParam('');
    localStorage.setItem('fuelName', JSON.stringify({fuel_code: "", fuel_name: ""}));
  }

  const handleFuel = (event, values) => {
    setFuelParam(values);
    localStorage.setItem('fuelName', JSON.stringify(values));
  }

  const setColor = (e) => {
    const { value } = e.target;
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
      handleFuel={handleFuel}
      fuelInputParam={fuelInputParam}
      setFuelInputParam={setFuelInputParam}
      fuels={fuels}
      setColor={setColor}
      themeColor={themeColor}
    />
  )
}