import { useMediaQuery } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value='dark'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
            <DarkModeOutlinedIcon fontSize='small'/> Dark
          </div>
        </MenuItem>
        <MenuItem value='system'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
            <SettingsBrightnessIcon/> System
          </div>
        </MenuItem>
        <MenuItem value='light'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
            <LightModeIcon/> Light
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function ModeToggle() {
  const { mode, setMode } = useColorScheme()

  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  // console.log(prefersDarkMode)
  // console.log(prefersLightMode)

  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
        // localStorage.setItem('trello-dark-light-mode')
        // localStorage.getItem('trello-dark-light-mode')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {

  return (
    <>
      <ModeSelect/>
      <hr />
      <ModeToggle/>
      <hr />
      <div>duogbachdev</div>

      <Typography variant="body2" color="text.secondary">text secondary</Typography>


      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App
