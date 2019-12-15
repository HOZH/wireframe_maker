import React, { Component } from 'react'
import ResizableRect from 'react-resizable-rotatable-draggable'
import { Rnd } from "react-rnd";
import { interfaceDeclaration } from '@babel/types';

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
};

export default class Drag extends Component {

    handleResize = (e, direction, ref, delta, position) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let item = this.props.item;

        item.width = ref.style.width;
        item.height = ref.style.height;
        this.setState(this.props.item);
        this.props.handleWorkModified();
    }


    handleDrag = (e, d) => {
        if (this.props.item.selected) {
            this.props.item.left = d.x;
            this.props.item.top = d.y;
            this.setState(this.props.item);
            this.props.handleWorkModified();
        }
    }

    createItemByType = () => {
        const item = this.props.item;
        const { borderRadius,borderColor,borderWidth,fontSize,backgroundColor} = item
        const itemStyle = {
            "width":"100%",
            "height":"100%",
            "borderRadius":borderRadius+"px",
            "borderColor":borderColor+"",
            "borderWidth":borderWidth+"",
            "fontSize":fontSize+"",
            "backgroundColor":backgroundColor+"",
            // borderStyle:"solid"

        }
        if (item.type === "CONTAINER")
            return (<div className="dragger" style={itemStyle}>{item ? item.property : ""}</div>);
        if (item.type === "BUTTON")
            // return (<button className="dragger" style={itemStyle}>{item ? item.property : ""}</button>);
            // return (<input type="button"></input>)
            return (<button className="dragger btn--floating btn_large waves-effect waves-light" 
            // style={itemStyle}
            style={{...itemStyle,background:"inherit"}}
            >{item ? item.property : ""}</button>);

        if (item.type === "LABEL")
            return (<label className="dragger" 
            style={{...itemStyle,fontSize:fontSize+"px"}}
            >{item ? item.property : ""}</label>);
        if (item.type === "INPUT")
            return (<input className="dragger" value={item ? item.property : ""} 
            style={itemStyle}
            // style={{}}
             ></input>);
        return null;
    }

    render() {
        const item = this.props.item;
        const { fontSize, borderWidth, borderRadius, borderColor, backGroundColor } = item;
        let style = {
            // height:"70%",
            fontSize: fontSize + "px",
            borderWidth: borderWidth + "px",
            borderRadius: borderRadius + "px",
            borderColor: borderColor,
            borderStyle: "solid",
            backgroundColor: backGroundColor + "",
        }
        const cornerStyle = {
            border: "1px solid black",
            width: 10,
            height: 10,

        }

        return (

            <div id={item.id} style={{ overflow: "auto" }} className={this.typeControll}>
                <Rnd
                    style={style}
                    default={{
                        x: item.left,
                        y: item.top,
                        width: item.width,
                        height: item.height
                    }}
                    onDragStop={this.handleDrag}
                    onResizeStop={this.handleResize}
                    resizeHandleStyles={{
                        bottomLeft: item.selected ? cornerStyle : "",
                        bottomRight: item.selected ? cornerStyle : "",
                        topLeft: item.selected ? cornerStyle : "",
                        topRight: item.selected ? cornerStyle : "",
                    }}
                >{this.createItemByType()}
                </Rnd>

            </div >
        )
    }
}
