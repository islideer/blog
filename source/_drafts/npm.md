npm config set registry https://registry.npm.taobao.org 换源1

npm config set registryhttps://registry.npmjs.org 还原

npm config edit 加入 registry = https://registry.npm.taobao.org 换源2

npm config get registry 查看当前源

npm install  (-g)  package_name (--save / --save-dev) (--registry https://registry.npm.taobao.org) 安装依赖

npm uninstall (-g) package_name  (--save / --save-dev) 移除依赖

npm update (-g) package_name 更新依赖

npm outdated (-g --depth=0) 检查更新

npm set init.license "MIT" 设置默认协议

npm set init.author.name "Viki" 设置默认作者昵称

npm set init.author.email "vikiboss@qq.com" 设置默认作者邮箱

npm home package_name 查看项目主页(如果有的话，无则跳到项目仓库)

npm repo package_name 查看项目仓库

npm prune (package_name) (--production) 移除无关依赖

npm cache clean 清理缓存，一般不需要删，除非遇到错误 (npm < @5)

npm cache verify 清理缓存，一般不需要删，除非遇到错误 (npm > @5) 

npm ls (--depth 0) 查看项目依赖	

npm config list 查看当前的配置

npm install -g npm@latest npm更新至最新的公测版本

npm install -g npm@next npm更新至最新的发布版本（比latest更新）

npm adduser / npm login 添加用户信息

npm config set foo:port 80 添加配置信息

[https://npmjs.com/~username](https://npmjs.com/~vikiboss)

[https://npmjs.com/package/package_name](https://npmjs.com/package/package_name)