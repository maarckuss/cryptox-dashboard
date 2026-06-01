import Footer from "../components/Footer";
import SkeletonCard from "../components/SkeletonCard";
import { useState } from "react";
import CryptoCard from "../components/CryptoCard";
import { Link, useLocation } from "react-router-dom";
import PriceChart from "../components/priceChart";
import { motion } from "framer-motion";

function Home({
  coins,
  loading,
  error,
  watchlist,
  toggleWatchlist,
  selectedCoin,
  setSelectedCoin,
}) {
  const [search, setSearch] = useState("");
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 md:px-8 py-8">
      <motion.div
       className="max-w-7x1 mx-auto"
       initial={{
        opacity:0,
        y: 20
       }}
       animate={{
        opacity: 1,
        y:0
       }}
       transition={{
        duration:0.8,
        ease: "easeOut"
       }}
       >
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

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-5     text-x1 font-bold text-center text-yellow-400">
              Live Market Data
            </div>
            <h1 className="text-5x1 md:text-7x1 font-bold leading-tight">
              Track your
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                crypto
              </span>
              <br />
              portfolio intelligently
            </h1>

            <p className=" mt-5 text-slate-400 text-slate-400">
              Monitor Prices, market movements and your favorite assets with
              real-time insights
            </p>
          </div>

          <Link
            to="/watchlist"
            className="bg-yellow-400 text-black px-4 py-2 rounded-1g font-semibold"
          >
            Go to watchlist
          </Link>
        </div>

        <br />
        <br />
        <div className="mb-8 rounded-2x1 bg-white/5 backdrop-blur-x1 border border-white/10 px-5 py-4 flex items-center gap-3 focus-within:border-cyan-400 transition-all duration-300">
          <span className="text-slate-400 text-x1">🔍</span>
          <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none flex-1 text-white placeholder:text-slate-500"
        />

        </div>
        
        {error && <p>{error}</p>}

        {loading ? (
          <div>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
            <div className="mb-10 rounded-3x1 bg-white/5 backdrop-blur-x1 border border-white/10 p-6">
              <div className="mb-6">
                <h2 text-2x1 font-bold>
                  Market Trend
                </h2>
                <p className="text-slate-400">Track price movement over time</p>
              </div>
              <PriceChart selectedCoin={selectedCoin} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 1g:grid-cols-3 gap-4">
              {filteredCoins.map((coin) => (
                <CryptoCard
                  id={coin.id}
                  key={coin.id}
                  name={coin.name}
                  price={coin.current_price}
                  change={coin.price_change_percentage_24h}
                  image={coin.image}
                  onToggle={() => toggleWatchlist(coin)}
                  onSelect={() => setSelectedCoin(coin.id)}
                  isSaved={watchlist.some((item) => item.id === coin.id)}
                  isSelected={selectedCoin === coin.id}
                />
              ))}
            </div>
          </>
        )}
        <Footer/>
      </motion.div>
    </div>
  );
}

export default Home;
