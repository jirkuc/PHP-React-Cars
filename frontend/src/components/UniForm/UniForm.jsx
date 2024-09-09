import "./UniForm.css";
const UniForm = ({ data, id, handleNewData, handleUpdate, handleReset }) => {


    const handleChange = (event) => {
        let temp = { ...data };
        const { name, value } = event.target;

        switch (name) {
            case `${id}-brand`:
                temp.brand = value;
                break;
            case `${id}-model`:
                temp.model = value;
                break;
            case `${id}-reg`:
                temp.reg = value;
                break;
            case `${id}-km`:
                temp.km = parseInt(value) || 0;
                break;
            case `${id}-year`:
                temp.year = parseInt(value) || 0;
                break;
            default:
                break;
        }
        // temp[name] = value; nelze použít, protože id se mění
        handleNewData(temp, id);
    };

    //console.log(data);

    return (
        <div id={id}>
            <div className="row g-3 mt-3">
                <div className="col-auto">
                    <label htmlFor={`${id}-brand`} className="form-label">Značka:</label>
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        name={`${id}-brand`}
                        id={`${id}-brand`}
                        value={data.brand}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="col-auto">
                    <label htmlFor={`${id}-model`} className="form-label">Model:</label>
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        name={`${id}-model`}
                        id={`${id}-model`}
                        value={data.model}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="col-auto">
                    <label htmlFor={`${id}-reg`} className="form-label">Reg. značka:</label>
                </div>
                <div className="col-md-2">
                    <input
                        type="text"
                        name={`${id}-reg`}
                        id={`${id}-reg`}
                        value={data.reg}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
            </div>
            <div className="row g-3 mt-1">
                <div className="col-auto">
                    <label htmlFor={`${id}-km`} className="form-label">Najeto km:</label>
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        name={`${id}-km`}
                        id={`${id}-km`}
                        value={data.km}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="col-auto">
                    <label htmlFor={`${id}-year`} className="form-label">Rok výroby:</label>
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        name={`${id}-year`}
                        id={`${id}-year`}
                        value={data.year}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
            </div>
            <div className="mt-3">
                <button onClick={() => handleUpdate(id)} className="btn btn-primary">Uložit</button>
                <button onClick={() => handleReset(id)} className="btn btn-secondary ms-2">Reset</button>
            </div>

        </div>
    )
};
export default UniForm;