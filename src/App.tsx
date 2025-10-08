import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Route, useParams } from "./shared/libs/router/Router";
import { TasksList } from "./TasksList";
import { TaskDetail } from "./TaskDetail";
import { AuthLayout, GlobalLayout } from "./layouts/AuthLayout";
import { CommonLayout } from "./layouts/CommonLayout";
import { BrowserRouter, Route, useParams, Routes } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 10 * 1000,
    },
  },
});
// @ts-expect-error we dont need typing
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export const App = () => {
  // const [c, setC] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/*<button onClick={() => setC(c + 1)}>refresh</button>*/}

        <Routes>
          <Route path={"/:lang?"} element={<GlobalLayout />}>
            <Route path={"auth"} element={<AuthLayout />}>
              {/*<Route path={'auth'}>*/}
              <Route path={"login"} element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<AuthNotFound />} />
            </Route>

            <Route element={<CommonLayout />}>
              <Route path="/" element={<TasksList />} />
              <Route path="/tasks/:taskId" element={<TaskDetail />} />
              <Route path="/boards/:boardId/tasks/:taskId" element={<TaskDetail />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const Login = () => {
  let { lang } = useParams();
  if (!lang) lang = "ge";
  return (
    <div>
      lang: {lang}
      <hr />
      <input />
      <input />
      <button>Login</button>
    </div>
  );
};

const Register = () => {
  return (
    <div>
      <input />
      <input />
      <button>Register</button>
    </div>
  );
};

const AuthNotFound = () => {
  const params = useParams();
  return <h2>Not Found 404 {params["*"]}</h2>;
};

const NotFound = () => {
  return <h2>Not Found 404</h2>;
};

// export const App = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//          <MainPage />
//        </QueryClientProvider>
//   );
// };

export default App;
