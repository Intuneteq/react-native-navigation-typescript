## Introduction

This blog post will teach us how to use React Native navigations in a simple app. We will start by setting up a new React Native project with TypeScript and then install the necessary navigation dependencies. Finally, we will create and configure different types of navigators including stack, tab, and drawer navigators to build a navigation structure for our app.

## Installation and Setup

### Step 1: Create a New Project

First, create a new React Native project with TypeScript:

```bash
npx create-expo-app --template
```

Ensure you select the blank TypeScript template during the setup process.

### Step 2: Install Dependencies

Next, install the necessary dependencies for React Navigation:

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/bottom-tabs @react-navigation/drawer @react-navigation/native-stack
npx expo install react-native-gesture-handler react-native-reanimated
```

These dependencies include the core navigation library and specific navigators such as stack, tab, and drawer navigators, as well as essential React Native libraries for handling gestures and safe areas.

## Defining Navigation Types

Define the types for your navigation structure to ensure TypeScript is aware of the navigation props and screen parameters:

```typescript
// navigation/types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

export type RootTabParamList = {
  Settings: undefined;
  Profile: undefined;
};

export type RootDrawerParamList = {
  Stack: NavigatorScreenParams<RootStackParamList>;
  Tabs: undefined;
};
```

Here, we define three types of navigators: stack, tab, and drawer. Each type contains specific screens and parameters relevant to the navigator's function. The stack navigator has a Home screen and a Details screen, the tab navigator has the Settings and Profile screens, and the drawer navigator contains both the stack and tab navigators.

## Creating Screens

### Home Screen

Create the Home screen, which will serve as the entry point for the stack navigator:

```typescript
// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
    <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
  </View>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### Details Screen

Create the Details screen, which will be navigated to from the Home screen:

```typescript
// screens/DetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsScreen = () => (
  <View style={styles.container}>
    <Text>Details Screen</Text>
  </View>
);

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### Profile and Settings Screens

Create the Profile and Settings screens, which will be part of the tab navigator:

```typescript
// screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
  </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

```typescript
// screens/SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => (
  <View style={styles.container}>
    <Text>Settings Screen</Text>
  </View>
);

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

## Setting Up Navigators

### Stack Navigator

Set up the stack navigator to handle navigation between the Home and Details screens:

```typescript
// navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
```

### Tab Navigator

Set up the tab navigator to toggle between the Profile and Settings screens:

```typescript
// navigation/TabNavigator.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
```

### Drawer Navigator

Integrate the stack and tab navigators within a drawer navigator:

```typescript
// navigation/MainNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootDrawerParamList } from './types';
import StackNavigator from './StackNavigator';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function MainNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Stack" component={StackNavigator} />
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

export default MainNavigator;
```

## Bringing It All Together

Finally, integrate the MainNavigator in the App component, wrapping it with the NavigationContainer to manage the navigation state:

```typescript
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <MainNavigator />
    </NavigationContainer>
  );
}
```

## Conclusion

In this guide, we have outlined the process of setting up React Native navigation using TypeScript. By systematically creating and configuring stack, tab, and drawer navigators, we have built a navigation structure for our application. This setup not only enhances user experience but also ensures a scalable and maintainable codebase. As you continue to develop your application, you can further customize and extend these navigation patterns to meet your specific needs. Happy coding!
