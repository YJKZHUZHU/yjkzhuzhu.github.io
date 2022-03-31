/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2022-03-30 11:20:55
 * @LastEditTime: 2022-03-30 14:00:36
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 桶排序
 * @FilePath: /yjkzhuzhu.github.io/demo/bucketSort.tsx
 */

import React from 'react';
import { Space, Divider } from 'antd';
import 'antd/dist/antd.css';
import { createRandom } from './utils';

const initData = createRandom(1, 100, 20);

// 插入排序
const insertSort = (list: number[]) => {
  const length = list.length;

  let preIndex = 0,
    current = null;

  for (let i = 1; i < length; i++) {
    preIndex = i - 1;
    current = list[i];
    while (preIndex >= 0 && list[preIndex] > current) {
      list[preIndex + 1] = list[preIndex];
      preIndex--;
    }
    list[preIndex + 1] = current;
  }
  return list;
};

// 桶排序
const bucketSort = (arr: number[], bucketSize: number = 10) => {
  if (arr.length === 0) return arr;
  let i = 0,
    minValue = arr[0],
    maxValue = arr[0];

  for (i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i];
    } else if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }

  // 桶的初始化
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = new Array(bucketCount);

  for (i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }
  // 利用映射函数将数据分配到各个桶中
  for (i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
  }

  arr.length = 0;

  for (let i = 0; i < buckets.length; i++) {
    // 对每个桶进行排序
    insertSort(buckets[i]);
    for (let j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j]);
    }
  }
  return arr;
};

export default function() {
  return (
    <div style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
      <Space>
        <div>{initData.join(',')}</div>
      </Space>
      <Divider>桶排序</Divider>

      <div>{bucketSort(initData).join(',')}</div>
    </div>
  );
}
