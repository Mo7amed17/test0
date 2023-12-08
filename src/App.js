import Footer from "Components/ImportantComponents/Footer"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from 'react-auth-kit'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthRoutes from "Auth/AuthRoutes";
import { useEffect } from "react";
import ArrowToTop from "Actions/ArrowToTop";
import { Notification } from "Actions/Helpers";

function App() {

  // useEffect(() => {
  //   document.addEventListener('contextmenu', function(event) {
  //     event.preventDefault();
  //   });
  // }, []);
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: true,
        refetchOnReconnect: false,
        retry: false,
      },
    },
  });

  return (
    <div className="App">
      <AuthProvider authType = {"localstorage"}
        authName={'_auth'}
        >
      <QueryClientProvider client={queryClient}>
        <AuthRoutes/>
      </QueryClientProvider>
    </AuthProvider>
    <ArrowToTop/>
      <Footer/>
      <ToastContainer limit={2}/>
    </div>
  );
}

export default App;
