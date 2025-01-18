import { useNavigate} from "react-router-dom";

const PhotoDetails = () => {
    let navigate = useNavigate();
    return (
        <>
          <button onClick={() => navigate(-1)}>Back</button> 
        </>
    );
};

export default PhotoDetails
