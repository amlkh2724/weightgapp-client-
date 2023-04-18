// import { useRouter } from 'next/router';
// import LoginPage from './pages/login/login';
import LoginPage from "./login/login";

export default function Index() {
  // const router = useRouter();

  // React.useEffect(() => {
  //   router.push('/login');
  // }, []);

  return (
    <>
      <LoginPage />
    </>
  );
}
