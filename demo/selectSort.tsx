/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2022-03-30 09:32:14
 * @LastEditTime: 2022-03-30 09:47:16
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 选择排序
 * @FilePath: /yjkzhuzhu.github.io/demo/selectSort.tsx
 */
import React from 'react';
import { Space, Divider } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import { createRandom } from './utils';

const initData = createRandom(1, 10, 20);

const selectSort = (list: number[]) => {
  const length = list.length;
  let minIndex = 0; // 最小数下标
  for (let i = 0; i < length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (list[minIndex] > list[j]) {
        minIndex = j;
      }
    }
    let temp = list[i];
    list[i] = list[minIndex];
    list[minIndex] = temp;
  }
  return list;
};

export default function() {
  return (
    <div style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
      <Space>
        <div>{initData.join(',')}</div>
      </Space>
      <Divider>选择排序</Divider>

      <div>{selectSort(initData).join(',')}</div>
    </div>
  );
}
