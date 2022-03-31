/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2022-03-30 09:32:14
 * @LastEditTime: 2022-03-30 11:12:33
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 选择排序
 * @FilePath: /yjkzhuzhu.github.io/demo/shellSort.tsx
 */
import React from 'react';
import { Space, Divider } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import { createRandom } from './utils';

const initData = createRandom(1, 10, 20);

const shellSort = (list: number[]) => {
  const length = list.length;
  let gap = parseInt(String(length / 2));

  while (gap) {
    // 逐渐缩小步数
    for (let i = gap; i < length; i++) {
      // 逐步和前面其他成员比较交换
      for (let j = i - gap; j >= 0; j -= gap) {
        if (list[j] > list[j + gap]) {
          let temp = list[j + gap];
          list[j + gap] = list[j];
          list[j] = temp;
        } else {
          break;
        }
      }
    }

    gap = parseInt(String(gap / 2));
  }
  return list;
};

export default function() {
  return (
    <div style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
      <Space>
        <div>{initData.join(',')}</div>
      </Space>
      <Divider>希尔排序</Divider>

      <div>{shellSort(initData).join(',')}</div>
    </div>
  );
}
