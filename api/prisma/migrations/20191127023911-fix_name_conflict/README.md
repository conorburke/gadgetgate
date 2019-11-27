# Migration `20191127023911-fix_name_conflict`

This migration has been generated at 11/27/2019, 2:39:11 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Rating" DROP COLUMN "type",
ADD COLUMN "kind" text NOT NULL DEFAULT 'Loaner' ;

ALTER TABLE "public"."Depot" DROP COLUMN "state",
ADD COLUMN "province" text NOT NULL DEFAULT '' ;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191126130517-birth_date_optional..20191127023911-fix_name_conflict
--- datamodel.dml
+++ datamodel.dml
@@ -5,9 +5,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = "postgresql://postgres:postgres@postgres/postgres"
 }
 model User {
   id             String   @default(cuid()) @id
@@ -38,9 +38,9 @@
 model Rating {
   id      String  @default(cuid()) @id
   point   Int
-  type    RatingType
+  kind    RatingType
   comment String?
   user    User
 }
@@ -53,9 +53,9 @@
   id        String  @default(cuid()) @id
   address_1 String
   address_2 String?
   city      String
-  state     String
+  province     String
   zipcode   String
   owner     User
   tools     Tool[]
 }
```

## Photon Usage

You can use a specific Photon built for this migration (20191127023911-fix_name_conflict)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191127023911-fix_name_conflict'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
