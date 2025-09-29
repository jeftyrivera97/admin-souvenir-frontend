//import { SearchItemInput } from '../shared/SearchItemInput';
import { Link } from "react-router-dom";
import { NewItemButton } from "../shared/NewItemButton";



export const IndexComprasComponent = () => {

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-1 gap-4">
        <div>
         
        </div>
        <div></div>
        <div></div>
        <div>
          <Link to="/compras/new">
            <NewItemButton placeholder="Nueva Compra" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default IndexComprasComponent;
