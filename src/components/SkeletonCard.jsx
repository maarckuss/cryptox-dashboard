function SkeletonCard() {
  return (
    <div className="bg-slate-800 p-5 rounded-2x1 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-slate-700 mb-4"></div>
      <div className="h-5 bg-slate-700 rounded mb-3"></div>
      <div className="h-4 bg-slate-700 rounded w-1/2"></div>
    </div>
  );
}
export default SkeletonCard;
