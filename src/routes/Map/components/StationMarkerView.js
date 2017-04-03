import React, { Component, PropTypes } from 'react';

class StationMarkerView extends Component {

    static propTypes = {
        value: PropTypes.number,
        pinSize: PropTypes.number,
        strokeColor: PropTypes.string,
        lineWidth: PropTypes.number,
        fontSize: PropTypes.number,
        fontWeight: PropTypes.string,
        onPress: PropTypes.func,
        style: PropTypes.object
    };

    static defaultProps = {
        pinSize: 32,
        value: 0,
        strokeColor: 'black',
        bgColor: 'white',
        fontSize: 14,
        lineWidth: 2,
        fontWeight: 900
    };

    onPress(e) {
        if (this.props.onPress) {
            this.props.onPress(e);
        }
    }

    render() {
        return (
          <div style={Object.assign({
              display: 'flex',
              width: this.props.pinSize,
              height: this.props.pinSize,
              backgroundColor: 'white',
              borderRadius: 100,
              borderStyle: 'solid',
              borderWidth: this.props.lineWidth,
              borderColor: this.props.strokeColor,
              justifyContent: 'center',
              alignItems: 'center'
          }, this.props.style)} onClick={this.onPress.bind(this)}>
              <div style={{
                  fontSize: this.props.fontSize,
                  fontWeight: this.props.fontWeight,
                  backgroundColor: 'transparent',
                  color: this.props.strokeColor
              }}>
                  {this.props.value}
              </div>
          </div>
        )
    }

}

export default StationMarkerView;
