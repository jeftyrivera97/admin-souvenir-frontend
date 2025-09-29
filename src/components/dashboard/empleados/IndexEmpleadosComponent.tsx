import { Link } from 'react-router-dom'
import { NewItemButton } from '../shared/NewItemButton'

export const IndexEmpleadosComponent = () => {
  return (
     <>
      <div className="grid grid-cols-4 grid-rows-1 gap-4">
        <div>
         
        </div>
        <div></div>
        <div></div>
        <div>
          <Link to="/empleados/new">
            <NewItemButton placeholder="Nuevo Empleado" />
          </Link>
        </div>
      </div>
    </>
  )
}
