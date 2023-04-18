import { useRouter } from 'next/router';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  // Define an array of paths where Navbar and Footer should not be rendered
  const excludedPaths = ['/pages/register/register','/pages/home/home','/',"/pages/login/login"];

  // Check if current path is in excludedPaths array
  const shouldRenderNavbarAndFooter = !excludedPaths.includes(pathname);

  return (
    <div>
      {shouldRenderNavbarAndFooter && <Navbar />}
      {children}
      {shouldRenderNavbarAndFooter && <Footer />}
    </div>
  );
};

export default Layout;
