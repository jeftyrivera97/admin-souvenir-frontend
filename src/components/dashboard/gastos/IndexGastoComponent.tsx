import { Link } from 'react-router-dom'
import { NewItemButton } from '../shared/NewItemButton'

export const IndexGastosComponent = () => {
  return (
     <>
      <div className="grid grid-cols-4 grid-rows-1 gap-4">
        <div>
         
        </div>
        <div></div>
        <div></div>
        <div>
          <Link to="/gastos/new">
            <NewItemButton placeholder="Nuevo Gasto" />
          </Link>
        </div>
      </div>
    </>
  )
}
