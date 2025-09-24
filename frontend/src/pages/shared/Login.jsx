import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";
import { useAuthContext } from "@/hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const navigate = useNavigate();
  const {login,error,isLoading}=useLogin()
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const {user} = useAuthContext()
  const handleSubmit = async (e) => {
    e.preventDefault();

      await login(email,pwd)
      if(!error){
        setEmail("");
        setPwd(""); 
      }
    
  };

  useEffect(()=>{
    if(user?.accessToken){
      const decodedToken = jwtDecode(user.accessToken)
      const rawPath = decodedToken?.UserInfo?.path;
      const allowed = new Set([
        'admin',
        'vehicle',
        'Mdashboard',
        'hires',
        'Contract/Dashbored',
        'emergency',
        'finance/financeDashboard',
      ])
      const safePath = allowed.has(rawPath) ? `/${rawPath}` : '/'
      navigate(safePath)
    }   
  },[user])

  return (
    <section className="w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
                {
                  error && <p className="text-red-500 font-bold mt-4">{error}</p>
                }
              </div>
              <div className="flex items-center justify-between">
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div> */}
                
              </div>
              <button
                disabled={isLoading}
                type="submit"
                onClick={handleSubmit}
                className="w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
