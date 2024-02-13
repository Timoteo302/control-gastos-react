import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) || [])

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [isvalidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  // useEffect para editar un gasto, verifica si esta variable tiene algo
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 200)
    }
  }, [gastoEditar])


  // LocalStorage para presupuesto:
  // useEffect para localStorage
  useEffect( () => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  // useEffect para saltar pantalla de inicio, se ejecuta una vez
  useEffect( () => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])


  // LocalStorage para los gastos:
  useEffect( () => {
   localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])


  // useEffect para los filtros
  useEffect( () => {
    if(filtro){
      // Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( (gasto) => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro, gastos])



  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 200)
  }

  // Funcion para tomar al objeto de todos los gatos
  const guardarGasto = (gasto) => {

    if (gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map((gastoState) => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      // Nuevo Gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 300)
  }

  // Eliminar gasto 
  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isvalidPresupuesto={isvalidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isvalidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}

              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>

          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />}

    </div>
  )
}

export default App
