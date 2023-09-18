import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const getDBData = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });

  const { data: countries } = await supabase.from('countries').select();

  return res.status(200).json({ countries });
};

const writeDBData = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });
  // request body에서 country를 가져온다.
  const { country } = req.body;

  // supabase에 country를 추가한다.
  const { data, error } = await supabase
    .from('countries')
    .insert([{ name: country }]);
  if (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ data });
};

const updateDBData = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });
  // request body에서 country를 가져온다.
  const { id, country } = req.body;

  // supabase에 country를 추가한다.
  const { data, error } = await supabase
    .from('countries')
    .update({ name: country })
    .match({ id });
  if (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ data });
};

const deleteDBData = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });
  // request body에서 country를 가져온다.
  const { id } = req.body;

  // supabase에 country를 추가한다.
  const { data, error } = await supabase
    .from('countries')
    .delete()
    .match({ id });
  if (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ data });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // request의 method에 따라 다른 함수를 실행한다.
  switch (req.method) {
    case 'GET':
      return getDBData(req, res);
    case 'POST':
      return writeDBData(req, res);
    case 'PUT':
      return updateDBData(req, res);
    case 'DELETE':
      return deleteDBData(req, res);
    default:
      return res.status(405).end();
  }
}
