import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Modal, Button } from 'react-bootstrap';  // Importa el Modal y Button

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [nuevoProveedor, setNuevoProveedor] = useState({ nombre: '', empresa: '', email: '', telefono: '' });
  const [showModal, setShowModal] = useState(false);  // Estado para controlar el modal
  const MySwal = withReactContent(Swal);

  // Cargar proveedores de LocalStorage
  useEffect(() => {
    const storedProveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    setProveedores(storedProveedores);
  }, []);

  // Guardar proveedores en LocalStorage
  useEffect(() => {
    localStorage.setItem("proveedores", JSON.stringify(proveedores));
  }, [proveedores]);

  // Agregar proveedor
  const addProveedor = () => {
    if (nuevoProveedor.nombre.trim() !== "" && nuevoProveedor.empresa.trim() !== "") {
      const proveedor = {
        id: Date.now(),
        ...nuevoProveedor,
      };
      setProveedores([...proveedores, proveedor]);
      setNuevoProveedor({ nombre: '', empresa: '', email: '', telefono: '' });
      setShowModal(false);  // Cerrar el modal
    }
  };

  // Eliminar proveedor
  const deleteProveedor = (id) => {
    MySwal.fire({
      title: '¿Está seguro de eliminar el proveedor?',
      icon: 'question',
      text: 'El proveedor se eliminará de forma permanente',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProveedores = proveedores.filter((proveedor) => proveedor.id !== id);
        setProveedores(updatedProveedores);
        MySwal.fire('Eliminado', 'El proveedor ha sido eliminado correctamente', 'success');
      }
    });
  };

  // Editar proveedor
  const editProveedor = (id, campo, valor) => {
    const updatedProveedores = proveedores.map((proveedor) =>
      proveedor.id === id ? { ...proveedor, [campo]: valor } : proveedor
    );
    setProveedores(updatedProveedores);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">
        Lista de Proveedores
      </h1>

      <div className="row mb-3">
        <div className="col-md-4">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Agregar Proveedor
          </button>
        </div>
      </div>

      <ul className="list-group">
        {proveedores.length === 0 && (
          <li className="list-group-item text-white bg-dark">Aún no hay proveedores</li>
        )}
        {proveedores.map((proveedor) => (
          <li
            key={proveedor.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="flex-grow-1">
              <input
                type="text"
                className="form-control mb-2"
                value={proveedor.nombre}
                onChange={(e) => editProveedor(proveedor.id, 'nombre', e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                value={proveedor.empresa}
                onChange={(e) => editProveedor(proveedor.id, 'empresa', e.target.value)}
              />
              <input
                type="email"
                className="form-control mb-2"
                value={proveedor.email}
                onChange={(e) => editProveedor(proveedor.id, 'email', e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                value={proveedor.telefono}
                onChange={(e) => editProveedor(proveedor.id, 'telefono', e.target.value)}
              />
            </div>
            <div className="d-flex align-items-center">
              <span
                className="btn btn-danger"
                onClick={() => deleteProveedor(proveedor.id)}
              >
                Eliminar
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal para agregar proveedor */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-2"
            value={nuevoProveedor.nombre}
            onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, nombre: e.target.value })}
            placeholder="Ingrese nombre"
          />
          <input
            type="text"
            className="form-control mb-2"
            value={nuevoProveedor.empresa}
            onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, empresa: e.target.value })}
            placeholder="Ingrese empresa"
          />
          <input
            type="email"
            className="form-control mb-2"
            value={nuevoProveedor.email}
            onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, email: e.target.value })}
            placeholder="Ingrese email"
          />
          <input
            type="text"
            className="form-control mb-2"
            value={nuevoProveedor.telefono}
            onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, telefono: e.target.value })}
            placeholder="Ingrese teléfono"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={addProveedor}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Proveedores;

