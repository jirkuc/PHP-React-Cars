import { useState, useEffect } from "react";
import "./App.css";

import FilterForm from "./components/FilterForm/FilterForm";
import CarTable from "./components/CarTable/CarTable";
import UniForm from "./components/UniForm/UniForm";
import axios from "axios";

function App() {
  const [cars, setCars] = useState([]);
  const [carsToShow, setCarsToShow] = useState([]);
  const [carToChange, setCarToChange] = useState({
    id: 0,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });
  const [uniformFunction, setUniformFunction] = useState("addCar");

  //  --- načtení všech dat o autech z databáze ---
  const getCars = () => {
    axios
      .get(
        // "http://localhost/vsbkurs-php-react-cars-backend/index.php?action=getAll"
        "https://jirkuc.maweb.eu/projects/php_react_cars/server/index.php?action=getAll"
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCars(response.data);
          setCarsToShow(response.data);
        }
      })
      .catch((error) => {
        console.error("Nastala chybka", error);
        alert(`Nastala chybka ${error}`);
      });
  };

  useEffect(() => {
    getCars();
  }, []);

  //// to test car filtering by car ID
  // useEffect(() => {
  //   filterCars([1, 2, 3]);   // posílám pole, tak to musí být pole!!!!!
  // }, []);

  const filterCars = (ids) => {
    const param = ids.join();
    console.log(param);
    axios
      .get(
        // `http://localhost/vsbkurs-php-react-cars-backend/index.php?action=getSpec&ids=${param}`
        `https://jirkuc.maweb.eu/projects/php_react_cars/server/index.php?action=getSpec&ids=${param}`
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCarsToShow(response.data);
        }
      })
      .catch((error) => {
        console.error("Nastala chybka", error);
        alert(`Nastala chybka ${error}`);
      });
  };

  const handleFilter = (selBrands) => {
    const temp = cars.filter((car) => selBrands.includes(car.brand));
    const ids = temp.map((car) => car.id);
    filterCars(ids);
  };

  const insertCar = (car) => {
    axios
      // .post("http://localhost/vsbkurs-php-react-cars-backend/", car)
      .post("https://jirkuc.maweb.eu/projects/php_react_cars/server/", car)
      .then((response) => {
        console.log(response.data);
        getCars();
        alert("Auto úspěšně přidáno.");
      })
      .catch((error) => {
        console.error("Nastala chybka", error);
        alert(`Nastala chybka ${error}`);
      });
  };

  const updateCar = (car) => {
    axios
      // .put("http://localhost/vsbkurs-php-react-cars-backend/", car)
      .put("https://jirkuc.maweb.eu/projects/php_react_cars/server/", car)
      .then((response) => {
        console.log(response.data);
        getCars();
        alert("Auto úspěšně aktualizováno.");
      })
      .catch((error) => {
        console.error("Nastala chybka", error);
        alert(`Nastala chybka ${error}`);
      });
  };

  const deleteCar = (id) => {
    axios
      // .delete(`http://localhost/vsbkurs-php-react-cars-backend/${id}`)
      .delete(`https://jirkuc.maweb.eu/projects/php_react_cars/server/${id}`)
      .then((response) => {
        console.log(response.data);
        getCars();
        alert("Auto úspěšně smazáno.");
      })
      .catch((error) => {
        console.error("Nastala chybka", error);
        alert(`Nastala chybka ${error}`);
      });
  };

  const handleChange = (carId) => {
    const temp = cars.filter((car) => car.id === carId);
    // console.log(temp);
    // console.log(temp[0]);
    // console.log(...temp);
    // setCarToChange(temp[0]);
    setUniformFunction("changeCar");
    setCarToChange(...temp);
  };

  const handleDelete = (carId) => {
    deleteCar(carId);
  };

  const handleNewData = (newData, sourceId) => {
    switch (sourceId) {
      case "change-car-form": {
        setCarToChange(newData);
        break;
      }
      case "add-car-form": {
        setNewCar(newData);
        break;
      }
      default:
        break;
    }
  };

  // doplní prázdná pole z formuláře, v databázi nesmí být null
  const fillEmptyInfos = (car) => {
    const filledCar = {
      ...car,
      brand: car.brand.trim() ? car.brand : "n/a",
      model: car.model.trim() ? car.model : "n/a",
      reg: car.reg.trim() ? car.reg : "n/a",
      km: parseInt(car.km) || 0,
      year: parseInt(car.year) || 0,
    };
    return filledCar;
  };

  // pošle na obrazovku schválení formuláře
  const confirmCar = (car) => {
    return window.confirm(
      "Opravdu chcete odeslat data?\n" +
      `Značka: ${car.brand}\n` +
      `Model: ${car.model}\n` +
      `Reg.značka: ${car.reg}\n` +
      `Kilometry: ${car.km}\n` +
      `Rok výroby: ${car.year}\n`
    );
  };

  const handleUpdate = (sourceId) => {
    let temp;
    switch (sourceId) {
      case "add-car-form": {
        temp = fillEmptyInfos(newCar);
        if (confirmCar(temp)) {
          insertCar(temp);
          setNewCar({
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: "",
          });
          alert("Data byla úspěšně odeslána");
          getCars();
        } else {
          alert("Odeslání dat bylo zrušeno");
        }
        break;
      }
      case "change-car-form": {
        temp = fillEmptyInfos(carToChange);
        const index = cars.findIndex((car) => car.id === carToChange.id);
        if (confirmCar(temp)) {
          if (index !== -1) {
            updateCar(temp);
            setCarToChange({
              id: 0,
              brand: "",
              model: "",
              reg: "",
              km: "",
              year: "",
            });
            alert("Aktualizace dat proběhla úspěšně.");
            getCars();
          } else {
            alert("Tato položka není v databázi.");
          }
        }
        setUniformFunction("addCar");
        break;
      }
      default:
        break;
    }
  };

  const handleReset = (sourceId) => {
    switch (sourceId) {
      case "add-car-form": {
        setNewCar({
          brand: "",
          model: "",
          reg: "",
          km: "",
          year: "",
        });
        break;
      }
      case "change-car-form": {
        setCarToChange({
          id: 0,
          brand: "",
          model: "",
          reg: "",
          km: "",
          year: "",
        });
        setUniformFunction("addCar");
        break;
      }
      default:
        break;
    }
  };

  // useEffect(() => {
  //   console.log(cars);
  // }, [cars]);

  return (
    <div className="container">
      <h1 className="text-center mt-3">Carrrs App</h1>
      <FilterForm data={cars} handleFilter={handleFilter} />
      <CarTable
        data={carsToShow}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
      <fieldset>
        <legend>{uniformFunction === "addCar" ? "Přidání nového auta" : "Úprava existujícího auta"}</legend>
        <UniForm
          id={uniformFunction === "addCar" ? "add-car-form" : "change-car-form"}
          data={uniformFunction === "addCar" ? newCar : carToChange}
          handleNewData={handleNewData}
          handleUpdate={handleUpdate}
          handleReset={handleReset}
        />
        {/* <p>Úprava existujícího auta</p>
      <UniForm
      id="change-car-form"
      data={carToChange}
      handleNewData={handleNewData}
      handleUpdate={handleUpdate}
      handleReset={handleReset}
      />
      <p>Přidání nového auta</p>
      <UniForm
      id="add-car-form"
      data={newCar}
      handleNewData={handleNewData}
      handleUpdate={handleUpdate}
      handleReset={handleReset}
      /> */}
      </fieldset>
    </div>
  );
}

export default App;
