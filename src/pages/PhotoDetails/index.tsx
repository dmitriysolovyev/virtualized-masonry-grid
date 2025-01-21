import { useNavigate, useParams } from "react-router-dom";
import ImageDetails from "../../components/ImageDetails";

const PhotoDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
      <ImageDetails id={id ?? ""}></ImageDetails>
    </>
  );
};

export default PhotoDetails;
