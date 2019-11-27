import { Photon } from '@prisma/photon';
const photon = new Photon();

export async function main() {
  const user = await photon.users.create({
    data: {
      first_name: 'Conor',
      last_name: 'Burke',
      password_hash: 'abcd',
      email: 'conor@gadgetgate.com' + `${Math.random()}`

    }
  })

  const depot = await photon.depots.create({
    data: {
      address_1: '127 caracas',
      city: 'Hershey',
      province: 'pa',
      zipcode: '17033',
      owner: {connect: {id: user.id}} ,

    }
  })

  const tool = await photon.tools.create({
    data: {
      title: 'hammer',
      category: 'hardware',
      description: 'heavy',
      price: 100,
      depot: {connect: {id: depot.id}}
    }
  })

  console.log(`created user ${user.first_name}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    // await photon.disconnect()
  })