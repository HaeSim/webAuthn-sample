import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const authentication = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });

  const { username } = req.body;

  try {
    // supabase에서
    // user 테이블의 id, authenticator 테이블의 user_id를 조인한 뒤, user 테이블의 username이 일치하는 데이터를 가져온다.
    const { data: authenticatorsInfo, error } = await supabase
      .from('user')
      .select('authenticator(user_id, credentialid, transports)')
      .eq('username', username)
      .single();

    // 데이터가 없으면 에러를 반환한다.
    if (!authenticatorsInfo)
      return res.status(401).json({ error: 'Unauthorized' });

    const authenticators = authenticatorsInfo.authenticator;

    const options = await generateAuthenticationOptions({
      allowCredentials: authenticators.map(
        (authenticator: {
          credentialid:
            | WithImplicitCoercion<string>
            | { [Symbol.toPrimitive](hint: 'string'): string };
        }) => {
          return {
            id: Buffer.from(authenticator.credentialid, 'base64'),
            type: 'public-key',
          };
        }
      ),
      userVerification: 'preferred',
    });
    if (error) return res.status(500).json({ error });

    return res.status(200).json({ options });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // request의 method에 따라 다른 함수를 실행한다.
  switch (req.method) {
    case 'POST':
      return authentication(req, res);
    default:
      return res.status(405).end();
  }
}
