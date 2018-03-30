import * as React from 'react';
import './App.css';

// import { Motion, spring } from 'react-motion';
// const logo = require('./logo.svg');

enum BlockType {
  CAPTAIN,
  TEAMMEM
}

interface State {
  blocks: Array<{
    type: BlockType,
    index: number
  }>;
  open: boolean;
}

class App extends React.Component {

  state: State = {
    blocks: [],
    open: false
  };

  // 10个方块
  count = 10;

  // 计时器
  timeout: any = 0;

  componentWillMount() {
    let { blocks } = this.state;
    // 生成N个随机方块，此后每消耗掉一个，再次随机生成一个
    for (let i = 0; i < this.count; i++) {
      blocks = [...blocks, { type: this.getCaptainRandomBlock(), index: -1 }];
    }

    this.setState({
      blocks
    });
  }

  getCaptainRandomBlock() {
    // 获取随机方块，队长50%，其他两名队员各25%
    let isCaptainBlock = Math.floor(Math.random() * 2);
    return isCaptainBlock ? 0 : 2 - Math.floor(Math.random() * 2);
  }

  handleMouseDown = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.moveBlockAnimate(this.state.blocks);
  }

  // 将资源池内的方块移动到点击栏
  moveBlockAnimate(blocks: Array<{
    type: BlockType,
    index: number
  }>) {
    console.log('new blocks', blocks);
    // 遍历方块，检查有多少个
    let count = 0;
    // let { blocks } = this.state;
    this.timeout = setInterval(() => {
      if (count === 10) {
        clearTimeout(this.timeout);
      } else {
        blocks[count].index = count;
        count++;
        this.setState({
          blocks
        });
      }
    }, 500);
  }

  // 将点击栏的方块向前移动N格
  moveForwardBlock(index: number) {
    return;
  }

  handleClickBlock(block: any, index: any) {
    let { blocks } = this.state;
    // this.setState({
    //   blocks: [...blocks.slice(0, index), ...blocks.slice(index + 1, blocks.length), blocks[index]]
    // });
    this.moveBlockAnimate([...blocks.slice(0, index), ...blocks.slice(index + 1, blocks.length), blocks[index]]);

  }

  render() {
    let { blocks } = this.state;
    return (
      <div className="app">
        <button onMouseDown={this.handleMouseDown}>
          START
        </button>
        <div className="bar">
          {
            blocks.map((block, index) =>
              <button
                className="block"
                style={block.index === -1 ? {} : { 'right': `${50 * index}px` }}
                onClick={() => this.handleClickBlock(block, block.index)}
                key={index}
              >
                {block.type}
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
