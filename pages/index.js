
import React from 'react';
// import { useRouter } from 'next/router';
import LoginPage from './pages/login/login';
 function Home() {
  // const router = useRouter();

  // React.useEffect(() => {
  //   router.push('/');
  // }, []);

  return (
    <>
      <LoginPage />
    </>
  );
}
export default Home