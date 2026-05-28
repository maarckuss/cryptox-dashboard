import { useNavigate } from "react-router-dom";

function CryptoCard({
  id,
  name,
  price,
  change,
  image,
  onToggle,
  onSelect,
  isSaved,
  isSelected,
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        onSelect();
        navigate(`/coin/${id}`);
      }}
      className={`
        relative overflow-hidden rounded-3x1
        bg-white/5 backdrop-blur-x1 border border-white/10 p-6 cursor-pointer
        transition-all duration-300 
        hover:translate-y-2
        hover:shadow-2x1 
        hover:shadow-cyan-500/10
        hover:border-cyan-400/30
        ${isSelected ? "border-cyan-400 shadow-1g shadow-cyan-500/20" : ""}
        `}
    >
      {/*Glow layer*/}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>

      {/* Actual card content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <img src={image} alt={name} className="w-10 h-10" />
            <h2 className="text-x1 font-bold">{name}</h2>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="text-2x1"
          >
            {isSaved ? "✅" : "⭐"}
          </button>
        </div>

        {/*Price section*/}

        <div>
          <p className="text-slate-400 text-sm">Curent Price </p>
          <h3 className="text-2x1 font-bold mb-2">
            ${price?.toLocaleString()}
          </h3>
          <p
            className={`font-semibold ${
              change > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {change ? change.toFixed(2) : "0.00"}%
          </p>
        </div>
      </div>
    </div>
  );
}
export default CryptoCard;
