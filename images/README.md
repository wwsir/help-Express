# 图标文件说明

微信小程序的tabBar需要以下4个图标文件：

## 需要的图标文件
1. `home.png` - 首页图标（未选中状态）
2. `home-active.png` - 首页图标（选中状态）
3. `profile.png` - 个人中心图标（未选中状态）
4. `profile-active.png` - 个人中心图标（选中状态）

## 图标规格要求
- **尺寸**：40x40px 或 81x81px（推荐使用81x81px以支持高清屏）
- **格式**：PNG（支持透明背景）
- **颜色**：
  - 未选中状态：灰色 (#666666)
  - 选中状态：蓝色 (#1296db)

## 获取图标的方法

### 方法1：使用在线图标库
1. 访问 [iconfont.cn](https://www.iconfont.cn) 或 [iconify.design](https://iconify.design)
2. 搜索 "home" 和 "user"/"profile" 图标
3. 下载PNG格式，调整为所需尺寸和颜色

### 方法2：使用设计工具
1. 使用 Figma、Sketch 或 Adobe Illustrator
2. 创建简单的家和用户图标
3. 导出为PNG格式

### 方法3：临时替代方案
如果暂时没有图标文件，可以：
1. 在 `app.json` 中注释掉 `tabBar` 配置
2. 或者使用微信小程序提供的默认图标

## 示例SVG代码（可转换为PNG）

### 首页图标 (home)
```svg
<svg width="48" height="48" viewBox="0 0 48 48" fill="#666666">
  <path d="M20 40V28h8v12h10V20l-14-14L10 20v20h10z"/>
</svg>
```

### 个人中心图标 (profile)
```svg
<svg width="48" height="48" viewBox="0 0 48 48" fill="#666666">
  <circle cx="24" cy="16" r="8"/>
  <path d="M8 42v-6c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v6H8z"/>
</svg>
```

将这些SVG代码保存为.svg文件，然后使用在线工具或设计软件转换为PNG格式即可。