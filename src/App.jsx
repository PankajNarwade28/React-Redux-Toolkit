import Navbar from './app/components/Navbar';
import ProductCatalog from './app/components/ProductCatalog';
import Cart from './app/components/Cart';

function App() { 

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fef3c7_0%,_#ffedd5_40%,_#fed7aa_100%)]"> 
        <Navbar />
        <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <ProductCatalog />
          </section>
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <Cart />
          </aside>
        </main>
    </div>
);
} 

export default App
