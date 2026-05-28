import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import CoinDetails from "./pages/CoinDetails";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd", {
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        return res.json();
      })

      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const toggleWatchlist = (coin) => {
    setWatchlist((prev) => {
      const exists = prev.find((item) => item.id === coin.id);

      if (exists) {
        return prev.filter((item) => item.id !== coin.id);
      } else {
        return [...prev, coin];
      }
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              coins={coins}
              loading={loading}
              error={error}
              watchlist={watchlist}
              toggleWatchlist={toggleWatchlist}
              selectedCoin={selectedCoin}
              setSelectedCoin={setSelectedCoin}
            />
          }
        />

        <Route
          path="/watchlist"
          element={
            <Watchlist
              watchlist={watchlist}
              toggleWatchlist={toggleWatchlist}
              selectedCoin={selectedCoin}
              setSelectedCoin={setSelectedCoin}
            />
          }
        />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
