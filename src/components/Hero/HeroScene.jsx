import "./HeroScene.css";
import globeDomeImage from "../../assets/globe-dome.webp";

export default function HeroScene() {
  return (
    <div className="hero-scene">
      <div className="hero-glow"></div>

      <div className="glass-panel">
        <div className="scene">
          <div className="globe">
            <img
              src={globeDomeImage}
              alt=""
              className="globe-img"
              width="1054"
              height="1024"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
