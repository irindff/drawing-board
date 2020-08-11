import React, {Component} from 'react';
import './styles.scss'

class DrawingBoard extends Component {
    constructor(props) {
        super(props);
        this.responsiveCanvas = this.responsiveCanvas.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        this.paint = this.paint.bind(this);
        this.clearInputValue = this.clearInputValue.bind(this);

        this.state = {
            canvasWidth: 200,
            canvasHeight: 200,
            canvasLineWidth: 7,
            canvasLineJoin: 'round',
            canvasLineCap: 'round',
            name: '',
        };

    }

//user inputs:
    updateInputValue(evt) {
        this.setState({
            name: evt.target.value,
        });
    }

    clearInputValue() {
        this.setState({
            name: "",
        });
        this.clearPaint();
    }

    // Drawing :
    isPainting = false;
    strokeColor = '#ec0000';
    line = [];
    prevPos = {offsetX: 0, offsetY: 0};

    onMouseDown({nativeEvent}) {
        const {offsetX, offsetY} = nativeEvent;
        this.isPainting = true;
        this.prevPos = {offsetX, offsetY};
    }

    onMouseMove({nativeEvent}) {
        if (this.isPainting) {
            const {offsetX, offsetY} = nativeEvent;
            const offSetData = {offsetX, offsetY};
            // Set the start and stop position of the paint event.
            const positionData = {
                start: {...this.prevPos},
                stop: {...offSetData},
            };
            // Add the position to the line array
            this.line = this.line.concat(positionData);
            this.paint(this.prevPos, offSetData, this.strokeColor);
        }
    }

    endPaintEvent() {
        if (this.isPainting) {
            this.isPainting = false;
        }
    }

    paint(prevPos, currPos, strokeStyle) {
        if (this.state.name.length > 0) {
            const {offsetX, offsetY} = currPos;
            const {offsetX: x, offsetY: y} = prevPos;
            this.ctx.lineWidth = this.state.canvasLineWidth;
            this.ctx.lineJoin = this.state.canvasLineJoin;
            this.ctx.lineCap = this.state.canvasLineCap;
            this.ctx.beginPath();
            this.ctx.strokeStyle = strokeStyle;
            // Move the the prevPosition of the mouse
            this.ctx.moveTo(x, y);
            // Draw a line to the current position of the mouse
            this.ctx.lineTo(offsetX, offsetY);
            // Visualize the line using the strokeStyle
            this.ctx.stroke();

            this.prevPos = {offsetX, offsetY};
        }
    }

    clearPaint() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }

    responsiveCanvas() {
        let elem = document.getElementById('canvasBox');
        this.setState({
            canvasWidth: elem.clientWidth,
            canvasHeight: elem.clientWidth * .5,
        });
    }

    componentDidMount() {
        this.responsiveCanvas();
        window.addEventListener("resize", this.responsiveCanvas);
        this.ctx = this.canvas.getContext('2d');

    }

    render() {
        return (
            <div className="col-4 align-self-end">
                {this.state.name && <h4 className='text-capitalize'>{this.state.name} is drawing</h4>}

                <div id='canvasBox'>
                    <canvas className='canvas'
                            ref={(ref) => (this.canvas = ref)}
                            width={this.state.canvasWidth} height={this.state.canvasHeight}
                            onMouseDown={this.onMouseDown}
                            onMouseLeave={this.endPaintEvent}
                            onMouseUp={this.endPaintEvent}
                            onMouseMove={this.onMouseMove}
                    />
                </div>
                <div className="input-group mb-3 mt-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary" type="button"
                                onClick={this.clearInputValue}>Clear
                        </button>
                    </div>
                    <input type="text" className="form-control" placeholder="" value={this.state.name}
                           onChange={evt => this.updateInputValue(evt)}/>
                </div>
            </div>
        );
    }
}

export default DrawingBoard;