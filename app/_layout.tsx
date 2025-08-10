import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../lib/auth-context";

function RouteGuard({ children }: {children: React.ReactNode}) {
  const { user, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loading) {
      if (!user) {
        setTimeout(() => {
          router.replace("/auth");
        }, 0);
      }
    }
  }, [isMounted, user, loading]);

  if (loading) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}     
