import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PriceChart({ selectedCoin }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState(7);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=${timeRange}`,
      {
        headers: {
          accept: "application/json",
        },
      },
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch chart data");
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (!data.prices) return;

        const formattedData = data.prices.map((item) => ({
          day: new Date(item[0]).toLocaleDateString(),
          price: item[1],
        }));

        setChartData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [selectedCoin, timeRange]);

  return (
    <div className="bg-slate-800 p-5 rounded-2x1">
      <h2 className="text-x1 font-bold mb-4">
        {selectedCoin.toUpperCase()} Price Trend
      </h2>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setTimeRange(7)}
          className={`px-3 py-2 rounded ${
            timeRange === 7 ? "bg-yellow-400 text-black" : "bg-slate-700"
          }`}
        >
          7D
        </button>

        <button
          onClick={() => setTimeRange(30)}
          className={`px-3 py-2 rounded ${
            timeRange === 30 ? "bg-yellow-400 text-black" : "bg-slate-700"
          }`}
        >
          30D
        </button>

        <button
          onClick={() => setTimeRange(90)}
          className={`px-3 py-2 rounded ${
            timeRange === 90 ? "bg-yellow-400 text-black" : "bg-slate-700"
          }`}
        >
          90D
        </button>
      </div>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
export default PriceChart;
