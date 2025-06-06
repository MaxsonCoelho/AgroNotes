import { NotesStackParamList } from '@/app/navigation/modules/NotesStack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { styles } from './styles';


const SplashScreen = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(170)).current;
    const navigation = useNavigation<NativeStackNavigationProp<NotesStackParamList>>();

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
            }),
            Animated.timing(scale, {
            toValue: 250,
            duration: 3000,
            useNativeDriver: true,
            }),
        ]).start();

        const timeout = setTimeout(() => {
            navigation.replace('Notes'); // evita voltar para splash
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity }}>
                <Animated.Image
                source={require('../../../assets/images/Logo.png')}
                style={[
                    styles.logo,
                    {
                    transform: [{ scale: scale.interpolate({
                        inputRange: [170, 250],
                        outputRange: [0.68, 1], // ajuste proporcional
                    }) }],
                    },
                ]}
                resizeMode="contain"
                accessibilityLabel="Logo"
                />
            </Animated.View>
        </View>
    );
};

export default SplashScreen;


