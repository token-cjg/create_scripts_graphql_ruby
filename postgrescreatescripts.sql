CREATE TABLE "Admin" (
  "id"  serial,
  "store_id"  serial,
  "name"  varchar,
  "password"  varchar
) WITH (
  OIDS=FALSE
);

CREATE TABLE "User" (
  "id"  serial,
  "order_id"  serial,
  "name"  varchar,
  "address"  varchar,
  "phone"  varchar,
  "password"  varchar,
  "store_id"  serial
) WITH (
  OIDS=FALSE
);

CREATE TABLE "Store" (
  "admin_id"  serial,
  "user_id"  serial,
  "product_id"  serial,
  "id"  serial,
  "is_shuttered"  boolean
) WITH (
  OIDS=FALSE
);

CREATE TABLE "Product" (
  "id"  serial,
  "stock_level"  integer,
  "name"  varchar,
  "price"  varchar,
  "order_id"  serial,
  "store_id"  serial
) WITH (
  OIDS=FALSE
);

CREATE TABLE "Order" (
  "id"  serial,
  "delivery_address"  varchar,
  "is_shipped"  boolean
) WITH (
  OIDS=FALSE
);


ALTER TABLE "Admin" ADD CONSTRAINT "Admin_fk0" FOREIGN KEY ("store_id") REFERENCES "Store"("id");

ALTER TABLE "User" ADD CONSTRAINT "User_fk0" FOREIGN KEY ("order_id") REFERENCES "Order"("id");

ALTER TABLE "User" ADD CONSTRAINT "User_fk1" FOREIGN KEY ("store_id") REFERENCES "Store"("id");

ALTER TABLE "Store" ADD CONSTRAINT "Store_fk0" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id");

ALTER TABLE "Store" ADD CONSTRAINT "Store_fk1" FOREIGN KEY ("user_id") REFERENCES "User"("id");

ALTER TABLE "Store" ADD CONSTRAINT "Store_fk2" FOREIGN KEY ("product_id") REFERENCES "Product"("id");

ALTER TABLE "Product" ADD CONSTRAINT "Product_fk0" FOREIGN KEY ("order_id") REFERENCES "Order"("id");

ALTER TABLE "Product" ADD CONSTRAINT "Product_fk1" FOREIGN KEY ("store_id") REFERENCES "Store"("id");
