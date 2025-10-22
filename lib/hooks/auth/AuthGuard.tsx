"use client";
import { ReactNode, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  // Redirect in an effect to avoid updating Router during render
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // While loading or redirecting, render nothing
  if (isLoading || !isAuthenticated) return null;

  return <>{children}</>;
}
