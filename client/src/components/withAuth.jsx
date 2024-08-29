
"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/auth/login'); // Redirect to login if no token
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    if (!isAuthenticated) {
      return null; // You can also return a loading spinner or message
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
