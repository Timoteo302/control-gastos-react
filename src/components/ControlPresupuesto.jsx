import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import Swal from 'sweetalert2'

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto
}) => {

  const [porcentaje, setPorcentaje] = useState(0)

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)


  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => {
      return gasto.cantidad + total
    }, 0)
    const totalDisponible = presupuesto - totalGastado

    // Calcular el porcentaje gastado
    const nuevoPorcentaje = ((totalGastado / presupuesto) * 100).toFixed(2)

    setDisponible(totalDisponible)
    setGastado(totalGastado)

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1200);
  }, [gastos])

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('es-AR', {
      style: "currency",
      currency: "ARS"
    })
  }

  const getPorcentaje = (porcentaje) => {
    if (porcentaje <= 85) {
      return '#3B82F6'    // azul
    } else if (porcentaje < 95) {
      return '#FF8000'    // naranja
    } else {
      return '#DC2626'    // rojo
    }
  }

  // function resetar app
  const handleResetApp = () => {
    Swal.fire({
      title: "Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "Cancelar",
      customClass:{
        title: 'my-swal-title',
        confirmButton:'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {

        // resetear gastos y presupuesto:
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)

        Swal.fire({
          title: "App reseteada!",
          icon: "success",
          customClass: {
            title: 'my-swal-title',
            confirmButton: 'swal-confirm-button'
          }
        });
      }
    });
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            // pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            pathColor: getPorcentaje(porcentaje),
            trailColor: '#dcdcdc',
            textColor: getPorcentaje(porcentaje)
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">

        <button
          className="reset-app"
          type="button"
          onClick={handleResetApp}
        >Resetear App
        </button>

        <p>
          <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
        </p>
        <p style={{ color: getPorcentaje(porcentaje) }}>
          <span style={{ color: getPorcentaje(porcentaje) }}>Disponible: </span>{formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>{formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
