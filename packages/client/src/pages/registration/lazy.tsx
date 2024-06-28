import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { validateAllFields, validateField } from '../../helpers/validate';

type FormSignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

type FormSignUpErrors = {
  first_name?: string;
  second_name?: string;
  login?: string;
  email?: string;
  password?: string;
  phone?: string;
};

export function SignUp(): JSX.Element {
  const [formValues, setFormValues] = useState<FormSignUp>({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  });

  const [formErrors, setFormErrors] = useState<FormSignUpErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const error = validateField(name, value);

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const validationErrors = validateAllFields(formValues);

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.info({
        first_name: data.get('first_name'),
        second_name: data.get('second_name'),
        login: data.get('login'),
        email: data.get('email'),
        password: data.get('password'),
        phone: data.get('phone'),
      });
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component='h1'
          variant='h5'
        >
          Sign up
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
              sm={6}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.first_name}
                error={Boolean(formErrors.first_name)}
                helperText={formErrors.first_name}
                onChange={handleChange}
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
                onChange={handleChange}
                required
                fullWidth
                id='second_name'
                label='Second Name'
                name='second_name'
                autoComplete='family-name'
              />
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
                onChange={handleChange}
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
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.email}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
                onChange={handleChange}
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
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.password}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
                onChange={handleChange}
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.phone}
                error={Boolean(formErrors.phone)}
                helperText={formErrors.phone}
                onChange={handleChange}
                autoComplete='tel'
                name='phone'
                required
                fullWidth
                id='phone'
                label='Phone'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid
            container
            justifyContent='flex-end'
          >
            <Grid item>
              <Link
                href='login'
                variant='body2'
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
