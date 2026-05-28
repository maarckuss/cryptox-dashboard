import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PriceChart from "../components/priceChart";
import { div } from "framer-motion/client";

function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCoin(data);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 md:px-8 py-8">
      <div className="max-w-7x1 mx-auto">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div
            className="
          rounded-3x1 bg-white/5 backdrop-blur-x1 border border-white/10 p-8"
          >
            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="mb-8 px-4 py-2 round-x1 bg-white/5 border border-white/10 hover:border-cyan-400 transition"
            >
              ⬅ Back to Dashboard
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6  mb-10">
              <div className="flex items-center gap-5">
              <img
                src={coin.image.large}
                alt={coin.name}
                className="w-20 h-20"
              />
              <div>
                <h1 className="text-4x1 font-bold">{coin.name}</h1>
                <p className="text-slate-400">Rank #{coin.market_cap_rank}</p>
              </div>
              </div>

              {/*Price*/}

              <div>
                <p className="text-slate-400">Current Price</p>
                <h2 className="text-4x1 font-bold">
                  ${coin.market_data.current_price.usd.toLocaleString()}
                </h2>
              </div>
              </div>

              {/*Stats*/}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
                <div className="bg-white/5 rounded-2x1 p-5 border border-white/10">
                  <p className="text-slate-400 text-sm">Market Cap</p>

                  <h3 className="font-bold mt-2">${coin.market_data.market_cap.usd.toLocaleString()}</h3>
                </div>

                <div className="bg-white/5 rounded-2x1 p-5 border border-white/10">
                  <p className="text-slate-400 text-sm">24h Volume</p>
                  <h3 className="font-bold">
                    ${coin.market_data.total_volume.usd.toLocaleString()}
                  </h3>
                </div>

                <div className="bg-white/5 rounded-2x1 p-5 border border-white/10">
                  <p className="text-slate-400 text-sm">Circulating Supply</p>
                  <h3 className="font-bold">
                    {coin.market_data.circulating_supply.toLocaleString()}
                  </h3>
                </div>

                <div className="bg-white/5 rounded-2x1 p-5 border border-white/10">
                  <p className="text-slate-400 text-sm">24h High</p>
                  <h3 className="font-bold">
                    {coin.market_data.high_24h.usd.toLocaleString()}
                  </h3>
                </div>
              </div>

              {/*Chart*/}

              <div className="mt-8">
                <h2 className="text-2x1 font-bold mb-2">Price Trend</h2>
                <p className="text-slate-400 mb-6">Historical market movement</p>
                <PriceChart selectedCoin={id} />
              </div>
              
            </div>
          
        )}
        <Footer/>
      </div>
    </div>
  );
}

export default CoinDetails;
