import { useState } from "react";
import { Dithering } from "@paper-design/shaders-react";

export default function PaperGraphic() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1

    const offsetX = (x - 0.5) * 2; // -1 to 1
    const offsetY = (y - 0.5) * 2; // -1 to 1

    setMousePos({ x: offsetX, y: offsetY });
  };

  // Calculate distance from center for push effect
  const distanceFromCenter = Math.sqrt(mousePos.x ** 2 + mousePos.y ** 2);

  // Determine inversion based on mouse position
  const isLeftSide = mousePos.x < 0;

  // Left side: white on black, Right side: black on white
  const colorFront = isLeftSide ? "#FFFFFF" : "#000000";
  const bgColor = isLeftSide ? "#000000" : "#FFFFFF";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePos({ x: 0, y: 0 });
      }}
      style={{ cursor: "pointer" }}
    >
      <Dithering
        speed={0.68 - (isHovering ? distanceFromCenter * 0.3 : 0)}
        shape="warp"
        type="8x8"
        size={3.2 - (isHovering ? distanceFromCenter * 0.8 : 0)}
        scale={2.3 - (isHovering ? distanceFromCenter * 0.4 : 0)}
        frame={376332.7999999989 - (isHovering ? distanceFromCenter * 3000 : 0)}
        colorBack="#00000000"
        colorFront={colorFront}
        style={{
          backgroundColor: bgColor,
          height: "709px",
          mixBlendMode: "normal",
          width: "1440px",
          transition: isHovering
            ? "background-color 0.3s ease"
            : "all 1.5s ease-out",
        }}
      />
    </div>
  );
}
