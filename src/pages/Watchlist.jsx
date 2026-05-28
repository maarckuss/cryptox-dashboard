import CryptoCard from "../components/CryptoCard";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";

function Watchlist({
  watchlist,
  toggleWatchlist,
  selectedCoin,
  setSelectedCoin,
}) {
  const location = useLocation();
  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 md:px-8 py-8">
      <div className="max-w-7x1 mx-auto">
        <nav className="mb-10 sticky top-4 z-50">
          <div className="flex items-center justify-between px-6 py-4 rounded-2x1 bg-white/5 backdrop-blur-1g border border-white/10">
            <div>
              <h2 className="font-bold text=x1">CryptoX</h2>
              <p className="text-xs text-slate-400">Premium Market Dashboard</p>
            </div>

            <div className="flex gap-6 text-sm">
              <Link
                to="/"
                className={`transition hover:text-cyan-400
                ${
                  location.pathname === "/"
                    ? "text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-1"
                    : "text-slate-300"
                }`}
              >
                Home
              </Link>
              <Link
                to="/watchlist"
                className={`transition hover:text-cyan-400
                ${
                  location.pathname === "/watchlist"
                    ? "text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-1"
                    : "text-slate-300"
                }`}
              >
                Watchlist
              </Link>
            </div>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-5">
            ⭐Saved Assets
          </div>
          <h1 className="text-5x1 font-bold">Watchlist</h1>
          <p className="mt-3 text-slate-400">
            Track and manage your favourite cryptocurrencies
          </p>
        </div>

        {/* Empty state */}
        {watchlist.length === 0 ? (
          <div
            className="
          rounded-3x1
          bg-white/5
          backdrop-blur-x1
          border border-white/10
          p-10
          text-center
          "
          >
            <h2 className="text-x1 font-bold mb-3">No saved assets yet</h2>
            <p>Add cryptocurrencies to your watchlist to monitor them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 1g:grid-cols-3 gap-6">
            {watchlist.map((coin) => (
              <CryptoCard
                key={coin.id}
                id={coin.id}
                name={coin.name}
                price={coin.current_price}
                change={coin.price_change_percentage_24h}
                image={coin.image}
                onToggle={() => toggleWatchlist(coin)}
                onSelect={() => setSelectedCoin(coin.id)}
                isSaved={true}
                isSelected={selectedCoin === coin.id}
              />
            ))}
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Watchlist;