import { useEffect, useState } from "react";
import "./FilterForm.css";

const FilterForm = ({ data, handleFilter }) => {
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        setBrands(
            Array.from(                                    // 3. zpátky pole ze setu
                new Set(                                   // 2. set značek z raw dat z pole
                    data.map(car => car.brand).sort()      // 1. pole značek z raw dat z App.jsx
                )
            )
        )
    }, [data]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const handleBrandSelect = (event) => {
        const temp = Array
            .from(event.target.selectedOptions)
            .map(
                (option) => option.value
            );
        // console.log(temp);
        setSelectedBrands(temp);
    };

    const handleResetFilter = () => {
        setSelectedBrands([]);
        handleFilter(brands);
    }

    return (
        <fieldset>
            <legend>Vyhledávání</legend>
            <div className="row g-3">
                <div className="col-auto">
                    <select
                        name="brand"
                        id="brand"
                        multiple
                        value={selectedBrands}
                        onChange={handleBrandSelect}
                        className="form-select form-select-sm"
                    >
                        {brands.map(brand => (
                            <option
                                key={brand}
                                value={brand}
                            >
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-2">
                <button onClick={() => handleFilter(selectedBrands)} className="btn btn-outline-primary btn-sm">
                    Filtrovat
                </button>
                <button onClick={handleResetFilter} className="btn btn-outline-secondary ms-2 btn-sm">
                    Reset
                </button>
            </div>
        </fieldset>
    );
}

export default FilterForm;