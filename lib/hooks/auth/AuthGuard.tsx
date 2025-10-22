"use client";
import { ReactNode, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { useRouter } from 'next/navigation';
import { FullPageSpinner } from '@/components/ui/spinner';

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

  // While loading, show a spinner. If not authenticated, render nothing while redirecting.
  if (isLoading) return <FullPageSpinner label="Checking session..." />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
