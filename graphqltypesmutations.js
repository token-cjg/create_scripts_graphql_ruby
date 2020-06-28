// GraphQl Types, Root Queries, and Mutations

const graphql = require('graphql');
const pool = require('../db/sql_pool.js');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const AdminType = new GraphQLObjectType({
  name: 'Admin',
  fields: () => ({
    id: { type: GraphQLID },
    store_id: { type: GraphQLID },
    everyRelatedStore: {
      type: new GraphQLList(StoreType),
      resolve(parent, args) {
        const sql = `SELECT * FROM "Store" WHERE "id" = '${parent.store_id}';`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    name: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    order_id: { type: GraphQLID },
    everyRelatedOrder: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        const sql = `SELECT * FROM "Order" WHERE "id" = '${parent.order_id}';`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    store_id: { type: GraphQLID },
    relatedStore: {
      type: StoreType,
      resolve(parent, args) {
        const sql = `SELECT * FROM "Store" WHERE "id" = '${parent.store_id}';`
        return pool.query(sql)
          .then(res => res.rows[0])
          .catch(err => console.log('Error: ', err))
      }
    }
  })
});

const StoreType = new GraphQLObjectType({
  name: 'Store',
  fields: () => ({
    admin_id: { type: GraphQLID },
    everyRelatedAdmin: {
      type: new GraphQLList(AdminType),
      resolve(parent, args) {
        const sql = `SELECT * FROM "Admin" WHERE "id" = '${parent.admin_id}';`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    user_id: { type: GraphQLID },
    everyRelatedUser: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        const sql = `SELECT * FROM "User" WHERE "id" = '${parent.user_id}';`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    product_id: { type: GraphQLID },
    everyRelatedProduct: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        const sql = `SELECT * FROM "Product" WHERE "id" = '${parent.product_id}';`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    id: { type: GraphQLID },
    is_shuttered: { type: GraphQLBoolean }
  })
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    stock_level: { type: GraphQLInt },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    order_id: { type: GraphQLID },
    everyRelatedOrder: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        const sql = `SELECT * FROM "Order" WHERE "id" = '${parent.order_id}';`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    store_id: { type: GraphQLID },
    relatedStore: {
      type: StoreType,
      resolve(parent, args) {
        const sql = `SELECT * FROM "Store" WHERE "id" = '${parent.store_id}';`
        return pool.query(sql)
          .then(res => res.rows[0])
          .catch(err => console.log('Error: ', err))
      }
    }
  })
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    delivery_address: { type: GraphQLString },
    is_shipped: { type: GraphQLBoolean }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    everyAdmin: {
      type: new GraphQLList(AdminType),
      resolve() {
        const sql = `SELECT * FROM "Admin";`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    everyUser: {
      type: new GraphQLList(UserType),
      resolve() {
        const sql = `SELECT * FROM "User";`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    everyStore: {
      type: new GraphQLList(StoreType),
      resolve() {
        const sql = `SELECT * FROM "Store";`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    everyProduct: {
      type: new GraphQLList(ProductType),
      resolve() {
        const sql = `SELECT * FROM "Product";`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    },
    everyOrder: {
      type: new GraphQLList(OrderType),
      resolve() {
        const sql = `SELECT * FROM "Order";`
        return pool.query(sql)
          .then(res => res.rows)
          .catch(err => console.log('Error: ', err))
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAdmin: {
      type: AdminType,
      args: {
        id: { type: GraphQLID },
        store_id: { type: GraphQLID },
        name: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        const columns = Object.keys(args).map(el => `"${el}"`);
        const values = Object.values(args).map(el => `'${el}'`);
        const sql = `INSERT INTO "Admin" (${columns}) VALUES (${values}) RETURNING *`;
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    addUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        order_id: { type: GraphQLID },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
        store_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        const columns = Object.keys(args).map(el => `"${el}"`);
        const values = Object.values(args).map(el => `'${el}'`);
        const sql = `INSERT INTO "User" (${columns}) VALUES (${values}) RETURNING *`;
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    addStore: {
      type: StoreType,
      args: {
        admin_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        product_id: { type: GraphQLID },
        id: { type: GraphQLID },
        is_shuttered: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        const columns = Object.keys(args).map(el => `"${el}"`);
        const values = Object.values(args).map(el => `'${el}'`);
        const sql = `INSERT INTO "Store" (${columns}) VALUES (${values}) RETURNING *`;
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    addProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        stock_level: { type: GraphQLInt },
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        order_id: { type: GraphQLID },
        store_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        const columns = Object.keys(args).map(el => `"${el}"`);
        const values = Object.values(args).map(el => `'${el}'`);
        const sql = `INSERT INTO "Product" (${columns}) VALUES (${values}) RETURNING *`;
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    },
    addOrder: {
      type: OrderType,
      args: {
        id: { type: GraphQLID },
        delivery_address: { type: GraphQLString },
        is_shipped: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        const columns = Object.keys(args).map(el => `"${el}"`);
        const values = Object.values(args).map(el => `'${el}'`);
        const sql = `INSERT INTO "Order" (${columns}) VALUES (${values}) RETURNING *`;
        return pool.connect()
          .then(client => {
            return client.query(sql)
              .then(res => {
                client.release();
                return res.rows[0];
              })
              .catch(err => {
                client.release();
                console.log('Error: ', err);
              })
          })
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
