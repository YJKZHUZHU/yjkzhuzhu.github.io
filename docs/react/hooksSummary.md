## 浅谈 React hooks

- [React 组件发展史](#Reac组件发展史)
- [为什么使用 React hooks,而不是 class 组件](#为什么使用reacthooks,而不是class组件)
- [React hooks API](#api)
- [React hooks 优缺点](#reacthooks优缺点)
- [优秀 hooks 库](#优秀hooks库)
- [Hooks 最佳实践](#hooks最佳实践)
- [hooks 心智负担](#hooks心智负担)

### React 组件发展史

#### 无状态组件

> 一般只负责渲染，状态通过父组件管理

```typescript
const HelloWord: FC<IHelloWordProps> = ({ text }) => {
  return <Button type="primary">{text}</Button>;
};
```

#### 类组件(有状态组件)

> 有状态组件也叫容器组件，在 hooks 出来之前，是使用最多的组件类型

```typescript
class App extends React.Component<any, any> {
  state = {
    text: '我是无状态组件哈哈哈',
  };

  render() {
    const { text } = this.state;
    return <HelloWord text={text} />;
  }
}
```

#### 渲染组件

> 和无状态组件类似，只是没有 props 传递过来

```typescript
const HelloWord = () => {
  return <Button type="primary">哈哈哈哈哈</Button>;
};
```

##### 总结

- 函数组件一定是无状态组件（hooks 出现之前），展示组件一般是无状态组件（类组件也可以无状态）
- 类组件可以有状态，也可以无状态
- 容器组件一般是有状态组件
- 组件划分原则：分而治之，高内聚，低耦合

> 上面集中基本组件类型即可完成大部分业务需求

#### 高阶组件

> HOC 主要是状态的抽离，将重复的受控组件的逻辑抽离到高阶组件中，将新的 props 传递给受控组件，高阶组件中可以操作 props 传入的受控组件，开源库常见的高阶组件：Redux 的 connext,react-router 的 withRouter 等

```typescript
import React from 'react';
import { Input } from 'antd';

interface IState {
  value: string;
}

function WidthInput(WrappedComponent: any) {
  return class extends React.Component<IState, any> {
    constructor(props: any) {
      super(props);
      this.state = {
        value: '',
      };
      this.onInputEvent = this.onInputEvent.bind(this);
    }

    onInputEvent(event: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
        value: event.target.value,
      });
    }

    render() {
      const newProps = {
        value: this.state.value,
        onChange: this.onInputEvent,
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

// 使用
const InputComponent = () => {
  return <Input defaultValue="我是默认值" />;
};

export default WidthInput(InputComponent);
```

##### HOC 的不足之处

- 产生了许多无用的组件，加深了组件的嵌套，性能和调试受到影响，react devTool 可查看![demo](/hooksSummary/1.png)
- 多个 HOC 的同时嵌套，劫持了 Props,命名可能会冲突，并且 Props 的来源不好判断

#### Render Props

```typescript
import React from 'react';
import { Input, Modal, Button } from 'antd';

class ToggleVisible extends React.Component<
  { render: (props: { visible: boolean; toggle: () => void }) => void },
  { visible: boolean }
> {
  state = {
    visible: false,
  };

  toggle = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  render() {
    const { visible } = this.state;
    return <>{this.props.render({ visible, toggle: () => this.toggle() })}</>;
  }
}

const EditUser = () => (
  <ToggleVisible
    render={({ visible, toggle }) => {
      return (
        <>
          <Modal visible={visible} onCancel={toggle} />
          <Button onClick={toggle}>打开/关闭modal</Button>
        </>
      );
    }}
  />
);
```

##### 总结

- 不会产生多余的节点，也不会产生多余的嵌套
- 不必担心命名问题

#### 组合式组件

```typescript
import React from 'react';

class GroupButton extends React.PureComponent<
  { onChange: (val: string) => void },
  { activeIndex: number }
> {
  state = {
    activeIndex: 0,
  };

  render() {
    return (
      <>
        {React.Children.map(this.props.children, (child: any, index) =>
          child?.type
            ? React.cloneElement(child, {
                active: this.state.activeIndex === index,
                onClick: () => {
                  this.setState({ activeIndex: index });
                  this.props.onChange(child.props.value);
                },
              })
            : child,
        )}
      </>
    );
  }
}

const App = () => {
  return (
    <GroupButton
      onChange={e => {
        console.log('onChange', e);
      }}
    >
      <Button value="red">red</Button>
      <Button value="yellow">yellow</Button>
      <Button value="blue">blue</Button>
      <Button value="white">white</Button>
    </GroupButton>
  );
};
```

##### 总结

- 子组件所需要的 props 会在父组件封装好，引用子组件的时候不需要传递所有 props 了。组件组合核心的两个方法是 React.children.map 和 React.cloneElement

### 为什么使用 ReactHooks,而不是 class 组件

> 上面提到的 HOC，Render Props,以及组合组件，都是为了解决逻辑复用的问题，都在一定程度上改变了组件的结构，比如 HOC 组件，个人觉得就比较难以理解（未在项目中使用过），调试也麻烦，嵌套多了 props 也不好追踪，还会出现命名冲突，导致覆盖的问题。
>
> 类组件维护起来也是比较痛苦的，比如监听逻辑，定时器等会造成内存泄漏的要在不同的声明周期中绑定和解绑，稍微复杂的组件，componentDidMount 包含很多逻辑，阅读性变的很差，类组件中大多数逻辑是难以复用的。
>
> 类组件中 this 是难以理解的，特别是对于新手来说，光是事件绑定，就有好几种解决方法，bind,箭头函数等等，取值，以及 setState,也挺麻烦，

![demo1](/hooksSummary/2.png)

可以看到，有用到 state,props 都得结构一次，不同的生命周期对应不同的业务逻辑（请求，清除定时器，优化等）

> hooks 解决了哪些问题

- 避免了高阶不函数的嵌套地狱
- 函数式编程，比类组件更容易理解，没有 this 的困扰
- 弱化了生命周期，class 组件的生命周期，都可以用 useEffect 结合其他 hooks 来解决
- 函数组件也可以有状态（遵循 hooks 书写规则）
- 视图和逻辑分离，将重复的逻辑单独抽离成 hooks 调用。

### API

##### useState

##### useEffect

> 忘记生命周期，记住副作用

```typescript
import React, { useEffect, useState } from 'react';

const Effect = () => {
  const [data, setState] = useState('');
  useEffect(() => {
    console.log('effect');
    setState('huihuhu');
  });
  return (
    <div>
      {(() => {
        console.log('render');
        return null;
      })()}
      <p>data: {JSON.stringify(data)}</p>
    </div>
  );
};
export default Effect;
```

> 执行结果

![demo](/hooksSummary/3.png)

> 结论 useEffect 是在 render 之后触发的

```typescript
import React, { useState, useEffect } from 'react';

function EffectDeep() {
  const [data, setData] = useState('');
  useEffect(() => {
    console.log('useEffect—[]');
    const timer = setTimeout(() => {
      setData('我改变了哦');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log('useEffect ---> 无依赖');
  });

  useEffect(() => {
    console.log('useEffect 依赖data： data发生了变化');
  }, [data]);

  return (
    <div>
      <p>data: {JSON.stringify(data)}</p>
    </div>
  );
}

export default EffectDeep;
```

![demo](/hooksSummary/4.png)

> 结论

- effect 在 render 之后按照顺序执行
- effect 在没有任何依赖的情况下，render 之后每次按照顺序执行
- effect 内部执行是异步的
- 依赖[]可以实现类似`componentDidMount`的作用，但最好忘记生命周期， 只记副作用

```typescript
import React, { useState, useEffect, useRef } from 'react';

function EffectDeep() {
  useEffect(() => {
    console.log('useEffect1');
    const timeId = setTimeout(() => {
      console.log('useEffect1-setTimeout-2000');
    }, 2000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);
  useEffect(() => {
    console.log('useEffect2');
    const timeId = setInterval(() => {
      console.log('useEffect2-setInterval-1000');
    }, 1000);
    return () => {
      clearInterval(timeId);
    };
  }, []);
  return (
    <div>
      {(() => {
        console.log('render');
        return null;
      })()}
      <p>demo4</p>
    </div>
  );
}

export default EffectDeep;
```

![demo](/hooksSummary/5.png)

> 结论

- effect 回调函数是按照先后顺序同时执行的
- effect 的回调函数返回一个匿名函数，相当于`componentUnMount`的钩子函数，一般是 remove eventLisenter， clear timeId 等，主要是组件卸载后防止内存泄漏。

> 总的来说就是，useEffect 监听依赖变化，来执行对应的钩子函数

##### useContext

- useContext 的组件总会在 context 值变化时重新渲染， 所以`<MyContext.Provider>`包裹的越多，层级越深，性能会造成影响
- `<MyContext.Provider>` 的 value 发生变化时候， 包裹的组件无论是否订阅 content value，所有组件都会从新渲染。
- 子组件不想重复渲染，可以用 memo 优化

##### useRef

- 返回一个可变的 ref 对象，每次渲染会返回同一个 ref 对象，在整个组件的生命周期内是唯一的
- 可以 保存任何可变的值。类似 class 组件的的实例字段，statisc
- 不会触发组件更新
- useState 是异步更新的，要想获取最新的 state 可以用 useRef 来保存，或者修改等

##### useReducer

> 函数组件的 useState 过于多，状态有依赖关系，会使用到。reducer 只能通过，action 将 state 从一个状态转变为另一个状态的一个纯函数。和 redux 工作方式类似

```typescript
import React, { useReducer } from 'react';
import { Input, Button, Row, Col, Space } from 'antd';

type State = {
  count: number;
};

type Action =
  | { type: 'inc' }
  | { type: 'dec' }
  | { type: 'mul' }
  | { type: 'div' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'inc':
      return { count: state.count + 1 };
    case 'dec':
      return { count: state.count - 1 };
    case 'mul':
      return { count: state.count ? state.count * 2 : 0 };
    case 'div':
      return { count: state.count ? state.count / 2 : 0 };
    default:
      throw new Error();
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <Row>
      <Col span={24}>
        <Input value={state.count} disabled />
      </Col>
      <Col span={24}>
        <Space>
          <Button onClick={() => dispatch({ type: 'inc' })}>+1</Button>
          <Button onClick={() => dispatch({ type: 'dec' })}>-1</Button>
          <Button onClick={() => dispatch({ type: 'mul' })}>x2</Button>
          <Button onClick={() => dispatch({ type: 'div' })}>/2</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default Counter;
```

使用场景

- state 逻辑复杂切包含多个子值，可以集中处理
- 下一个 state 依赖于之前的 state
- 将读取和写入分开

##### useCallback

> 类似 vue 的计算属性（语法糖）

```typescript
// 保存
const onSave = useCallback(
  count => {
    // 高开销的计算，大量数据做遍历等
  },
  [tagListRef.current],
);
```

> 总结

- 依赖要放准确
- 防止不必要的渲染

##### useMemo

```typescript
import React, { useState, useMemo, FC } from 'react';
import { Button } from 'antd';

const Child: FC<{ handle: number }> = ({ handle }) => {
  console.log('render-child');
  return (
    <div>
      <p>child</p>
      <p>props-data: {handle}</p>
    </div>
  );
};

const Memo = () => {
  const [count, setCount] = useState(0);
  const handle = () => {
    console.log('handle', count);
    return count;
  };

  const handle1 = useMemo(() => {
    console.log('handle1', count);
    return count;
  }, []);

  const handle2 = useMemo(() => {
    console.log('handle2', count);
    // 大计算量的操作
    return count;
  }, [count]);

  console.log('render-parent');

  return (
    <div>
      <p>
        demo9: {count}
        <Button onClick={() => setCount(count + 1)}>++count</Button>
      </p>
      <p>-------------------</p>
      <Child handle={handle1} />
    </div>
  );
};

export default Memo;
```

![demo](/hooksSummary/6.png)

> 总结

- 会在 render 之前执行
- 如果没有提供依赖，每次渲染都会重新执行
- 返回记忆值，对于高开销的操作可以使用
- 优化需谨慎，useMemo 本身已经创建了一个函数，因此大多数时候是不需要考虑重复渲染问题

##### 其他 hooks

> 不常用，自行看官方文档

#### reacthooks 优缺点

##### 优点

- 更容易代码复用
  - 自定义 hooks 来说，每次 useHooks 都会生成独立的状态，这也是函数本身的特点，每次调用都会开辟一块新内存
  - 在类组件中你无法在外部定义 state,和副作用，hooks 可以
- 代码量少
  - 函数式编程风格，函数式组件、状态保存在运行环境、每个功能都包裹在函数中，整体风格更清爽，更优雅。
  - 对 IDE 更友好，对比类组件，函数组件里面的 unused 状态和 unused-method 更容易被编辑器发现。
  - 使用 TS，声明类型也变得容易
  - 向 props 或状态取值更加方便，函数组件的取值都从当前作用域直接获取变量，而类组件需要先访问实例 this，再访问其属性或者方法，多了一步。
  - 更改状态也变得更加简单, `this.setState({ count:xxx })`变成 `setCount(xxx)`
- 不存在 this 指向问题

##### 缺点

- 响应式的 useEffect

  > hooks 弱化的生命周期，因此必须清楚的代码中 useEffect,useMemo,useCallback 的依赖项变更，有时候，你的 useEffect 依赖某个函数的不可变性，这个函数的不可变性又依赖于另一个函数的不可变性，这样便形成了一条依赖链。一旦这条依赖链的某个节点意外地被改变了，你的 useEffect 就被意外地触发了。hooks 用起来简单，但是想用好，还是一条漫长的路。

- 状态不同步

  > 函数的运行是独立的，每个函数都有一份独立的作用域。函数的变量是保存在运行时的作用域里面，当我们有异步操作的时候，经常会碰到异步回调的变量引用是之前的，也就是旧的（这里也可以理解成闭包）。

  ```typescript
  import React, { useState } from 'react';
  import { Button } from 'antd';

  const Status = () => {
    const [counter, setCounter] = useState(0);

    const onAlertButtonClick = () => {
      setTimeout(() => {
        alert(counter);
      }, 3000);
    };
    return (
      <div>
        <p>You clicked {counter} times.</p>
        <Button onClick={() => setCounter(counter + 1)}>Click me</Button>
        <Button onClick={onAlertButtonClick}>
          Show me the value in 3 seconds
        </Button>
      </div>
    );
  };

  export default Status;
  ```

  > 当你点击`Show me the value in 3 seconds`的后，紧接着点击`Click me`使得 counter 的值从 0 变成 1。三秒后，定时器触发，但 alert 出来的是 0（旧值），但我们希望的结果是当前的状态 1。
  >
  > 这个问题在 class 组件中就不会出现，因为`class component`的属性和方法都存放在一个`instance`上，调用方式是：`this.state.xxx`和`this.method()`。因为每次都是从一个不变的`instance`上进行取值，所以不存在引用是旧的问题。

  > hooks 要想实现状态同步，也简单，用 useRef 来备份一次 counter

  ```typescript
  import React, { useState, useRef, useEffect } from 'react';
  import { Button } from 'antd';

  const Status = () => {
    const [counter, setCounter] = useState(0);
    const counterRef = useRef(counter);

    const onAlertButtonClick = () => {
      setTimeout(() => {
        alert(counterRef.current);
      }, 3000);
    };

    useEffect(() => {
      counterRef.current = counter;
    });
    return (
      <div>
        <p>You clicked {counter} times.</p>
        <Button
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          Click me
        </Button>
        <Button onClick={onAlertButtonClick}>
          Show me the value in 3 seconds
        </Button>
      </div>
    );
  };

  export default Status;
  ```

##### 注意事项

- 不在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。
- 不在普通的 JavaScript 函数中调用 Hook，在 React 的函数组件或者自定义 Hook 中调用 Hook。
- useEffect 中的依赖项不要写太多，依赖过多，可以单独抽离 hooks,遵循函数的单一职责
- 状态不同步的问题除了使用 ref，可以手动的传递参数到函数

#### 优秀 hooks 库

- ahooks
- react-use

#### hooks 最佳实践

#### hooks 心智负担

> 使用 hooks 开发经常提及的几个问题

- 我是用单个 state 还是多个 state 变量？
- effect 依赖过多，导致 hooks 难以维护？
- 一个组件导出都是 useEffect
- 该不该使用 useMemo

> 基于这些问题，在知乎和掘金等平台找到了一些还不错的最佳实践

- 将完全不相关的 state 拆分为多组 state
- 如果某些 state 是相互关联的，或者需要一起发生改变，就可以把它们合并为一组 state，也可以用 useReducer 集中处理
- 依赖数组依赖的值最好不要超过 3 个，否则会导致代码会难以维护。
- 如果发现依赖数组依赖的值过多，我们应该采取一些方法来减少它
  - 去掉不必要的依赖
  - 将 hooks 拆分成更小的单元，每个 hooks 依赖于自己的依赖数组
  - 通过合并关联性强的 state，将多个 state 聚合为一个
  - 通过 setState 的回调函数来获取最新的 state,已减少外部依赖
  - 通过 useRef 来读取可变变量的值，要控制好修改时机
- 应该使用 useMemo 的场景
  - 保持引用相等
  - 成本比较高的计算
- 无需使用 useMemo 的场景
  - 如果返回的值是基本数据类型，string,boolean,null,undefined,symbol,一般不需要使用
  - 仅在组件内部用到的 object,array,函数等（没有作为 Props 传递给子组件），且没有用到其他 hook 的依赖数组中，一般不需要使用
- hooks,render Props ,HOC 都有各自的使用场景，看实际需求
- 若 hook 类型相同，且依赖数组一致，应合并成一个 hook
- 定义 hooks 返回值两个以内可以用 Tulp 类型（元组），外部调用更容易重命名，返回值过多，可以返回对象，或者包装一下，再返回元组类型 return [visible,{setTrue,setFalse,toggle}]
- ref 不要直接暴露给外部使用，应提供一个修改值的方法，方便追踪
- 在使用 useMemo 或者 useCallback 时，可以借助 ref 或者 setState callback，确保返回的函数只创建一次。也就是说，函数不会根据依赖数组的变化而二次创建。
