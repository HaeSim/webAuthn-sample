import { generateRegistrationOptions } from '@simplewebauthn/server';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import error from 'next/error';

import { rp } from '@/lib/webAuthn/relyingParty';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });

  const { username } = req.body;
  // eslint-disable-next-line no-console
  console.log('rp info : ', rp);
  const option = await generateRegistrationOptions({
    rpName: rp.rpName,
    rpID: rp.rpID,
    userID: username,
    userName: username,
    attestationType: 'none',
    excludeCredentials: [],
  });

  try {
    // supabase에서 username을 가진 user를 가져온다.
    const { data: user, error: selectError } = await supabase
      .from('user')
      .select()
      .match({ username });
    if (selectError) {
      return res.status(500).json({ selectError });
    }
    // supabase에서 username을 가진 user가 없으면 새로 생성한다.
    if (user.length === 0) {
      const { error: insertError } = await supabase
        .from('user')
        .insert({ username, currentchallenge: option.challenge });
      if (insertError) {
        return res.status(500).json({ insertError });
      }
    } else {
      // supabase에서 username을 가진 user가 있으면 currentChallenge를 업데이트한다.
      const { error: updateError } = await supabase
        .from('user')
        .update({ currentchallenge: option.challenge })
        .match({ username });
      if (updateError) {
        return res.status(500).json({ updateError });
      }
    }
  } catch (err) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ option });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // request의 method에 따라 다른 함수를 실행한다.
  switch (req.method) {
    case 'POST':
      return register(req, res);
    default:
      return res.status(405).end();
  }
}
