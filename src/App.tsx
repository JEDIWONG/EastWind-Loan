import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import FindLoan from './pages/loan/FindLoan'
import LoanProductPage from './pages/loan/LoanProduct'
import LoanApplication from './pages/loan/LoanApplication'
import LenderDashboard from './pages/lender/LenderDashboard'
import LoanApplicationDetails from './pages/loan/LoanApplicationDetails'
import LoanOfferDetails from './pages/loan/LoanOfferDetails'
import LoanApplicationDashboard from './pages/loan/dashboard/LoanApplicationDashboard'
import LoanOfferDashboard from './pages/loan/dashboard/LoanOfferDashboard'
import LoanDisbursementDashboard from './pages/loan/dashboard/LoanDisbursementDashboard'
import ActiveLoanDashboard from './pages/loan/dashboard/ActiveLoanDashboard'
import LoanDetails from './pages/loan/LoanDetails'
import BorrowerLoanDashboard from './pages/loan/BorrowerLoanDashboard'
import LoanCalculator from './pages/LoanCalculator'
import LenderProductDashboard from './pages/lender/LenderProductDashboard'
import LenderProductCreate from './pages/lender/Product/LenderProductCreate'

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/auth">
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>

                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
            
                    <Route path="compare" element={<LoanCalculator/>} />
                    <Route path="find-loan" element={<FindLoan />} />
                    <Route
                        path="loan-product/:loanProductId"
                        element={<LoanProductPage />}
                    />
                    <Route
                        path="apply/:loanProductId"
                        element={<LoanApplication />}
                    />
                    <Route
                        path="loan-application/:id"
                        element={<LoanApplicationDetails />}
                    />
                    <Route
                        path="loan-offer/:id"
                        element={<LoanOfferDetails />}
                    />
                    <Route
                      path="loan/:id"
                      element={<LoanDetails/>}
                    />

                    <Route path="/borrower">
                        <Route path="dashboard" element={<BorrowerLoanDashboard/>}/>
                    </Route>
                </Route>

                <Route path="/lender" element={<Layout />}>
                    <Route
                        path="dashboard"
                        element={<LenderDashboard />}
                    />
                    <Route
                      path="applications"
                      element={<LoanApplicationDashboard />}
                    />
                    <Route
                      path="offers"
                      element={<LoanOfferDashboard />}
                    />
                    <Route
                        path="disbursements"
                        element={<LoanDisbursementDashboard />}
                    />
                    <Route
                        path="active-loans"
                        element={<ActiveLoanDashboard />}
                    />
                    <Route
                        path="loan-application/:id"
                        element={<LoanApplicationDetails />}
                    />
                    <Route
                        path="loan-offer/:id"
                        element={<LoanOfferDetails />}
                    />
                    <Route
                      path="loan/:id"
                      element={<LoanDetails/>}
                    />
                    <Route
                      path="loan/:id"
                      element={<LoanDetails/>}
                    />

                    <Route
                        path="product"
                        element={<LenderProductDashboard />}
                    />

                    <Route
                        path="product/create"
                        element={<LenderProductCreate />}
                    />

                    <Route
                        path="product/:id/edit"
                        element={<LenderProductCreate />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App