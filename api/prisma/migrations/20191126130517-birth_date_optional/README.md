# Migration `20191126130517-birth_date_optional`

This migration has been generated at 11/26/2019, 1:05:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" DROP COLUMN "birth_date",
ADD COLUMN "birth_date" timestamp(3)   ;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191125123833-remove_posts..20191126130517-birth_date_optional
--- datamodel.dml
+++ datamodel.dml
@@ -1,20 +1,22 @@
 generator photon {
   provider = "photonjs"
+  // output = "."
+  binaryTargets = ["native", "debian-openssl-1.1.x"]
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = "postgresql://postgres:postgres@postgres/postgres"
 }
 model User {
   id             String   @default(cuid()) @id
   password_hash  String
   email          String   @unique
   first_name     String
   last_name      String
-  birth_date     DateTime
+  birth_date     DateTime?
   emails         Email[]
   phones         Phone[]
   depots         Depot[]
   ratings        Rating[]
```

## Photon Usage

You can use a specific Photon built for this migration (20191126130517-birth_date_optional)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191126130517-birth_date_optional'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
