  import * as React from 'react';
  import {  DockNew as Dock,  DockNewExtensions as DockExtensions } from '@qunhe/tools-ui-pro'
  
  interface PanelState {
    size: DockExtensions.Vector2;
    floatPosition: DockExtensions.Vector2;
    containerId?: string;
    headSize: DockExtensions.PanelHeadSize;
    togglerPlacement?: DockExtensions.TogglerPlacement;
    togglerStatus?: DockExtensions.TogglerStatus;
    bodyVisible?: boolean;
    title?: string;
  }
  interface State {
    world: PanelState;
  }
  const edgeDraggers: DockExtensions.EdgeDraggerPlacement[] = [
    'top',
    'left',
    'bottom',
    'right',
  ];

  export default class BaseDemo extends React.PureComponent<{}, State> {
    constructor(props: {}) {
      super(props);
      this.state = {
        world: {
          title: 'world title',
          size: {
            x: 240,
            y: 220,
          },
          floatPosition: {
            x: 100,
            y: 1000,
          },
          containerId: 'left-container',
          headSize: 'middle',
        }
      };
      this.handleWorldSizeChange = this.handleWorldSizeChange.bind(this);
      this.handleWorldFloatPositionChange = this.handleWorldFloatPositionChange.bind(
        this,
      );
      this.handleWorldContainerChange = this.handleWorldContainerChange.bind(
        this,
      );
    }
  
    render() {
      const state = this.state;
      return (
        <div className="root-container"
            // style={{height: '300px'}}
        >
          {/* <Dock> */}
            {/* <Dock.Container
              dockId="left-container"
              snapDirection="right"
              mode='float'
              style={{position: 'absolute', right: 0}}
            /> */}
            <Dock.Panel
              dockId="world"
              containerId={state.world.containerId}
              movable={true}
              order={0}
              title={state.world.title}
              size={state.world.size}
              headSize={state.world.headSize}
              floatPosition={state.world.floatPosition}
              onFloatPositionChange={this.handleWorldFloatPositionChange}
              onContainerChange={this.handleWorldContainerChange}
            >
              ddddd
            </Dock.Panel>
          {/* </Dock> */}
        </div>
      );
    }
  
    private handleWorldSizeChange(size: DockExtensions.Vector2) {
      this.setState({
        world: { ...this.state.world, size },
      });
    }
  
    private handleWorldFloatPositionChange(
      floatPosition: DockExtensions.Vector2,
    ) {
      console.log('float change');
      this.setState({
        world: { ...this.state.world, floatPosition },
      });
    }
  
    private handleWorldContainerChange(containerId: string | undefined) {
        console.log('contaner change')
      this.setState({
        world: { ...this.state.world, containerId },
      });
    }
  }
  