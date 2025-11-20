---
layout: 'post'
title: '2020-Hackthon 总结（RN 项目）'
date: 2020-04-21
top_image: 'https://i.loli.net/2020/11/21/3XTAsgFaRyBLvOz.png'
excerpt: '2020 年家园工作室 Hackthon 大赛 ReactNative 项目总结'
---


## 2020-Hackthon 总结(RN 项目)

### 前言

这次家园举办的 **2020 Hackthon 大赛** 的主题是“故事”，经过团队的讨论，我们最终的想法是做一个**以同人内容为主的的创作平台**。经过思考后，我选用的是 `React Native` ，一来是因为 App 是一个还没接触过的新领域，二来是因为 RN 是基于 `React` 的语法，最近刚学的 `React` 也可以从中得到实践。比赛共持续了 17 天，最终成果却很一般（悲伤辣么大）。在这个过程中，由于很多都是新学的技术，然后用的 RN 也是还处于公测期的最新版本，踩了不少的坑，这篇博客目的主要是记录学习 RN 的一个艰辛但难忘的过程，同时也是给后来的同学一个参考。

文章分为两部分内容。第一部分是对这次 Hackthon 整个项目的剖析（包括用到的一些开源库、一些新的语法、写法以及踩过的坑等等）。第二部分是自己在这个比赛过程中的一些心得体会。

项目仓库地址：[lingji - GitHub](https://github.com/Vikiboss/2020-hackthon)。本文代码示例只关注核心部分，不保证其完整性。

### 第一部分：“零几” RN 项目剖析

#### 技术栈

  - `react` 16.11.0 用于构建用户界面的 JavaScript 库
  - `react-native` 0.62.1 使用 JavaScript 和 React 编写原生 App 的框架
  - `typescript` 3.8.3 微软开源拓展了 JavaScript 语法的编程语言
  - `redux` 4.0.5 JavaScript 应用程序的可预测状态容器

#### 用到的开源库

  - `react-navigation 5.x` 管理全局路由
  - `react-native-vector-icons` 适用于 RN 的图标聚合库
  - `react-native-action-button` 一个 RN 的悬停按钮组件
  - `react-native-fast-image` 可替代 RN 原生 Image 组件的第三方组件
  - `redux-persist` 封装原生 AsyncStorage 基于 redux 的 RN 持久化储存方案
  - `react-native-image-crop-picker` 媒体选取组件(裁剪可选)
  - `axios` 公认比较好用的请求库
  - `dayjs` 轻量时间处理库
  - `react-native-splash-screen` 为 RN 提供开屏图功能的第三方库
  - `react-native-exit-app` 提供"退出程序"API 的第三方库
  - `react-native-textinput-effects` 一个简洁带动效的输入框组件
  - `react-native-material-ripple` 实现 matrial ui 的波纹反馈效果
  - `react-native-elements` 一个还行的 RN 的 UI 库

> 引用的所有开源库及版本信息等详见项目的[package.json](https://github.com/Vikiboss/2020-hackthon/blob/master/package.json)文件

#### 项目简析

  - 目录树

  ![零几目录.jpg](https://i.loli.net/2020/04/21/SJzf6H8Ne27o3kQ.jpg)

  - 登录状态验证

    用户登陆成功后通过 redux-persist 持久化储存登录信息。在 App 启动时使用 redux-persist 获取登陆信息、判断登录状态并据此设定 navigator 的初始路由跳到相应页面

    ```tsx
    import { store } from "./redux/store";

    const isLogin = store.getState().userInfo.token ? true : false;

    <Navigator initialRouteName={isLogin ? "home" : "auth"}>
      {/* ... screens */}
    </Navigator>;
    ```

  - 全局路由管理

    通过入口 router 文件引入项目所有的 screen 组件并用一个 navigator 预设的 BottomTab 管理实现管理全局路由的目的，

    ```tsx
    import { createStackNavigator } from "@react-navigation/stack";
    import HomeRouter from "./screen";
    // import ...

    const AppNavigator = createStackNavigator();
    const { Screen, Navigator } = AppNavigator;

    <Navigator>
      <Screen name="Home" component={HomeRouter} />
      {/* ... other screens */}
    </Navigator>;
    ```

  - 页面切换效果

    使用 react-navigation 提供的水平切换和淡入淡出的预设切换动画

    ```tsx
    import { TransitionPresets } from "@react-navigation/stack";
    import HomeRouter from "./screen";

    const animatons = {
      slide: TransitionPresets.SlideFromRightIOS,
      fade: TransitionPresets.FadeFromBottomAndroid,
    };

    <Navigator screenOptions={{ ...animatons.slide }}>
      <Screen
        name="Home"
        component={HomeRouter}
        options={{ ...animatons.fade }}
      />
      {/* ... screens */}
    </Navigator>;
    ```

  ```

  ```

- 路由跳转及传参

  每一 Screen 接收的组件接受一个 route 参数，其 navigate 属性可用于带参数的路由跳转。使用 navigator 提供的 Hooks 也可达到相应的目的。

  - 使用默认传给 screen 组件的 navigation、route 实现

    ```tsx
    // Home.tsx
    import React from "react";
    import { Text } from "react-native";

    const Home: React.FC = ({ navigation }) => {
      return (
        <Text onPress={() => navigation.navigate("About", { msg: "success!" })}>
          To About
        </Text>
      );
    };

    // About.tsx
    import React from "react";
    import { Text } from "react-native";

    const About: React.FC = ({ route }) => {
      return <Text>{route.params.msg}</Text>;
    };
    ```

  - 使用相关的 Hooks 来实现

    ```tsx
    // Home.tsx
    import React from "react";
    import { Text } from "react-native";
    import { useNavigation } from "@react-navigation/native";

    const Home: React.FC = () => {
      const navigation = useNavigation();
      return (
        <Text onPress={() => navigation.navigate("About", { msg: "success!" })}>
          To About
        </Text>
      );
    };

    // About.tsx
    import React from "react";
    import { Text } from "react-native";
    import { useRoute } from "@react-navigation/native";

    const About: React.FC = () => {
      const route = useRoute();
      return <Text>{route.params.msg}</Text>;
    };
    ```

// 2020.4.21 待续
