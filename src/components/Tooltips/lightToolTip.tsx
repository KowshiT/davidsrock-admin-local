import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface LightToolTipCustomProps {
	title: JSX.Element | string;
	children?: JSX.Element;
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.common.white,
		color: "rgba(0, 0, 0, 0.87)",
		boxShadow: theme.shadows[1],
		fontSize: 14,
	},
}));

const LightToolTipCustom = (props: LightToolTipCustomProps) => {
	return <LightTooltip title={props.title}>{props.children ? props.children : <></>}</LightTooltip>;
};

export default LightToolTipCustom;
