 
import './App.css'
import AuctionStats from './app/components/AuctionStats';
import { CounterUI } from './app/components/CounterUI' 

function App() { 

  return (
    <> 
        {/* Counter UI from before */}
        <CounterUI />
        
        <hr style={{ margin: '40px 0', opacity: 0.1 }} />
        
        {/* New Auction Stats Page */} 
        <AuctionStats />
    </>
);
} 

export default App
