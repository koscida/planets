import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

const Input = styled(MuiInput)`
	width: 42px;
`;

export default function InputSlider({
	label,
	value,
	setValue,
	min,
	max,
	defaultValue,
}) {
	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleInputChange = (event) => {
		setValue(event.target.value === "" ? "" : Number(event.target.value));
	};

	const handleBlur = () => {
		if (value < min) {
			setValue(min);
		} else if (value > max) {
			setValue(max);
		}
	};

	return (
		<Box sx={{ width: 250 }}>
			<Typography id="input-slider" gutterBottom>
				{label}
			</Typography>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs>
					<Slider
						value={typeof value === "number" ? value : min}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
						defaultValue={defaultValue}
						step={1}
						min={min}
						max={max}
					/>
				</Grid>
				<Grid item>
					<Input
						value={value}
						size="small"
						onChange={handleInputChange}
						onBlur={handleBlur}
						inputProps={{
							step: 1,
							min,
							max,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
