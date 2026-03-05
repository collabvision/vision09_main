"use client";
import MagicBento from "../../components/MagicBento";

const KeyMatrix = () => {
  return (
    <div className="py-7 m-7">
      <MagicBento
        textAutoHide={true}
        enableStars
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="132, 0, 255"
        disableAnimations={false}
      />
    </div>
  );
};

export default KeyMatrix;
