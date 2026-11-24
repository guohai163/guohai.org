---
title: 物联网服务端设计
kicker: 后端开发 · 连载专题
description: 从设备建立连接，到会话管理、重构和性能测试的五篇实战笔记。
layout: page
permalink: /iot-server/
---

这组文章以 Netty 服务端为例，沿着一条设备连接的生命周期介绍服务端设计。第一次读可以按顺序走一遍。遇到具体问题时，也可以从对应章节进入。

1. [基础准备](https://blog.guohai.org/netty/2022/06/23/iot-server.html) · 了解服务端要承担哪些职责，以及为什么采用长连接。
2. [创建连接](https://blog.guohai.org/netty/2022/06/28/iot-server-create-project.html) · 搭起能接受客户端连接的服务端。
3. [会话管理](https://blog.guohai.org/netty/2022/06/30/iot-server-idle-check.html) · 管理已经连接的设备，处理连接变化。
4. [重构项目](https://blog.guohai.org/netty/2022/07/01/iot-server-disruptor.html) · 回到代码结构，调整职责划分。
5. [性能测试](https://blog.guohai.org/netty/2022/07/15/iot-server-locust.html) · 给服务端增加负载，观察运行表现。

准备复现时，可以先让单台客户端走通连接、收发和断开，再测试重复连接与重连。最后单独增加并发连接和消息速率，并记录延迟、错误和资源使用情况。这样可以区分故障来自连接管理还是消息处理。
