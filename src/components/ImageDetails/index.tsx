import { Pexels } from "../../external/pexels/pexels";
import { useEffect, useState } from "react";
import { Photo } from "pexels";

const ImageDetails = (props: { id: string }) => {
  const [_photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (!props.id) {
      return;
    }

    Pexels.instance.getItem(Number(props.id)).then((photo) => setPhoto(photo));
  }, [props.id]);

  return (
    <>
      {_photo ? (
        <div>
          <img
            loading="lazy"
            key={_photo.id}
            src={_photo.src.large}
            alt={_photo.alt ?? ""}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          />
          <p>Photographer: {_photo.photographer}</p>
          <p>Description: {_photo.alt}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ImageDetails;
