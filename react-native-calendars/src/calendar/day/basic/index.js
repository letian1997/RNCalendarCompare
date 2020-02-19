import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  View, 
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import {shouldUpdate} from '../../../component-updater';
import OvulationIcon from '../../../../../../app/resources/image/heart_dark.png';
import FertileIcon from '../../../../../../app/resources/image/heart_light.png';
import styleConstructor from './style';

class Day extends Component {
  static displayName = 'IGNORE';
  
  static propTypes = {
    // TODO: disabled props should be removed
    state: PropTypes.oneOf(['disabled', 'today', '']),

    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    date: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.onDayPress = this.onDayPress.bind(this);
    this.onDayLongPress = this.onDayLongPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }
  onDayLongPress() {
    this.props.onLongPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    return shouldUpdate(this.props, nextProps, ['state', 'children', 'marking', 'onPress', 'onLongPress']);
  }

  render() {
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];
    const dotStyle = [this.style.dot];

    let marking = this.props.marking || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true
      };
    }
    const isDisabled = typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled';
    let dot;
    let icon;

    if (marking.marked) {
      dotStyle.push(this.style.visibleDot);
      if (isDisabled) {
        dotStyle.push(this.style.disabledDot);
      }
      if (marking.dotColor) {
        dotStyle.push({backgroundColor: marking.dotColor});
      }
      dot = (<View style={dotStyle}/>);
    }

    if (marking.isSpotting) {
      containerStyle.push({backgroundColor: '#917B90'})
      textStyle.push({color: 'white'})
    }

    if (marking.isLightFlow) {
      containerStyle.push({backgroundColor: '#AA6FA5'})
      textStyle.push({color: 'white'})
    }

    if (marking.isMooderateFlow) {
      containerStyle.push({backgroundColor: '#994A85'})
      textStyle.push({color: 'white'})
    }

    if (marking.isHeavyFlow) {
      containerStyle.push({backgroundColor: '#4E2447'})
      textStyle.push({color: 'white'})
    }

    if(marking.isOvulation){
      icon = (<Image source={OvulationIcon} style={{position: 'absolute', top: 3, right: 3}}/>);
    }

    if(marking.isFertile){
      icon = (<Image source={FertileIcon} style={{position: 'absolute', top: 3, right: 3}}/>);
    }

    if (marking.selected) {
      containerStyle.push(this.style.selected);
      if (marking.selectedColor) {
        containerStyle.push({backgroundColor: marking.selectedColor});
      }
      dotStyle.push(this.style.selectedDot);
      textStyle.push(this.style.selectedText);
    } else if (isDisabled) {
      textStyle.push(this.style.disabledText);
    } else 
    if (this.props.state === 'today') {
      containerStyle.push(this.style.today);
      textStyle.push(this.style.todayText);
      dotStyle.push(this.style.todayDot);
    }

    return (
      <TouchableOpacity
        testID={this.props.testID}
        style={containerStyle}
        onPress={this.onDayPress}
        onLongPress={this.onDayLongPress}
        activeOpacity={marking.activeOpacity}
        disabled={marking.disableTouchEvent}
      >
        <Text allowFontScaling={false} style={textStyle}>{String(this.props.children)}</Text>
        {dot}
        {icon}
      </TouchableOpacity>
    );
  }
}

export default Day;
