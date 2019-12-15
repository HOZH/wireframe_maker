import React, { Component } from 'react'
import ResizableRect from 'react-resizable-rotatable-draggable'



export default class Drag extends Component {

    componentDidMount(){

        // console.log('after drag mounted', this.props);
  
      }
    
    constructor(props) {
        super(props)
        let { top, left, width, height } = this.props.item
        this.state = {
            width: width||100,
            height: height||100,
            top: top||0,
            left: left||0
        }
    }

    handleResize = (style) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style
        top = Math.round(top)
        left = Math.round(left)
        width = Math.round(width)
        height = Math.round(height)
        this.setState({
            top,
            left,
            width,
            height
        })

    }

    // handleRotate = (rotateAngle) => {
    //     this.setState({
    //         rotateAngle
    //     })
    // }

    handleDrag = (deltaX, deltaY) => {
        this.setState({
            left: this.state.left + deltaX,
            top: this.state.top + deltaY
        })
    }


    render() {
        const { width, top, left, height, rotateAngle } = this.state


        // console.log('drag page',this.props);

        return (
            <div>
                <ResizableRect
                    left={left}
                    top={top}
                    width={width}
                    height={height}
                    // rotateAngle={rotateAngle}
                    // aspectRatio={false}
                    // minWidth={10}
                    // minHeight={10}
                    // zoomable='n, w, s, e, nw, ne, se, sw'
                    zoomable='nw, ne, se, sw'

                    // rotatable={true}
                    // onRotateStart={this.handleRotateStart}
                    // onRotate={this.handleRotate}
                    // onRotateEnd={this.handleRotateEnd}
                    // onResizeStart={this.handleResizeStart}
                    onResize={this.handleResize}
                    // onResizeEnd={this.handleUp}
                    // onDragStart={this.handleDragStart}
                    onDrag={this.handleDrag}
                    // onDragEnd={this.handleDragEnd}
                    className="drag"
                >
                  {/* <div>
                      <p>123</p>
                  </div> */}
                </ResizableRect>
            </div>
        )
    }
}
