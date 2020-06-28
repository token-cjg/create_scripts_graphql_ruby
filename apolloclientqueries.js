// Client Queries

import { gql } from 'apollo-boost';

const queryEveryAdmin = gql`
  {
    everyAdmin {
      id
      store_id
      name
      password
    }
  }
`

const queryEveryUser = gql`
  {
    everyUser {
      id
      order_id
      name
      address
      phone
      password
      store_id
    }
  }
`

const queryEveryStore = gql`
  {
    everyStore {
      admin_id
      user_id
      product_id
      id
      is_shuttered
    }
  }
`

const queryEveryProduct = gql`
  {
    everyProduct {
      id
      stock_level
      name
      price
      order_id
      store_id
    }
  }
`

const queryEveryOrder = gql`
  {
    everyOrder {
      id
      delivery_address
      is_shipped
    }
  }
`

export { queryEveryAdmin, queryEveryUser, queryEveryStore, queryEveryProduct, queryEveryOrder};



Client Mutations

import { gql } from 'apollo-boost';

const addAdminMutation = gql`
  mutation($id: ID, $store_id: ID, $name: String, $password: String) {
    addAdmin(id: $id, store_id: $store_id, name: $name, password: $password) {
      id
      store_id
      name
      password
    }
  }
`

const addUserMutation = gql`
  mutation($id: ID, $order_id: ID, $name: String, $address: String, $phone: String, $password: String, $store_id: ID) {
    addUser(id: $id, order_id: $order_id, name: $name, address: $address, phone: $phone, password: $password, store_id: $store_id) {
      id
      order_id
      name
      address
      phone
      password
      store_id
    }
  }
`

const addStoreMutation = gql`
  mutation($admin_id: ID, $user_id: ID, $product_id: ID, $id: ID, $is_shuttered: Boolean) {
    addStore(admin_id: $admin_id, user_id: $user_id, product_id: $product_id, id: $id, is_shuttered: $is_shuttered) {
      admin_id
      user_id
      product_id
      id
      is_shuttered
    }
  }
`

const addProductMutation = gql`
  mutation($id: ID, $stock_level: Int, $name: String, $price: String, $order_id: ID, $store_id: ID) {
    addProduct(id: $id, stock_level: $stock_level, name: $name, price: $price, order_id: $order_id, store_id: $store_id) {
      id
      stock_level
      name
      price
      order_id
      store_id
    }
  }
`

const addOrderMutation = gql`
  mutation($id: ID, $delivery_address: String, $is_shipped: Boolean) {
    addOrder(id: $id, delivery_address: $delivery_address, is_shipped: $is_shipped) {
      id
      delivery_address
      is_shipped
    }
  }
`

export {
  addAdminMutation,
  addUserMutation,
  addStoreMutation,
  addProductMutation,
  addOrderMutation,
};
