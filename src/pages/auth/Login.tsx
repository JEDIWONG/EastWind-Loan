import { useState } from 'react';
import {
  ArrowBack,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import logo from '../../assets/logo.png';
import google_logo from '../../assets/google.png';
import { useRouteHelper } from '../../utils/route-helper';
import LoadingOverlay from '../../components/generic/loading/LoadingOverlay';
import { login } from '../../auth/login';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { routeAfterSignIn, navToHome } = useRouteHelper();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);
    
      if (response.success) {
        routeAfterSignIn(); 
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally{
      setLoading(false); 
    }
  };

  return (

    <>
      {loading && <LoadingOverlay />}
      <div className="flex flex-col min-h-screen items-center justify-center mx-10">

        <Button
          variant="text"
          startIcon={<ArrowBack />}
          onClick={navToHome}
          className="relative right-100"
        >
          Back
        </Button>

        <form 
          onSubmit={handleLogin}
          method='post'
          className="w-full max-w-lg rounded-4xl bg-white px-10 py-20 shadow-xl">

          <div className="mb-15 flex flex-col items-center text-center">

            <img
              className="mb-5 h-5 w-40"
              src={logo}
              alt="EastWind Loan"
            />

            <p className="text-lg font-bold">
              Sign In
            </p>

            <div className="mt-5 flex items-center justify-center gap-3 text-center text-xs">

              <p>
                Not yet a member?
              </p>

              <a
                href="/auth/register/"
                className="font-bold text-indigo-500 transition hover:text-indigo-600"
              >
                Create Account for New User
              </a>

            </div>

          </div>

          <div className="flex flex-col gap-6">

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-gray-700"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-lg border border-gray-300 p-3 pr-12 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </button>

                <div className="mt-2 text-right">
                  <a
                    href="/forgot-password"
                    className="text-sm font-medium text-indigo-500 transition hover:text-indigo-600"
                  >
                    Forgot Password?
                  </a>
                </div>

              </div>
            </div>

            <button
              type='submit'
              className="rounded-lg bg-yellow-500 p-3 font-bold text-black transition hover:cursor-pointer hover:bg-yellow-600"
            >
              Login
            </button>

            <div className="items-center justify-center text-center">

              <p>
                Or
              </p>

              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white p-3 text-black transition hover:cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={google_logo}
                  alt="Google Logo"
                  className="h-5 w-5"
                />

                Sign In With Google
              </button>

            </div>

          </div>

        </form>

      </div>
    </>
  );
};

export default Login;