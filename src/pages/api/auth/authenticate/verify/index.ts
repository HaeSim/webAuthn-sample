import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { rp } from '@/lib/webAuthn/relyingParty';

const verify = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });

  // request body에서 username과 authenticatorResponse를 가져온다.
  const { username, authenticatorResponse } = req.body;

  // supabase에서 username을 가진 user를 가져온다.
  const { data: user, error } = await supabase
    .from('user')
    .select()
    .match({ username });
  if (error) {
    return res.status(500).json({ error });
  }

  if (user.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  // 해당 user_id를 가진 authenticator를 가져온다.
  const { data: authenticator, error: authenticatorError } = await supabase
    .from('authenticator')
    .select()
    .match({ user_id: user[0].id });

  if (authenticatorError) {
    return res.status(500).json({ error: authenticatorError });
  }

  if (authenticator.length === 0) {
    return res.status(404).json({ error: 'Authenticator not found' });
  }

  // expectedChallenge를 가져온다.
  const expectedChallenge = user[0].currentchallenge;

  // authenticatorResponse를 검증한다.
  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response: authenticatorResponse,
      expectedChallenge,
      expectedOrigin: rp.origin,
      expectedRPID: rp.rpID,
      authenticator: authenticator[0],
    });
  } catch (err) {
    return res.status(500).json({ error });
  }

  const { verified } = verification;

  return res.status(200).json({ verified });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // request의 method에 따라 다른 함수를 실행한다.
  switch (req.method) {
    case 'POST':
      return verify(req, res);
    default:
      return res.status(405).end();
  }
}
