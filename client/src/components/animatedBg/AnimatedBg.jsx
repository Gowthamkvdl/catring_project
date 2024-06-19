import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./animatedBg.css";

const GridPattern = ({
  width = 30,
  height = 30,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  initialSquares = 30,
  className,
  maxOpacity = 0.5,
  duration = 3,
  repeatDelay = 0.5,
  ...props
}) => {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [numSquares, setNumSquares] = useState(initialSquares);

  useEffect(()=>{
    if (window.innerWidth <= 768) {
      setNumSquares(15);
    } else {
      setNumSquares(35);
    }
  })

  const getPos = () => [
    Math.floor((Math.random() * dimensions.width) / width),
    Math.floor((Math.random() * dimensions.height) / height),
  ];

  const generateSquares = (count) =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
    }));
  const [squares, setSquares] = useState(() => generateSquares(numSquares));

  const updateSquarePosition = (id) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) => (sq.id === id ? { ...sq, pos: getPos() } : sq))
    );
  };

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions, numSquares]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={`position-absolute svg w-100 h-100 ${className}`}
      style={{
        pointerEvents: "none",
        inset: "0",
        fill: "rgba(108, 117, 125, 0.3)",
        stroke: "rgba(108, 117, 125, 0.3)",
      }}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [x, y], id }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
            key={`${x}-${y}-${index}`}
            width={width - 1}
            height={height - 1}
            x={x * width + 1}
            y={y * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
};

export default GridPattern;
