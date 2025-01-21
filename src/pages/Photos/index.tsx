import { useEffect, useState } from "react";
import MasonryGrid from "../../components/MasonryGrid";

const Photos = () => {
  const [size, setSize] = useState({
    width: 1200,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      let width = window.innerWidth;

      if (window.innerWidth > 1300) {
        width = 1200;
      } else if (window.innerWidth > 1060) {
        width = 960;
      } else if (window.innerWidth > 820) {
        width = 720;
      } else if (window.innerWidth > 580) {
        width = 480;
      } else if (window.innerWidth > 340) {
        width = 240;
      }

      setSize({
        width,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <MasonryGrid width={size.width}></MasonryGrid>
    </div>
  );
};

export default Photos;
