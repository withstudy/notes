---
title: 工作总结-WebRTC丢包监控
date: 2022-08-28 18:21:11
categories: 项目优化
tags: [WORK]
description: 工作总结
cover: https://s2.loli.net/2022/03/31/oTNACnmX6yefaLE.jpg
---

# WebRTC丢包监控

利用`RTCPeerConnection`对象的`getStats`方法拿到WebRTC两端之间的接收发出数据统计报告进行分析

```js

// 上次接收成功的包
let lastPacketsReceived = 0
// 上次接收丢失的包
let lastPacketsLost = 0
// 上次共发出的包（包括成功和失败的）
let lastPacketsSent = 0
// 远端接收丢失的包
let lastRemotePacketsLost = 0

async function getRTCStats() {
    try {
        // 拿到RTCPeerConnection对象
        const pc = cur_call.rtc.peer.peer
        // 这次与上次比较之后的数据
        let packetsSent = 0
        let packetsReceived = 0
        let packetsLost = 0
        pc.getStats(null).then(stats => {
            stats.forEach(report => {
                // 接收数据情况
                if (report.type === 'inbound-rtp') {
                    packetsReceived =
                        report.packetsReceived - lastPacketsReceived
                    lastPacketsReceived = report.packetsReceived
                    lastPacketsLost = report.packetsLost
                }
                // 传出数据情况
                if (report.type === 'outbound-rtp') {
                    packetsSent = report.packetsSent - lastPacketsSent
                    lastPacketsSent = report.packetsSent
                }
                // 远端接收情况
                if (report.type === 'remote-inbound-rtp') {
                    //上行丢包,
                    packetsLost = report.packetsLost - lastRemotePacketsLost
                    lastRemotePacketsLost = report.packetsLost
                }
            })
            // （共发送的 - 接收成功的 ）/ 共发送的  =  接收丢包率
            const fractionLost = (packetsSent - packetsReceived) / packetsSent
            // 远端接收丢的 / 本地共发送的
            const outboundLost = packetsLost / packetsSent
            if (fractionLost > 0.3 || outboundLost > 0.3) {
                // 丢包
            }
        })
    } catch (e) {
        console.log(e)
    }
}

setInterval(() => {
    getRTCStats()
},5 * 1000)
```

[参考文章1](https://github.com/RTC-Developer/WebRTC-Documentation-in-Chinese/blob/master/resource/chapter8/8_8GetStats%E7%A4%BA%E4%BE%8B.md)
[参考文章2](https://blog.csdn.net/weixin_41821317/article/details/117261117)
[参考文章3](https://developer.mozilla.org/en-US/docs/Web/API/RTCStats)
