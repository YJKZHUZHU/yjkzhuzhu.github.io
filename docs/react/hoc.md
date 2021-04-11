### 高阶组件

> `typescript`版本高阶组件

```typescript
/** @format */

import React, { FC } from 'react';
import { Space, Button } from 'antd';

interface IWrapComponent {
  couter: number;
  incr: (increment: number) => void;
  desc: (decrement: number) => void;
}

const ConterComponent = (
  WrapComponent: React.JSXElementConstructor<IWrapComponent>,
) => {
  return class extends React.Component<any, { couter: number }> {
    state = {
      couter: 0,
    };

    incr = (increment: number = 1) => {
      this.setState(state => {
        return {
          couter: state.couter + increment,
        };
      });
    };
    desc = (decrement: number = 1) => {
      this.setState(state => {
        return {
          couter: state.couter - decrement,
        };
      });
    };
    render() {
      const conterProps = {
        couter: this.state.couter,
        incr: this.incr,
        desc: this.desc,
      };
      return <WrapComponent {...this.props} {...conterProps} />;
    }
  };
};

const Counter: FC<IWrapComponent> = props => {
  const { couter, incr, desc } = props;
  return (
    <Space>
      <Button onClick={() => incr(1)}>+</Button>
      <Button onClick={() => desc(1)}>-</Button>
      <span>{couter}</span>
    </Space>
  );
};

export default ConterComponent(Counter);
```

HOC 的核心逻辑是对业务组件进行包装，并将封装的逻辑通过参数的方式传给业务组件

> 再来看看 hooks 的实现

```typ
/** @format */

import React, {useState} from "react"
import {Space, Button} from "antd"

const useCouter = (initCouter?: number) => {
  const [couter, setCouter] = useState(initCouter || 0)
  const incr = (increment: number = 1) => setCouter((couter) => couter + increment)
  const desc = (decrement: number = 1) => setCouter((couter) => couter - decrement)
  return {
    couter,
    incr,
    desc
  }
}


const Couter = () => {
  const {couter, incr, desc} = useCouter()
  return (
    <Space>
      <Button onClick={() => incr(1)}>+</Button>
      <Button onClick={() => desc(1)}>-</Button>
      <span>{couter}</span>
    </Space>
  )
}

export default Couter

```

最直观的就是间接，其次是天然的 ts 类型推导，组重要的是逻辑与视图分离，当组件越来越复杂，hooks 的优势会越来越明显
