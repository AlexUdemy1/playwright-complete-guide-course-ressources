// PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated }) => {
    console.log("TOKEN:", isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;  // If authenticated, allow access to the route
};

export default PrivateRoute;
