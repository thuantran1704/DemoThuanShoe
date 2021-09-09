import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import AllProductScreen from './screens/AllProductScreen'
import BrandScreen from './screens/BrandScreen'
import AboutScreen from './screens/AboutScreen'
import CategoryScreen from './screens/CategoryScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import BrandListScreen from './screens/BrandListScreen'
import BrandCreateScreen from './screens/BrandCreateScreen'
import BrandEditScreen from './screens/BrandEditScreen'
import CategoryListScreen from './screens/CategoryListScreen'
import CategoryEditScreen from './screens/CategoryEditScreen'
import CategoryCreateScreen from './screens/CategoryCreateScreen'
import ReceiptCartScreen from './screens/ReceiptCartScreen'
import SupplierScreen from './screens/SupplierScreen'
import PlaceReceiptScreen from './screens/PlaceReceiptScreen'
import ReceiptScreen from './screens/ReceiptScreen'
import ReceiptListScreen from './screens/ReceiptListScreen'
import DashboardScreen from './screens/DashboardScreen'
import RevenueScreen from './screens/RevenueScreen'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap-v5'

const App = () => {
  return (
    <Router>
      <Header />
      <div class="dropdown-divider" />

      <main className='py-1'>

        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />


          <Route path='/allproduct' component={AllProductScreen} exact />
          <Route path='/allproduct/page/:pageNumber' component={AllProductScreen} exact />
          <Route path='/allproduct/search/:keyword' component={AllProductScreen} exact />
          <Route path='/allproduct/search/:keyword/page/:pageNumber' component={AllProductScreen} exact />

          <Route path='/login' component={LoginScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeOrder' component={PlaceOrderScreen} />
          <Route path='/brand/:brand' component={BrandScreen} exact />
          <Route path='/brand/:brand/:pageNumber' component={BrandScreen} exact />
          <Route path='/category/:category' component={CategoryScreen} exact />
          <Route path='/category/:category/:pageNumber' component={CategoryScreen} exact />

          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/product/create' component={ProductCreateScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/productlist/search/:keyword' component={ProductListScreen} exact />
          <Route path='/admin/productlist/search/:keyword/page/:pageNumber' component={ProductListScreen} exact />

          <Route path='/admin/orderlist' component={OrderListScreen} exact />
          <Route path='/admin/orderlist/:pageNumber' component={OrderListScreen} exact />

          <Route path='/admin/brandlist' component={BrandListScreen} exact />
          <Route path='/admin/brand/create' component={BrandCreateScreen} exact />
          <Route path='/admin/brand/:id/edit' component={BrandEditScreen} />

          <Route path='/admin/categorylist' component={CategoryListScreen} exact />
          <Route path='/admin/category/create' component={CategoryCreateScreen} />
          <Route path='/admin/category/:id/edit' component={CategoryEditScreen} />

          <Route path='/admin/receiptCart/:id?' component={ReceiptCartScreen} />
          <Route path='/admin/supplier' component={SupplierScreen} />
          <Route path='/admin/placeReceipt' component={PlaceReceiptScreen} />

          <Route path='/admin/receiptlist' component={ReceiptListScreen} />

          <Route path='/admin/statistic' component={DashboardScreen} />
          <Route path='/admin/revenue' component={RevenueScreen} />

          <Route path='/admin/receipt/:id?' component={ReceiptScreen} />

          <Route path='/order/:id?' component={OrderScreen} />
          <Route path='/about' component={AboutScreen} />
        </Container>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
