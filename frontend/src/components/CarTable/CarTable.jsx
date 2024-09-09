import "./CarTable.css";

const CarTable = ({ data, handleChange, handleDelete }) => {

    return (
        <table className="table table-striped table-hover mt-3 table-sm">
            <thead>
                <tr>
                    <th>Značka</th>
                    <th>Model</th>
                    <th>Reg. značka</th>
                    <th>Najeto km</th>
                    <th>Rok výroby</th>
                    <th>Úpravy</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {
                    data.map(car =>
                        <tr key={car.id}>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.reg}</td>
                            <td>{car.km}</td>
                            <td>{car.year}</td>
                            <td>
                                <div className="btn-group mx-auto" role="group">
                                    <button onClick={() => { handleChange(car.id) }} className="btn btn-warning btn-sm">Editovat</button>
                                    <button onClick={() => { handleDelete(car.id) }} className="btn btn-danger btn-sm">Smazat</button>
                                </div>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default CarTable