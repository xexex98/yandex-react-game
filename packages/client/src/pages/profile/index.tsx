import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ErrorAuth } from '../../components/ErrorAuth';
import { PasswordModal } from '../../components/PasswordModal';
import { validateAllFields, validateField } from '../../helpers/validate';
import { usePage } from '../../hooks/usePage';
import { PageInitArgs } from '../../routes';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  AuthUserResponse,
  editUser,
  getCurrentUser,
  logout,
} from '../../store/modules/auth/authSlice';
import { selectUser } from '../../store/modules/auth/selectors';

type TUserData = {
  login: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

type TUserErrors = Partial<TUserData>;

const AVATAR_URL =
  'https://gravatar.com/avatar/96286509b79a0ea10daedb7be8906143?s=400&d=robohash&r=x';

export type ProfileFormFields = Partial<AuthUserResponse>;

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [formValues, setFormValues] = useState<ProfileFormFields>(user || {});
  const [formErrors, setFormErrors] = useState<TUserErrors>({});
  const [avatarUrl, setAvatarUrl] = useState(AVATAR_URL);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };
  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleChangeAvatar = useCallback(() => {
    if (!inputRef.current?.files?.length) {
      return;
    }
    const file = inputRef.current.files[0];

    setAvatarUrl(URL.createObjectURL(file));
  }, []);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const error = validateField(name, value);

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateAllFields(formValues);

    setFormErrors(validationErrors);

    const noErrors = Object.values(validationErrors).every((error) => !error);

    if (noErrors) {
      dispatch(editUser(formValues))
        .unwrap()
        .then(() => navigate('/'));
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
  };

  usePage({ initPage: initProfilePage });

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{ paddingTop: '10px' }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component='h1'
          variant='h5'
        >
          Profile
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          noValidate
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <label>
                <input
                  ref={inputRef}
                  accept='image/*'
                  name='avatar'
                  type='file'
                  style={{ display: 'none' }}
                  onChange={handleChangeAvatar}
                />
                <Avatar
                  src={avatarUrl}
                  style={{
                    margin: '10px',
                    width: '100px',
                    height: '100px',
                    cursor: 'pointer',
                    backgroundColor: '#e3e3e3',
                  }}
                />
              </label>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.login}
                error={Boolean(formErrors.login)}
                helperText={formErrors.login}
                onChange={handleChangeInput}
                required
                fullWidth
                id='login'
                label='Login'
                name='login'
                autoComplete='username'
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.first_name}
                error={Boolean(formErrors.first_name)}
                helperText={formErrors.first_name}
                onChange={handleChangeInput}
                autoComplete='given-name'
                name='first_name'
                required
                fullWidth
                id='first_name'
                label='First Name'
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.second_name}
                error={Boolean(formErrors.second_name)}
                helperText={formErrors.second_name}
                onChange={handleChangeInput}
                required
                fullWidth
                id='second_name'
                label='Last Name'
                name='second_name'
                autoComplete='family-name'
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.email}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
                onChange={handleChangeInput}
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.phone}
                error={Boolean(formErrors.phone)}
                helperText={formErrors.phone}
                onChange={handleChangeInput}
                autoComplete='tel'
                name='phone'
                required
                fullWidth
                id='phone'
                label='Phone'
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='error'
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 2 }}
                color='secondary'
              >
                Save
              </Button>
              <Button
                type='button'
                fullWidth
                variant='contained'
                sx={{ mt: 2 }}
                color='info'
                onClick={() => navigate('/')}
              >
                Back
              </Button>
              <ErrorAuth />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Button
                type='button'
                fullWidth
                onClick={handleOpen}
              >
                Change password
              </Button>
            </Grid>
          </Grid>
        </Box>
        <PasswordModal
          open={modalOpen}
          onClose={handleClose}
        />
      </Box>
    </Container>
  );
};

export const initProfilePage = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(getCurrentUser());
  }
};
