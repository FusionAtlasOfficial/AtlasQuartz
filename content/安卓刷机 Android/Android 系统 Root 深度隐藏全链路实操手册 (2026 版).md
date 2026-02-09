---
title: Android 系统 Root 深度隐藏全链路实操手册 (2026 版)
---

# **0\. 前置环境审计 (Pre-flight Check)**

* **设备**: 已解锁 Bootloader，安装 Magisk (Zygisk 环境)。  
* **核心组件**: Shamiko, LSPosed (Zygisk), Hide-My-Applist (HMA), BypassKeyAttestation。  
* **目标**: 绕过高强度检测 (如：电信/移动营业厅、银行类 App)。

# **1\. 第一阶段：底层环境净化 (Kernel & System Level)**

### **1.1 Magisk 自身伪装**

1. 进入 Magisk 设置 \-\> 选择 **“隐藏 Magisk 应用” (Hide the Magisk app)**。  
2. 输入新名称（如 MyTool），系统会生成随机包名的替身应用并卸载原包。

## **1.2 配置 Zygisk 与 Shamiko**

1. **启用 Zygisk**: Magisk 设置 \-\> 开启 **Zygisk** 开关 \-\> 重启设备。  
2. **配置排除列表 (DenyList)**:  
   * 进入 Magisk 设置 \-\> 配置排除列表。  
   * 点击右上角“显示系统应用”。  
   * 找到目标 App（如“中国电信”），**勾选其下所有子进程**。  
3. **关键操作**: **不要开启** “遵守排除列表 (Enforce DenyList)” 开关。  
   * *逻辑注脚*: Shamiko 会接管此列表。开启开关会导致 Zygisk 无法注入，进而导致 LSPosed 无法在这些 App 中生效。

## **1.3 Shamiko 运行模式切换 (Mode Switch)**

Shamiko 默认通常处于“白名单模式”，但了解其切换逻辑对排查故障至关重要：

* **白名单模式 (Whitelist Mode) \[推荐\]**:  
  * **表现**: 仅对 Magisk DenyList 中**已勾选**的应用隐藏 Root。  
  * **操作路径**: 必须使用具备 Root 权限的文件管理器（如 MT 管理器）。  
    1. 进入系统根目录 /（非 /sdcard）。  
    2. 导航至 /data/adb/shamiko/ 目录。  
  * **切换方法**: 在该目录下创建一个名为 whitelist 的空文件（无后缀）。  
* **黑名单模式 (Blacklist Mode)**:  
  * **表现**: 对所有应用隐藏 Root，除非该应用在 Magisk DenyList 中**未勾选**。  
  * **切换方法**: 删除上述目录下的 whitelist 文件。  
* **状态验证**:  
  * 重启设备后，在 Magisk 模块列表中查看 Shamiko 的描述信息。  
  * 若显示 Shamiko is working in whitelist mode，说明配置成功。

# **2\. 第二阶段：应用列表隔离 (User-space Isolation)**

## **2.1 LSPosed 作用域配置**

1. 确保 LSPosed 模块已启用并能进入管理界面。  
2. 安装 **Hide-My-Applist (HMA)** 模块。  
3. 在 LSPosed 管理器中启用 HMA，其作用域建议勾选“系统框架”及 HMA 自身。

## **2.2 HMA 混淆策略与兼容性补救 (关键)**

1. **创建模板**: 创建一个“黑名单模板”，勾选 Magisk、LSPosed 等 Root 相关 App。  
2. **应用管理**: 找到“中国电信/中国移动”，启用模板。  
3. **第三方登录兼容性风险 (微信/QQ)**:  
   * **现象**: 若在 HMA 中对某些工具类 App 开启了全方位的应用列表隐藏，可能导致该 App 无法通过微信/QQ 进行身份校验或登录。  
   * **操作补救**: 若你使用的是 **MT 管理器** 或类似需要调用第三方登录功能的工具，**必须在 HMA 的生效范围中将“微信”与“QQ”排除**。  
   * *技术注脚*: 微信/QQ 的 SDK 在验证登录请求时，若由于 HMA 拦截导致 App 无法识别到微信/QQ 的包名，会触发“未安装应用”或“登录环境异常”错误。

# **3\. 第三阶段：辅助工具与环境校验**

## **3.1 MT 管理器与文件残留清理**

* **MT 管理器**: 作为 Root 环境下的必备文件管理工具，其本身也是被检测的高频目标。  
* **清理残留**: 使用 MT 管理器手动删除 /sdcard 目录下名为 Magisk、TWRP、Fox 等关键词的残留文件夹。  
* **文件访问隐藏**: 在 HMA 模板中，务必将 MT 管理器也加入黑名单列表，防止其他 App 感知其存在。

## **3.2 绕过密钥委派证明 (Key Attestation)**

1. 安装 **BypassKeyAttestation** 模块。  
2. 该模块通常无需复杂配置，其原理是将 SecurityLevel 强制修改为 TRUSTED\_ENVIRONMENT 或 SOFTWARE，并清除解锁后的特殊字段。  
3. 配合 **TrickyStore** (可选) 可以进一步伪装成设备已锁定状态。

## **3.3 开发者选项与调试隐藏**

* **必须关闭 USB 调试**。  
* 如果 App 依然闪退，尝试在系统设置中完全关闭 **开发者选项**。

# **4\. 故障排查与验证 (Audit Loop)**

| 步骤 | 操作 | 预期结果 |
| :---- | :---- | :---- |
| **环境扫描** | 运行 **Momo** 或 **Applist Detector** | 不应出现 Found su 或 Magisk path 等异常。 |
| **生效确认** | 再次进入 Magisk 排除列表 | 确认勾选状态未丢失。 |
| **登录测试** | 使用微信/QQ 登录 MT 管理器等 | 确认 HMA 未拦截授权包名，登录流程正常。 |
| **数据重置** | 应用信息 \-\> 清除所有数据 | **极其重要\!** 必须清除目标 App 缓存以删除历史检测记录。 |

# **5\. 风险提示 (Risk Warning)**

* **技术债务**: 运营商 SDK 可能会通过 TCP 端口检测 (扫描 5555 端口) 或存储空间残留文件夹检测。  
* **路径优化**: 若上述方案仍失效，建议考虑 **KernelSU (KSU)** 方案，从内核层彻底解决 mount 挂载点被扫描的问题。

> B站专栏：[[更新版]组合拳通用绕过应用ROOT和BL检测](https://www.bilibili.com/opus/933530752660799513)
>
> B站专栏：[Momo提示解决方法大全（转自酷安妙涵）](https://www.bilibili.com/read/cv33591267/)

