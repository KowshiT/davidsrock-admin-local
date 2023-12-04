import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionRow } from "@/layouts/section";
import { modalCloseIcon } from "@/assetsLayer";

// Images

export interface Props {
}

const TestModal: React.FC<Props> = (props) => {

	const router = useRouter();


    const { eventSettingsModal, setEventSettingsModal } = React.useContext(ModalOpenCloseContext);
	const handleOpen = () => setEventSettingsModal(true);
	const handleClose = () => setEventSettingsModal(false);

	
    
	return (
		<div>
			<Modal
				hideBackdrop
				open={eventSettingsModal}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
				className='modalBackDrop'>
				<div className='modalStructureEventSettings'>
                    <SectionRow className="relative">
                        <span className="modalsHedingText ml-6 mt-4">Event Settings</span>
                        <button className="absolute right-5 mt-5 duration-500 hover:rotate-90 hover:opacity-100" onClick={(e:any) => handleClose()}>
                            <Image
                                src={modalCloseIcon}
                                alt='Picture of the author'
                                width={22}
                                height={22}
                            />
                        </button>
                    </SectionRow>
			        <div className='line mt-4 mb-3 w-full'></div>
					<div className='w-full  flex items-center flex-col  '>
						// body
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default TestModal;
