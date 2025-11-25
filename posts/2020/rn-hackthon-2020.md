---
title: '2020 Hackathon React Native 项目总结'
date: 2020-04-21
top_image: 'https://i.loli.net/2020/11/21/3XTAsgFaRyBLvOz.png'
tags:
  - 'React Native'
  - 'Hackathon'
  - 'TypeScript'
  - '移动开发'
  - '项目总结'
excerpt: '2020 年家园工作室 Hackathon 大赛 React Native 项目复盘。总结从零开始构建同人创作平台 App 的技术选型、路由管理、状态验证等实战经验与踩坑记录。'
---

## 2020 Hackathon 总结（RN 项目）

### 前言

这次家园举办的 **2020 Hackathon 大赛**主题是「故事」，经过团队讨论，我们最终的想法是做一个**以同人内容为主的创作平台**。经过思考后，我选用了 React Native，一来是因为 App 是一个还没接触过的新领域，二来是因为 RN 基于 React 语法，最近刚学的 React 也可以从中得到实践。

比赛持续了 17 天，最终成果却很一般（悲伤辣么大）。在这个过程中，由于很多都是新学的技术，而且用的 RN 还是处于公测期的最新版本，踩了不少坑。这篇博客主要是记录学习 RN 的一个艰辛但难忘的过程，同时也给后来的同学一个参考。

文章分为两部分内容：

- **第一部分**：对这次 Hackathon 整个项目的剖析，包括用到的一些开源库、新的语法写法以及踩过的坑等等
- **第二部分**：自己在这个比赛过程中的一些心得体会

本文代码示例只关注核心部分，不保证其完整性。

### 第一部分：「零几」RN 项目剖析

#### 技术栈

- `react` 16.11.0 - 用于构建用户界面的 JavaScript 库
- `react-native` 0.62.1 - 使用 JavaScript 和 React 编写原生 App 的框架
- `typescript` 3.8.3 - 微软开源的 JavaScript 超集，提供静态类型检查
- `redux` 4.0.5 - JavaScript 应用程序的可预测状态容器

#### 用到的开源库

- `react-navigation 5.x` - 管理全局路由
- `react-native-vector-icons` - 适用于 RN 的图标聚合库
- `react-native-action-button` - 悬浮操作按钮组件
- `react-native-fast-image` - 性能更优的图片组件，可替代 RN 原生 Image
- `redux-persist` - 封装 AsyncStorage，基于 Redux 的持久化存储方案
- `react-native-image-crop-picker` - 媒体选取组件（支持裁剪）
- `axios` - 流行的 HTTP 请求库
- `dayjs` - 轻量级时间处理库
- `react-native-splash-screen` - 为 RN 提供启动屏功能的第三方库
- `react-native-exit-app` - 提供「退出程序」API 的第三方库
- `react-native-textinput-effects` - 带动效的输入框组件
- `react-native-material-ripple` - 实现 Material Design 波纹反馈效果
- `react-native-elements` - 常用的 RN UI 组件库

> 引用的所有开源库及版本信息详见项目的 [package.json](https://github.com/Vikiboss/2020-hackathon/blob/master/package.json) 文件

#### 项目简析

##### 目录树

![零几目录.jpg](https://i.loli.net/2020/04/21/SJzf6H8Ne27o3kQ.jpg)

##### 登录状态验证

用户登录成功后，通过 redux-persist 持久化存储登录信息。在 App 启动时使用 redux-persist 获取登录信息，判断登录状态并据此设定 navigator 的初始路由，跳转到相应页面。

```tsx
import { store } from './redux/store'

const isLogin = store.getState().userInfo.token ? true : false

;<Navigator initialRouteName={isLogin ? 'home' : 'auth'}>{/* ... screens */}</Navigator>
```

##### 全局路由管理

通过入口 router 文件引入项目所有的 screen 组件，并用一个 navigator 预设的 BottomTab 来管理全局路由。

```tsx
import { createStackNavigator } from '@react-navigation/stack'
import HomeRouter from './screen'
// import ...

const AppNavigator = createStackNavigator()
const { Screen, Navigator } = AppNavigator

;<Navigator>
  <Screen name="Home" component={HomeRouter} />
  {/* ... other screens */}
</Navigator>
```

##### 页面切换效果

使用 react-navigation 提供的水平切换和淡入淡出的预设切换动画。

```tsx
import { TransitionPresets } from '@react-navigation/stack'
import HomeRouter from './screen'

const animations = {
  slide: TransitionPresets.SlideFromRightIOS,
  fade: TransitionPresets.FadeFromBottomAndroid,
}

;<Navigator screenOptions={{ ...animations.slide }}>
  <Screen name="Home" component={HomeRouter} options={{ ...animations.fade }} />
  {/* ... screens */}
</Navigator>
```

##### 路由跳转及传参

每个 Screen 接收的组件会接收一个 navigation 参数，其 navigate 方法可用于带参数的路由跳转。使用 navigator 提供的 Hooks 也可以达到相应的目的。

**方法一：使用默认传给 screen 组件的 navigation 和 route 实现**

```tsx
// Home.tsx
import React from 'react'
import { Text } from 'react-native'

const Home: React.FC = ({ navigation }) => {
  return <Text onPress={() => navigation.navigate('About', { msg: 'success!' })}>To About</Text>
}

// About.tsx
import React from 'react'
import { Text } from 'react-native'

const About: React.FC = ({ route }) => {
  return <Text>{route.params.msg}</Text>
}
```

**方法二：使用相关的 Hooks 来实现**

```tsx
// Home.tsx
import React from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Home: React.FC = () => {
  const navigation = useNavigation()
  return <Text onPress={() => navigation.navigate('About', { msg: 'success!' })}>To About</Text>
}

// About.tsx
import React from 'react'
import { Text } from 'react-native'
import { useRoute } from '@react-navigation/native'

const About: React.FC = () => {
  const route = useRoute()
  return <Text>{route.params.msg}</Text>
}
```

---

> 文章写于 2020 年 4 月 21 日，待续...
