import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';



export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "coral" }}>
      <Feather name="home" size={24} color="black" />
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({color, focused}) => 
      {
        return focused ? (
          <Feather name="home" size={24} color={color} />
        ) : (
          <Feather name="home" size={24} color="gray" />
        );
      }}} />
      <Tabs.Screen name="Login" options={{ title: "Login", tabBarIcon: ({color, focused}) => 
        {
          return focused ? (
            <Feather name="log-in" size={24} color={color} />
          ) : (
            <Feather name="log-in" size={24} color="gray" />
          );
        }}} />
    </Tabs>
  );
}
