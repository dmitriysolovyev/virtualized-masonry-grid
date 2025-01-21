import { Photo } from "pexels";
import { useEffect, useState, UIEventHandler } from "react";
import { Pexels } from "../../external/pexels/pexels";
import { VirtualPhotoGrid } from "../../model/virtual-photo-grid";
import { VirtualGridItem } from "../../model/virtual-grid-item";
import Image from "../Image";
import { ROUTES } from "../../pages/routes.config";

const MasonryGrid = ({ width }: { width: number }) => {
  // TODO Resize

  const [_model, setModel] = useState<VirtualPhotoGrid | undefined>(undefined);
  const [_children, setChildren] = useState<VirtualGridItem<Photo>[]>([]);
  const [_clientHeight, setClientHeight] = useState(window.innerHeight);

  const handleScroll = (e: {
    target: { scrollTop: number; scrollHeight: number; clientHeight: number };
  }) => {
    const { scrollTop, clientHeight } = e.target;
    setClientHeight(clientHeight);

    _model
      ?.getVisibleItems(scrollTop - 200, scrollTop + innerHeight + 200)
      .then((items) => {
        setChildren([...items]);
      });
  };

  useEffect(() => {
    const model = new VirtualPhotoGrid(
      Pexels.instance,
      width,
      Math.round(width / 240),
    );
    setModel(model);
  }, [width]);

  useEffect(() => {
    if (!_model) {
      return;
    }

    async function fetchData() {
      try {
        const { innerHeight } = window;
        _model?.getVisibleItems(0, innerHeight + 400).then((items) => {
          setChildren([...items]);
        });
      } catch (error) {
        console.error("There was a problem:", error);
      }
    }
    fetchData();
  }, [_model, _clientHeight]);

  return (
    <div
      onScroll={handleScroll as unknown as UIEventHandler<HTMLDivElement>}
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        position: "relative",
      }}
    >
      {!_children ? (
        <div id="rectangle"></div>
      ) : (
        _children.map((child) => {
          console.log("RRRRR", child.id);
          return (
            <Image
              key={child.id.toString()}
              path={`${ROUTES.PHOTOS_DETAILED_VIEW}/${child.id.toString()}`}
              src={child.content.src.medium}
              alt={child.content.alt}
              top={child.top}
              left={child.left}
              width={child.size.width}
              height={child.size.height}
            ></Image>
          );
        })
      )}
    </div>
  );
};

export default MasonryGrid;
