## Mac 查看端口占用并杀死进程

- 查看端口占用情况

  ```shell
  $ lsof -i:8000
  控制台列出端口占用情况
  COMMAND   PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
  node    35954 zhuzhu   38u  IPv4 0xc24754253a7043bf      0t0  TCP *:vcom-tunnel (LISTEN)
  node    35954 zhuzhu   42u  IPv4 0xc2475425434dbdd7      0t0  TCP localhost:vcom-tunnel->localhost:60354 (CLOSE_WAIT)
  ```

- 上方的`PID`就是`进程ID`,然后通过`kill`命令来杀死进程

  ```shell
  $ kill -9 8000
  ```

- 再次通过`lsof`查看，发现不存在占用端口记录了
