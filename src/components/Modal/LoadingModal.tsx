import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";

// images
import { LoaderSVG } from "../../assetsLayer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  borderRadius: 5,
  p: 2,
};

export interface Props {
  open?: any;
  loaderText?: any;
}

const Loader: React.FC<Props> = (props) => {
  const [filePath, setFilePath] = useState<any | null>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open])

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(5px)",
        }}
      >
        <div>
          <Box sx={style}>
            <div className="grid justify-items-center">
              <Image
                src={LoaderSVG}
                width={150}
                height={150}
                alt="Loading Image"
              />
              <span className="loadingTxt">{props.loaderText}</span>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default Loader;
