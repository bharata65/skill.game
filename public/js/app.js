import router from './utils/router.js';
import { ROUTES, USER_ROLES } from './config/constants.js';
import { observeAuthState } from './services/auth.js';

// Pages
import Welcome from './pages/Welcome.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Dashboard from './pages/Dashboard.js';
import NotFound from './pages/NotFound.js';

// Register routes
router.register(ROUTES.WELCOME, Welcome);
router.register(ROUTES.LOGIN, Login);
router.register(ROUTES.REGISTER, Register);
router.register(ROUTES.DASHBOARD, Dashboard);
router.register(ROUTES.NOT_FOUND, NotFound);

// Middleware for authentication
const authMiddleware = (path, params) => {
  return new Promise((resolve) => {
    observeAuthState((user) => {
      const publicRoutes = [ROUTES.WELCOME, ROUTES.LOGIN, ROUTES.REGISTER];
      
      if (!user && !publicRoutes.includes(path)) {
        router.navigateTo(ROUTES.LOGIN);
        resolve(false);
      } else if (user && [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.WELCOME].includes(path)) {
        router.navigateTo(ROUTES.DASHBOARD);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

router.use(authMiddleware);

// Initial route
const initialPath = window.location.pathname || ROUTES.WELCOME;
router.navigateTo(initialPath);

// Handle browser back/forward
window.addEventListener('popstate', () => {
  router.navigateTo(window.location.pathname);
});
