# [dandanplay-resource-service](https://github.com/LussacZheng/dandanplay-resource-service)

API implementations for "dandanplay" resource search service.  
[弹弹play](http://www.dandanplay.com/) 资源搜索节点的 API 实现。

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/LussacZheng/test-heroku)

## Golang

### 部署

从 [Releases 页面](https://github.com/LussacZheng/dandanplay-resource-service/releases) 下载预编译的可执行文件，运行即可。

### 运行

```shell
$ dandanplay-resource-service -h
API implementations for "dandanplay" resource search service, in Golang.

Usage:
  dandanplay-resource-service [flags]

Flags:
  -h, --help           help for dandanplay-resource-service
  -H, --host string    IP address the API listens on, such as "0.0.0.0", "127.0.0.1", or "192.168.0.100" (default "localhost")
  -P, --port string    Listen port of the API (default "8080")
  -x, --proxy string   Proxy address for web scraper, "http" and "socks5" are supported
  -V, --version        Print the version number of dandanplay-resource-service
```

例如：

```shell
# 无参数，默认运行在 localhost:8080
$ dandanplay-resource-service

# 自定义端口 和 代理地址(可省略 "http://")
$ dandanplay-resource-service -P 9000 -x 127.0.0.1:10809

# 运行在 34543 端口并暴露服务到公网
$ dandanplay-resource-service -H 0.0.0.0 -P 34543
```

访问根路径可以看到简易的测试页面。

### 开发

若需修改源码或自行编译，则需要 [Go 语言](https://golang.google.cn/) 开发环境。

```shell
$ git clone https://github.com/LussacZheng/dandanplay-resource-service.git
$ cd dandanplay-resource-service/golang

# go env -w GO111MODULE=on
# go env -w GOPROXY=https://goproxy.cn,direct

# 直接编译
$ go build

# 优化可执行文件大小
$ go build -ldflags="-s -w"
$ upx --lzma --best dandanplay-resource-service*
```
