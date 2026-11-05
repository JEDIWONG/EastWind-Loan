import { Slider, Typography } from "@mui/material"

const AppSlider = ({ label, min = 0, max = 100, value, onChange }) => {
  return (
    <div>
      {label && <Typography>{label}</Typography>}

      <Slider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
      />
    </div>
  )
}

export default AppSlider