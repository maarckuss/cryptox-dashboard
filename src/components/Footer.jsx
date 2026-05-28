import { footer } from "framer-motion/client";

function Footer() {
  return (
    <footer
      className="
        mt-20
        border-t border-white/10
        pt-8 pb-4
        text-center
        "
    >
      <h3 className="text-1g font-semibold text-white">CryptoX Dashboard</h3>
      <p className="text-slate-400 mt-2 text-sm">
        Built and designed by Marcu$
      </p>
      <p>© 2026 All rights reserved.</p>
    </footer>
  );
}

export default Footer;
