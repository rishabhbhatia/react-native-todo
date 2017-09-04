'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, PanResponder, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';

const PREVIEW_OPEN_DELAY = 700;
const PREVIEW_CLOSE_DELAY = 300;

const TAG = 'SwipeRow';

/**
 * SwipeRow can be rendered with three children.
 *
 * e.g.
  <SwipeRow
		renderLeftRow={() => <Text>Left Row</Text>}
		renderRightRow={() => <Text>Right Row</Text>}
		renderItem={() => <Text>Visible Row</Text>}
 	/>
 */
class SwipeRow extends Component {

	constructor(props) {
		super(props);
		this.horizontalSwipeGestureBegan = false;
		this.horizontalSwipeGestureEnded = false;
		this.rowItemJustSwiped = false;
		this.swipeInitialX = null;
		this.ranPreview = false;
		this.state = {
			dimensionsSet: false,
			hiddenHeight: 0,
			hiddenWidth: 0,
			swipingLeft: true
		};
		this._translateX = new Animated.Value(0);
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (e, gs) => this.handleOnMoveShouldSetPanResponder(e, gs),
			onPanResponderMove: (e, gs) => this.handlePanResponderMove(e, gs),
			onPanResponderRelease: (e, gs) => this.handlePanResponderEnd(e, gs),
			onPanResponderTerminate: (e, gs) => this.handlePanResponderEnd(e, gs),
			onShouldBlockNativeResponder: _ => false,
		});
	}

	getPreviewAnimation(toValue, delay) {
		return Animated.timing(
			this._translateX,
			{ duration: this.props.previewDuration, toValue, delay }
		);
	}

	onContentLayout(e) {
		this.setState({
			dimensionsSet: !this.props.recalculateHiddenLayout,
			hiddenHeight: e.nativeEvent.layout.height,
			hiddenWidth: e.nativeEvent.layout.width,
		});

		if (this.props.previewFirstRow && !this.ranPreview) {
			let {previewOpenValue} = this.props;
			this.ranPreview = true;

			this.getPreviewAnimation(previewOpenValue, PREVIEW_OPEN_DELAY)
			.start( _ => {
				this.getPreviewAnimation(0, PREVIEW_CLOSE_DELAY).start();
			});
		}
	}

	handleOnMoveShouldSetPanResponder(e, gs) {
		const { dx } = gs;
		return Math.abs(dx) > this.props.directionalDistanceChangeThreshold;
	}

	handlePanResponderMove(e, gestureState) {
		const { dx, dy } = gestureState;
		const absDx = Math.abs(dx);
		const absDy = Math.abs(dy);

		if(this.horizontalSwipeGestureEnded)
			return;

		if (absDx > this.props.directionalDistanceChangeThreshold) {

			if (this.swipeInitialX === null) {
				this.swipeInitialX = this._translateX._value
			}
			if (!this.horizontalSwipeGestureBegan) {
				this.horizontalSwipeGestureBegan = true;
				this.props.swipeGestureBegan && this.props.swipeGestureBegan();
			}

			let newDX = this.swipeInitialX + dx;
			if (this.props.disableLeftSwipe  && newDX < 0) { newDX = 0; }
			if (this.props.disableRightSwipe && newDX > 0) { newDX = 0; }

			this._translateX.setValue(newDX);

			let toValue = 0;
			if (this._translateX._value >= 0) {
				this.setState({
					...this.state,
					swipingLeft: false
				});

				if (this._translateX._value > this.props.leftOpenValue * (this.props.swipeToOpenPercent/100)) {
					toValue = this.props.leftOpenValue;
					console.log(TAG, 'More than halfway, swiping to right');
					this.onSwipedRight(toValue);
				}
			} else {
				this.setState({
					...this.state,
					swipingLeft: true
				});

				if (this._translateX._value < this.props.rightOpenValue * (this.props.swipeToOpenPercent/100)) {
					toValue = this.props.rightOpenValue;
					console.log(TAG, 'More than halfway, swiping to left');
					this.onSwipedLeft(toValue);
				}
			}

		}
	}

	handlePanResponderEnd(e, gestureState) {

		if(!this.horizontalSwipeGestureEnded)
			this.closeRow();

		console.log(TAG, this.horizontalSwipeGestureEnded);
	}

	closeRow() {
		console.log(TAG, 'close row called');
		if(this.rowItemJustSwiped) {
			this.forceCloseRow();
		}else {
			this.manuallySwipeRow(0);
		}
	}

	forceCloseRow = () => {
		Animated.timing(
			this._translateX,
			{
				duration: 0,
				toValue: 0,
			}
		).start();
	}

	onSwipedLeft = (toValue) => {
		const {onSwipedLeft} = this.props;

		this.horizontalSwipeGestureEnded = true;
		this.rowItemJustSwiped = true;

		this.manuallySwipeRow(toValue).then(() => {
			if(onSwipedLeft)
				onSwipedLeft();
			this.closeRow();
		});
	}

	onSwipedRight = (toValue) => {
		const {onSwipedRight} = this.props;

		this.horizontalSwipeGestureEnded = true;
		this.rowItemJustSwiped = true;

		this.manuallySwipeRow(toValue).then(() => {
			if(onSwipedRight)
				onSwipedRight();
			this.closeRow();
		});
	}

	manuallySwipeRow(toValue) {

		return new Promise((resolve,reject) => {

			console.log(TAG, "launching animation");
			Animated.timing(
				this._translateX,
				{
					duration: this.props.swipeDuration,
				 	toValue,
			 	}
			).start( _ => {
				console.log(TAG, "animation over");

				// reset everything
				this.swipeInitialX = null;
				this.horizontalSwipeGestureBegan = false;
				this.horizontalSwipeGestureEnded = false;

				resolve();
			});
		});
	}

	renderVisibleContent = () => {
		return (
				this.props.renderItem()
		);
	};

	renderRowContent() {
		// We do this annoying if statement for performance.
		// We don't want the onLayout func to run after it runs once.
		if (this.state.dimensionsSet) {
			return (
				<Animated.View
					{...this._panResponder.panHandlers}
					style={{
						transform: [
							{translateX: this._translateX}
						]
					}}
				>
					{this.renderVisibleContent()}
				</Animated.View>
			);
		} else {
			return (
				<Animated.View
					{...this._panResponder.panHandlers}
					onLayout={ (e) => this.onContentLayout(e) }
					style={{
						transform: [
							{translateX: this._translateX}
						]
					}}
				>
					{this.renderVisibleContent()}
				</Animated.View>
			);
		}
	}

	render() {
		return (
			<View>
				<View style={[
					styles.hidden,
					{
						height: this.state.hiddenHeight,
						width: this.state.hiddenWidth,
					}
				]}>
					{this.state.swipingLeft ? ((this.props.renderRightRow && this.props.renderRightRow()) || null) :
						 ((this.props.renderLeftRow && this.props.renderLeftRow()) || null)}
				</View>
				{this.renderRowContent()}
			</View>
		);
	}

}

