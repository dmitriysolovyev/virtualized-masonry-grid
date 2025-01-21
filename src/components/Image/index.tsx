import { Link } from "react-router-dom";

const Image = (props: {
  path: string;
  src: string;
  alt: string | null;
  top: number;
  left: number;
  width: number;
  height: number;
}) => {
  return (
    <>
      <Link to={props.path}>
        <img
          loading="lazy"
          src={props.src}
          alt={props.alt ?? ""}
          style={{
            top: props.top,
            left: props.left,
            width: props.width,
            height: props.height,
            position: "absolute",
          }}
        />
      </Link>
    </>
  );
};

export default Image;
