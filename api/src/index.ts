import { nexusPrismaPlugin } from 'nexus-prisma';
import { idArg, makeSchema, objectType, stringArg, booleanArg } from 'nexus';
import { GraphQLServer } from 'graphql-yoga';
import { join } from 'path';
import { Context } from './types';

import * as models from './models';
import { main } from './seed';
main();

import { Photon } from '@prisma/photon';
const photon = new Photon();

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.users();
    t.crud.depots();
    t.crud.tools();
  }
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser();
    t.crud.createOneDepot();
    t.crud.createOneTool();
  }
});

const schema = makeSchema({
  types: [models, Mutation, Query],
  plugins: [nexusPrisma],
  outputs: {
    typegen: join(__dirname, '../generated/nexus-typegen.ts'),
    schema: join(__dirname, '/schema.graphql')
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon'
      },
      {
        source: join(__dirname, 'types.ts'),
        alias: 'ctx'
      }
    ],
    contextType: 'ctx.Context'
  }
});

const server = new GraphQLServer({
  schema,
  context: { photon }
});

server.express.get('/two', (req, res) => res.send('leave me here'))

server.start(
  {
    endpoint: '/graphql',
    playground: process.env.NODE_ENV === 'production' ? false : '/graphql',
    subscriptions: false,
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  () => console.log(`🚀 Server ready`)
);