const styles = StyleSheet.create({
	hidden: {
		bottom: 0,
		left: 0,
		overflow: 'hidden',
		position: 'absolute',
		right: 0,
		top: 0,
	},
});

SwipeRow.propTypes = {
	/**
	 * How to render a left hidden row (renders behind the row). Should return a valid React Element.
	 * This is required unless renderRow is passing a SwipeRow.
	 */
	renderLeftRow: PropTypes.func,
	/**
	 * How to render a right hidden row (renders behind the row). Should return a valid React Element.
	 * This is required unless renderRow is passing a SwipeRow.
	 */
	renderRightRow: PropTypes.func,
	/**
	 * How to render row item. Should return a valid React Element.
	 */
	renderItem: PropTypes.func.isRequired,
	/**
	 * TranslateX value for opening the row to the left (positive number)
	 */
	leftOpenValue: PropTypes.number,
	/**
	 * TranslateX value for opening the row to the right (negative number)
	 */
	rightOpenValue: PropTypes.number,
	/**
	 * Disable ability to swipe the row left
	 */
	disableLeftSwipe: PropTypes.bool,
	/**
	 * Disable ability to swipe the row right
	 */
	disableRightSwipe: PropTypes.bool,
	/**
	 * Called when left swipe is compelted
	 */
	onSwipedLeft: PropTypes.func,
	/**
	 * Called when right swipe is compelted
	 */
	onSwipedRight: PropTypes.func,
	/**
	 * Should the row do a slide out preview to show that it is swipeable
	 */
	previewFirstRow: PropTypes.bool,
	/**
	 * Duration of the slide out preview animation
	 */
	previewDuration: PropTypes.number,
	/**
	 * TranslateX value for the slide out preview animation
	 */
	previewOpenValue: PropTypes.number,
	/**
	 * Duration of the slide out swipe animation
	 */
	swipeDuration: PropTypes.number,
	/**
	 * What % of the left/right openValue does the user need to swipe
	 * past to trigger the row opening.
	 */
	swipeToOpenPercent: PropTypes.number,
	/**
	 * Enable hidden row onLayout calculations to run always
	 */
	recalculateHiddenLayout: PropTypes.bool,
};

SwipeRow.defaultProps = {
	leftOpenValue: 0,
	rightOpenValue: 0,
	disableLeftSwipe: false,
	disableRightSwipe: false,
	previewFirstRow: false,
	previewDuration: 300,
	previewOpenValue: 150,
	swipeDuration: 250,
	swipeToOpenPercent: 35,
	recalculateHiddenLayout: false,
	directionalDistanceChangeThreshold: 2,
};

export default SwipeRow;
