import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes.config";

const Photos = () => {
  let navigate = useNavigate();
    return (
        <>
          <button onClick={() => navigate(ROUTES.PHOTOS_DETAILED_VIEW)}>Details</button> 
        </>
    );
}

export default Photos
