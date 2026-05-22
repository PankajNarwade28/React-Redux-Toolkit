 
import './App.css'
import Navbar from './app/components/Navbar';
import ProductCatalog from './app/components/ProductCatalog';
import Cart from './app/components/Cart';

function App() { 

  return (
    <> 
        <Navbar />
        <div className="app-layout">
          <div className="catalog-section">
            <ProductCatalog />
          </div>
          <div className="cart-section">
            <Cart />
          </div>
        </div>
    </>
);
} 

export default App
