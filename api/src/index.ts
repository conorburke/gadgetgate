import express from 'express';

import { Photon } from '@prisma/photon';

const app = express();
const photon = new Photon();

async function main() {
  const user = await photon.users.create({
    data: {
      first_name: 'Conor',
      last_name: 'Burke',
      password_hash: 'abcd',
      email: 'conor@gadgetgate.com' + `${Math.random()}`,
      birth_date: new Date((new Date()).getTime() + 24*60*60*1000)

    }
  })

  console.log(`created user ${user.first_name}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })

app.get('/', (req, res) => res.send('leave me here'));

app.listen(4000, () => console.log('listening'));