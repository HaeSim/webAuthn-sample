import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import Landing from '@/components/templates/Layout/Landing';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Index: NextPageWithLayout = () => {
  const createInputRef = useRef<HTMLInputElement>(null);
  const [countries, setCountries] = useState<
    {
      name: string;
      id: string;
    }[]
  >([]);

  const handleRequest = async () => {
    try {
      const res = await axios.get('/api/test');

      setCountries(res.data.countries);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createInput = createInputRef.current;

    if (!createInput) return;
    const res = axios.post('/api/test', {
      country: createInput.value,
    });

    if (!res) return;

    createInput.value = '';
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    const newName = document.getElementById(
      `update-input-${id}`
    ) as HTMLInputElement;

    try {
      const res = await axios.put('/api/test', {
        id,
        country: newName.value,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    try {
      const res = await axios.delete('/api/test', {
        data: {
          id,
        },
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MetaInfo
        title="Home | Nextjs Boilerplate"
        description="This is the home page of the Nextjs Boilerplate app."
      />
      <Typography variant="h2" component="h1" sx={{ textAlign: 'center' }}>
        WebAuthn With Next.js
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '1rem',
          height: '100%',
        }}
      >
        {/* CRUD 예제 폼 */}
        {/* 1. Create */}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1rem',
            height: '100%',
          }}
        >
          <Typography variant="h3" component="h1" sx={{ textAlign: 'center' }}>
            Create
          </Typography>
          <TextField
            id="create-input"
            label="Create Input"
            variant="outlined"
            inputRef={createInputRef}
          />
          <Button type="submit">Create</Button>
        </Box>

        {/* 2. Read */}
        {/* 3. Update */}
        {/* 4. Delete */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1rem',
            height: '100%',
          }}
        >
          <Typography variant="h3" component="h1" sx={{ textAlign: 'center' }}>
            Read
          </Typography>
          {/* 수정, 삭제가 가능한 리스트 나열 */}
          {countries.map((country) => (
            <Box
              key={country.id}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                gap: '1rem',
                height: '100%',
              }}
            >
              <Typography key={country.id} variant="body1" component="p">
                {country.name}
              </Typography>
              <TextField
                id={`update-input-${country.id}`}
                label="Update Input"
                variant="outlined"
              />
              <Button id={country.id} onClick={handleUpdate}>
                Update
              </Button>
              <Button id={country.id} onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          ))}
          <Button onClick={handleRequest}>Read</Button>
        </Box>
      </Box>
    </>
  );
};

Index.getLayout = generateGetLayout(Landing);

export default Index;
