import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

export default function AuthScreen(){
    const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    const theme = useTheme();
    const router = useRouter();

    const { signIn } = useAuth();
    const { signUp } = useAuth();
    
        const handleAuth = async () => {
            if(!email || !password) {
                setError("Email and Password are required");
                return;
            }
           if (password.length < 6) {
                setError("Password must be at least 6 characters long");
                return;
            }

            setError(null);


            if (isSignedUp){
                const error = await signUp(email, password);
                if (error) {
                    setError(error);
                    return
                 
                } else {
                    const error = await signIn(email, password);
                    if (error) {
                        setError(error);
                        return;
                    }
                    // Handle successful sign-up and sign-in, e.g., navigate to home screen
                    router.replace("/");
                    
                }
            }
        };
        
    const handleSwitchMode = () => {
        setIsSignedUp(prev => !prev);
    }
    return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    >
        <View style={styles.content}>
            <Text style={styles.title} variant="headlineLarge">
                {" "}
                {isSignedUp ? "Create Account" : "Welcome Back"}
        </Text>

            <TextInput  
                label="Email" 
                autoCapitalize="none" 
                keyboardType="email-address" 
                placeholder="example@example.com"
                mode="outlined"
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                />
            
            <TextInput 
                label="Password" 
                autoCapitalize="none" 
                keyboardType="default" 
                placeholder="Enter your password"
                mode="outlined"
                style={styles.input}
                onChangeText={setPassword}
                secureTextEntry={true}
                />

            {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

            <Button mode="contained" style={styles.button} onPress={handleAuth}>
                {isSignedUp ? "Sign Up" : "Sign In"}
                
            </Button>

            <Button mode="text" onPress={handleSwitchMode} style={styles.switchmode}>
                {isSignedUp ? "Sign In" : "Dont have an account? Sign Up"}
            </Button>
        </View>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    title:{
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    switchmode: {
        marginTop: 8,
    },
});