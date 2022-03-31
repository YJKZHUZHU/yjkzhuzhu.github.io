/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2022-03-29 17:40:41
 * @LastEditTime: 2022-03-30 09:33:43
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 冒泡排序
 * @FilePath: /yjkzhuzhu.github.io/demo/bubblingSort.tsx
 */

import React from 'react';
import { Space, Divider } from 'antd';
import 'antd/dist/antd.css';
import { createRandom } from './utils';

const bubblingSort = (list: number[]) => {
  var n = list.length;
  if (!n) return [];

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      if (list[j] > list[j + 1]) {
        var temp = list[j + 1];
        list[j + 1] = list[j];
        list[j] = temp;
      }
    }
  }
  return list;
};

const initData = createRandom(1, 10, 20);

export default function() {
  return (
    <div style={{ overflow: 'hidden', wordBreak: 'break-word' }}>
      <Space>
        <div>{initData.join(',')}</div>
      </Space>
      <Divider>冒泡</Divider>

      <div>{bubblingSort(initData).join(',')}</div>
    </div>
  );
}
