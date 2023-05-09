import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import AvatarElement from './AvatarElement'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { logout } from '../store/LoggedSlice'
import { setLogOut } from '../store/userSlice'
import { useNavigate } from '@tanstack/react-location'

const StyledAppBar = styled(AppBar)`
  background-color: #53a2e7;
`

const StyledText = styled(Typography)`
  font-family: monospace;
  font-weight: 700;
  letter-spacing: 0.3rem;
  color: inherit;
  text-decoration: none;
  margin-right: 2rem;
  display: none;
  @media (min-width: 960px) {
    display: block;
  }
`
const settings = ['Профиль', 'Выйти']

function NavBar() {
  const { login } = useAppSelector((state) => state)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state)
  const [image, setImage] = React.useState<string>('')

  React.useEffect(() => {
    if (user.user != null) {
      const picPath = user.user.picturePath
      const storage = getStorage()
      const reference = ref(storage, `images/${picPath}`)
      getDownloadURL(reference).then((url) => {
        setImage(url)
      })
    }
  }, [])

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const HandleLogOut = () => {
    dispatch(logout())
    dispatch(setLogOut())
  }

  const HandleProfile = () => {
    navigate({ to: '/profile', replace: false })
  }

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledText variant="h6" noWrap>
            СоцСеть
          </StyledText>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            ></Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            СоцСеть
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          {login.value && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Настройки">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AvatarElement img={image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      setting === 'Выйти'
                        ? HandleLogOut()
                        : setting === 'Профиль'
                        ? HandleProfile()
                        : handleCloseUserMenu
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </StyledAppBar>
  )
}
export default NavBar
