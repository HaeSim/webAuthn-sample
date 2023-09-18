import { Box, Button, TextField, Typography } from '@mui/material';
import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';
import type { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types';
import axios from 'axios';
import type { FormEvent } from 'react';
import { useState } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import Landing from '@/components/templates/Layout/Landing';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Index: NextPageWithLayout = () => {
  const [registUsername, setRegistUsername] = useState<string>('');
  const [authenticateUsername, setAuthenticateUsername] = useState<string>('');

  const [registOption, setRegistOption] =
    useState<PublicKeyCredentialCreationOptionsJSON | null>(null);
  const [authenticateOption, setAuthenticateOption] =
    useState<PublicKeyCredentialCreationOptionsJSON | null>(null);

  const handleClickRegistOption = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!registUsername) return;

    const resOption: {
      data: { option: PublicKeyCredentialCreationOptionsJSON };
    } = await axios.post('/api/auth/register/option', {
      username: registUsername,
    });

    if (!resOption) return;

    setRegistOption(resOption.data.option);
  };

  const handleClickAuthenticateOption = async (
    e: FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!authenticateUsername) return;

    const resOption: {
      data: { options: PublicKeyCredentialCreationOptionsJSON };
    } = await axios.post('/api/auth/authenticate/option', {
      username: authenticateUsername,
    });

    if (!resOption) return;

    setAuthenticateOption(resOption.data.options);
  };

  const handleClickRegister = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!registOption) return;

    try {
      const authenticatorResponse = await startRegistration(registOption);

      await axios.post('/api/auth/register/verify', {
        username: registUsername,
        authenticatorResponse,
      });
    } catch (error) {
      /* empty */
    }
  };

  const handleClickAuthenticate = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!authenticateOption) return;

    try {
      const authenticatorResponse = await startAuthentication(
        authenticateOption
      );

      await axios.post('/api/auth/authenticate/verify', {
        username: authenticateUsername,
        authenticatorResponse,
      });
    } catch (error) {
      /* empty */
    }
  };

  return (
    <>
      <MetaInfo
        title="Home | Nextjs Boilerplate"
        description="This is the home page of the Nextjs Boilerplate app."
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '1rem',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '1rem',
            minWidth: '340px',
            height: '100%',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '1rem',
          }}
        >
          <Typography variant="h3" component="h1" sx={{ textAlign: 'center' }}>
            Register
          </Typography>
          <Typography variant="body1" component="p" fontWeight="bold">
            1. user:
            <br />
            <Typography
              variant="body2"
              component="span"
              sx={{
                display: 'inline-block',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                '&::before': {
                  content: '"\\""',
                },
                '&::after': {
                  content: '"\\""',
                },
              }}
            >
              {registOption?.user.displayName}(id: {registOption?.user.id})
            </Typography>
          </Typography>
          <Typography variant="body1" component="p" fontWeight="bold">
            2. rp:
            <br />
            <Typography
              variant="body2"
              component="span"
              sx={{
                display: 'inline-block',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                '&::before': {
                  content: '"\\""',
                },
                '&::after': {
                  content: '"\\""',
                },
              }}
            >
              {registOption?.rp.name}(id: {registOption?.rp.id})
            </Typography>
          </Typography>
          <Typography variant="body1" component="p" fontWeight="bold">
            3. challenge:
            <br />
            <Typography
              variant="body2"
              component="span"
              sx={{
                display: 'inline-block',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                '&::before': {
                  content: '"\\""',
                },
                '&::after': {
                  content: '"\\""',
                },
              }}
            >
              {registOption?.challenge}
            </Typography>
          </Typography>
          <Typography variant="body1" component="p" fontWeight="bold">
            4. timeout:
            <br />
            <Typography
              variant="body2"
              component="span"
              sx={{
                display: 'inline-block',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                '&::before': {
                  content: '"\\""',
                },
                '&::after': {
                  content: '"\\""',
                },
              }}
            >
              {registOption?.timeout}
            </Typography>
          </Typography>
          <TextField
            required
            label="Username"
            variant="outlined"
            value={registUsername}
            onChange={(e) => setRegistUsername(e.target.value)}
          />
          <Button type="button" onClick={handleClickRegistOption}>
            Option
          </Button>
          <Button type="button" onClick={handleClickRegister}>
            Registraion
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '1rem',
            minWidth: '340px',
            height: '100%',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '1rem',
          }}
        >
          <Typography variant="h3" component="h1" sx={{ textAlign: 'center' }}>
            Authentication
          </Typography>
          <Typography variant="body1" component="p" fontWeight="bold">
            2. challenge:
            <br />
            <Typography
              variant="body2"
              component="span"
              sx={{
                display: 'inline-block',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                '&::before': {
                  content: '"\\""',
                },
                '&::after': {
                  content: '"\\""',
                },
              }}
            >
              {authenticateOption?.challenge}
            </Typography>
          </Typography>

          <TextField
            required
            label="Username"
            variant="outlined"
            value={authenticateUsername}
            onChange={(e) => setAuthenticateUsername(e.target.value)}
          />
          <Button type="button" onClick={handleClickAuthenticateOption}>
            Option
          </Button>
          <Button type="button" onClick={handleClickAuthenticate}>
            Authentication
          </Button>
        </Box>
      </Box>
    </>
  );
};

Index.getLayout = generateGetLayout(Landing);

export default Index;
