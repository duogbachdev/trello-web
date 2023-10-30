import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

const BoardBar = () => {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      borderBottom: '1px solid white'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="duogbachdev MERN Stack"
          clickable
          // onClick={()=>{}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
          // onClick={()=>{}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To  Google Drive"
          clickable
          // onClick={()=>{}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
          // onClick={()=>{}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          // onClick={()=>{}}
        />
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Button 
          variant="outlined"
          startIcon={ <PersonAddIcon/> }
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
        Invite
        </Button>

        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title='duogbachdev'>
            <Avatar alt="duogbachdev" src="https://avatars.githubusercontent.com/u/136550117?v=4" />
          </Tooltip>
          <Tooltip title='duogbachdev'>
            <Avatar alt="duogbachdev" src="https://avatars.githubusercontent.com/u/136550117?v=4" />
          </Tooltip>
          <Tooltip title='duogbachdev'>
            <Avatar alt="duogbachdev" src="https://avatars.githubusercontent.com/u/136550117?v=4" />
          </Tooltip>
          <Tooltip title='duogbachdev'>
            <Avatar alt="duogbachdev" src="https://avatars.githubusercontent.com/u/136550117?v=4" />
          </Tooltip>
          <Tooltip title='duogbachdev'>
            <Avatar alt="duogbachdev" src="https://avatars.githubusercontent.com/u/136550117?v=4" />
          </Tooltip>
          <Tooltip title='duogbachdev'>
            <Avatar alt="duogbachdev" src="https://avatars.githubusercontent.com/u/136550117?v=4" />
          </Tooltip>
          <Tooltip title='duogbachdev'>
            <Avatar alt="duogbachdev" src="https://avatars.githubusercontent.com/u/136550117?v=4" />
          </Tooltip>
          <Tooltip title='duogbachdev'>
            <Avatar alt="duogbachdev" src="https://avatars.githubusercontent.com/u/136550117?v=4" />
          </Tooltip>
          <Tooltip title='duogbachdev'>
            <Avatar alt="duogbachdev" src="https://avatars.githubusercontent.com/u/136550117?v=4" />
          </Tooltip>
          <Tooltip title='duogbachdev'>
            <Avatar alt="duogbachdev" src="https://avatars.githubusercontent.com/u/136550117?v=4" />
          </Tooltip>
          <Tooltip title='duogbachdev'>
            <Avatar alt="duogbachdev" src="https://avatars.githubusercontent.com/u/136550117?v=4" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar