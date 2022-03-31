/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2022-03-30 09:32:14
 * @LastEditTime: 2022-03-30 10:41:50
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 插入排序
 * @FilePath: /yjkzhuzhu.github.io/demo/insertSort.tsx
 */
import React from 'react';
import { Space, Divider } from 'antd';
import 'antd/dist/antd.css';
import { createRandom } from './utils';

const initData = createRandom(1, 10, 20);

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

export default function() {
  return (
    <div style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
      <Space>
        <div>{initData.join(',')}</div>
      </Space>
      <Divider>插入排序</Divider>

      <div>{insertSort(initData).join(',')}</div>
    </div>
  );
}
