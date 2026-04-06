import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchAuctionStats } from '../../features/auctionSlice.jsx';
import './AuctionStats.css';

const AuctionStats = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(fetchAuctionStats());
  }, [dispatch]);

  if (loading || !stats) return <div className="loader">Loading BPL Stats...</div>;

  const { highestSale } = stats;

  return (
    <div className="stats-page">
      <div className="summary-banner">
        <div className="stat-item"><span>Total:</span> {stats.totalPlayers}</div>
        <div className="stat-item"><span>Sold:</span> {stats.soldPlayers}</div>
        <div className="stat-item"><span>Bids:</span> {stats.totalBids}</div>
      </div>

      <h2 className="section-title">Record Breaking Sale</h2>
      
      <div className="featured-player-card">
        <div className="image-container">
          <img src={highestSale.photo} alt={highestSale.name} />
          <div className="price-tag">₹{highestSale.soldPrice}</div>
        </div>
        
        <div className="info-container">
          <h3>{highestSale.name}</h3>
          <p className="category">{highestSale.category}</p>
          <hr />
          <div className="buyer-info">
            <p>Sold to</p>
            <h4>{highestSale.soldTo.teamName}</h4>
          </div>
          <p className="timestamp">Sold at: {new Date(highestSale.soldAt).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};
 
export default AuctionStats;