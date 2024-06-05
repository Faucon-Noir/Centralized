import { Avatar, Box, Button, IconButton, Input, Modal, TextField } from "@mui/material";
import './style.css';
import Grid from "@mui/material/Unstable_Grid2";
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import { useEffect, useState } from "react";
import { ModalContentStyle } from './style';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Dashboard from "@/app/components/Dashboard/Dashboard";
import { UserType } from "./type";
import { AvartarImageCy, BioFielCy, BioLabelCy, EmailFielCy, EmailLabelCy, FirstNameFielCy, FirstNameLabelCy, LastNameFielCy, LastNameLabelCy, PhoneFielCy, PhoneLabelCy, SaveButtonCy } from "./const";


export default function AccountPage() {
  const [user, setUser] = useState<UserType>({
    id: '',
    avatar: '',
    lastname: '',
    firstname: '',
    mail: '',
    phone: '',
    bio: '',
    password: '',
  })
  const [open, setOpen] = useState<boolean>(false)
  let user_id: string = ''

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0]
    if (file) {
      const allowedTypes: string[] = ['image/png', 'image/jpeg']
      const maxSize: number = 2 * 1024 * 1024 // 2Mo
      if (allowedTypes.includes(file.type) && file.size <= maxSize) {
        setUser({ ...user, avatar: file })
      } else {
        alert(
          'Le fichier doit être une image de type png ou jpeg et ne doit pas dépasser 2Mo'
        )
      }
    } else {
      console.log('No file selected')
    }
  }

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    const token: any = localStorage.getItem('token')
    const decodeToken: any = jwtDecode(token)
    user_id = decodeToken['id']

    const formData = new FormData();
    Object.keys(user).forEach((key: string) => {
      const value = user[key as keyof UserType];
      if (value !== undefined) {
        formData.append(key, value);
      }
    });
    axios
      .patch(`http://localhost:8000/api/user/${user_id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  if (typeof window !== 'undefined') {
    const isAuth: boolean = !!localStorage.getItem("token");
    if (isAuth) {
      const token: any = localStorage.getItem("token");
      const decodeToken: any = jwtDecode(token);
      user_id = decodeToken["id"];
      useEffect(() => {
        try {
          axios.get(`http://localhost:8000/api/user/${user_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            setUser(res.data);
          })
        } catch (error) {
          console.log('error', error);
        }
      }, [token, user_id])
    }
  }
  console.log('user', user);

  return (
    <>
      <Grid container>
        <Grid xs={2}>
          <Dashboard page="account" />
        </Grid>
        <Grid xs={10}>
          <div className="accent" />
          <div style={{ display: 'block' }}>
            <div data-cy={AvartarImageCy} className="profile-photo" style={{ position: 'relative' }}>
              <Avatar src={`/media/${user.avatar}`} sx={{ height: '100%', width: '100%' }} />
              <div id='inner' className="inner" onClick={handleClickOpen}>
                <CameraOutlinedIcon sx={{ fontSize: '30px' }} />
              </div>
              <Modal open={open}>
                <Box sx={ModalContentStyle}>
                  <IconButton onClick={handleClose} style={{ position: 'absolute', top: 10, right: 10 }}>
                    <CloseOutlinedIcon />
                  </IconButton>
                  {/* TODO: Faire une update de l'api pour prendre en charge le blob de l'image */}
                  <Input type="file" onChange={handleFileChange} />
                </Box>
              </Modal>
            </div>
          </div>

          <form>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <label data-cy={FirstNameLabelCy} htmlFor='firstName'>
                First Name
              </label>
              <TextField
                data-cy={FirstNameFielCy}
                size="small"
                className="textField"
                placeholder={'Votre prénom'}
                value={user?.firstname ? user.firstname : ''}
                onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              />
              <label data-cy={LastNameLabelCy} htmlFor='lastName'>
                Last Name
              </label>
              <TextField
                data-cy={LastNameFielCy}
                size="small"
                className="textField"
                placeholder={'Votre nom'}
                value={user?.lastname ? user.lastname : ''}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              />
            </Box>
            <label data-cy={EmailLabelCy} htmlFor='email'>
              Email
            </label>
            <TextField
              data-cy={EmailFielCy}
              size="small"
              className="textField"
              placeholder={'Votre adresse mail'}
              value={user?.mail ? user.mail : ''}
              onChange={(e) => setUser({ ...user, mail: e.target.value })}
            />
            <label data-cy={PhoneLabelCy} htmlFor='phone'>
              Phone
            </label>
            <TextField
              data-cy={PhoneFielCy}
              size="small"
              className="textField"
              placeholder={'Votre numéro de téléphone'}
              value={user?.phone ? user.phone : ''}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
            <label data-cy={BioLabelCy} htmlFor='bio'>
              Bio
            </label>
            <TextField
              data-cy={BioFielCy}
              multiline
              className="textField"
              placeholder={'Une courte description de vous-même'}
              value={user?.bio ? user.bio : ''}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />
            <Button data-cy={SaveButtonCy} disabled={!user} className='cta-primary' type='submit' onClick={(e) => handleUpdate(e)} >
              Sauvegarder
            </Button>
          </form>
        </Grid>
      </Grid>
    </>

  )
}
