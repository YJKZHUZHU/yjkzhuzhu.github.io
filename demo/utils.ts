/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2022-03-30 09:33:19
 * @LastEditTime: 2022-03-30 09:33:19
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description:
 * @FilePath: /yjkzhuzhu.github.io/demo/utils.ts
 */

// 生层随机数
export const createRandom = (min: number, max: number, num: number) => {
  return [...new Array(num).keys()].map(
    _ => Math.floor(Math.random() * (max - min)) + min,
  );
};
