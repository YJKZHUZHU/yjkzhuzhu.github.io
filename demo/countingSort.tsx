/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2022-03-31 09:38:41
 * @LastEditTime: 2022-03-31 09:48:14
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 计数排序
 * @FilePath: /yjkzhuzhu.github.io/demo/countingSort.tsx
 */
import React from 'react';
import { Space, Divider } from 'antd';
import 'antd/dist/antd.css';
import { createRandom } from './utils';

const initData = createRandom(1, 10, 20);

const countingSort = (arr: number[], maxValue: number) => {
  console.log(maxValue);
  let bucket = new Array(maxValue + 1),
    sortedIndex = 0,
    arrLen = arr.length,
    bucketLen = maxValue + 1;

  for (let i = 0; i < arrLen; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 0;
    }
    bucket[arr[i]]++;
  }
  for (let j = 0; j < bucketLen; j++) {
    while (bucket[j] > 0) {
      arr[sortedIndex++] = j;
      bucket[j]--;
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
      <Divider>计数排序</Divider>

      <div>{countingSort(initData, Math.max(...initData)).join(',')}</div>
    </div>
  );
}
