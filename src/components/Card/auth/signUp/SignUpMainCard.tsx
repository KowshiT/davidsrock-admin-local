import { SignUpStageContext } from "@/contexts/authContext/SignUpStageContext";
import React, { useContext } from "react";
import CheckEmailCard from "./CheckEmailCard";
import InterestCard from "./InterestCard";
import SignUpFormCard from "./SignUpFormCard";
import SignUpOptionsCard from "./SignUpOptionsCard";
import UploadProfilePhotoCard from "./UploadProfilePhotoCard";

export interface HomeProps { }

const SignUpMainCard: React.FC<HomeProps> = (props) => {
	const { signUpStageCount } = useContext(SignUpStageContext);
	const handleSignUpProcessSession = (count: number | null) => {
		switch (count) {
			case 1:
				// return <UploadProfilePhotoCard />;
				return <SignUpFormCard />;
				break;
			case 2:
				return <SignUpFormCard />;
				break;
			case 3:
				return <CheckEmailCard />;
				break;
			case 4:
				return <UploadProfilePhotoCard />;
				break;
			case 5:
				return <InterestCard />;
				break;
			default:
				break;
		}
	};

	return (
		<React.Fragment>
			{handleSignUpProcessSession(signUpStageCount)}
		</React.Fragment>
	);
};

export default SignUpMainCard;
