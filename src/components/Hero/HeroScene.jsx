import { motion } from "framer-motion";
import "./HeroScene.css";
import globeDomeImage from "../../assets/globe-dome.png";

export default function HeroScene() {
  return (
    <div className="hero-scene">
      <div className="hero-glow"></div>

      <div className="glass-panel">
        <div className="scene">
          <div className="globe">
            <motion.img
              src={globeDomeImage}
              alt=""
              className="globe-img"
              animate={{
                y: [0, -14, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}