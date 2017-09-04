import React, {Component, PropTypes} from 'react';
import {ListView, FlatList, Text, View} from 'react-native';

import SwipeRow from './SwipeRow';

/**
 * ListView that renders SwipeRows.
 */
class SwipeListView extends Component {

	constructor(props){
		super(props);
		this._rows = {};
	}

	setRefs = (ref) => {
		if(this.props.listRef)
			this.props.listRef(ref);
	}

	renderItem = (item, index) => {

		const Component = this.props.renderItem(item, index);

		if (!this.props.renderLeftRow && !this.props.renderRightRow) {
			return React.cloneElement(
				Component,
				{
					...Component.props,
				}
			);
		} else {
			return (
				<SwipeRow
					ref={row => this._rows[(index)] = row}
					leftOpenValue={this.props.leftOpenValue}
					rightOpenValue={this.props.rightOpenValue}
					onSwipedLeft={this.props.onSwipedLeft}
					onSwipedRight={this.props.onSwipedRight}
					disableLeftSwipe={this.props.disableLeftSwipe}
					disableRightSwipe={this.props.disableRightSwipe}
					recalculateHiddenLayout={this.props.recalculateHiddenLayout}
					style={this.props.swipeRowStyle}
					previewFirstRow={this.props.previewFirstRow}
					swipeDuration={this.props.swipeDuration}
					previewDuration={this.props.previewDuration}
					previewOpenValue={this.props.previewOpenValue}
					swipeToOpenPercent={this.props.swipeToOpenPercent}
					renderLeftRow={this.props.renderLeftRow}
					renderRightRow={this.props.renderRightRow}
					renderItem={this.props.renderItem}
					item={item}
					index={index}
				/>
			);
		}
	};


	render() {
		return (
			<FlatList
				data={this.props.data}
				keyExtractor={this.props.keyExtractor}
				{...this.props}
				ref={ (list) => this.setRefs(list) }
				renderItem={({item, index}) => this.renderItem(item, index)}
				ItemSeparatorComponent={this.props.renderSeparator}
			/>
		)
	}

}

SwipeListView.propTypes = {
	/**
	 * TranslateX value for opening the row to the left (positive number)
	 */
	leftOpenValue: PropTypes.number,
	/**
	 * TranslateX value for opening the row to the right (negative number)
	 */
	rightOpenValue: PropTypes.number,
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
	 * Row separator component
	 */
	renderSeparator: PropTypes.func,
	/**
	 * Disable ability to swipe rows left
	 */
	disableLeftSwipe: PropTypes.bool,
	/**
	 * Disable ability to swipe rows right
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
	 * Styles for the parent wrapper View of the SwipeRow
	 */
	swipeRowStyle: View.propTypes.style,
	/**
	 * Enable hidden row onLayout calculations to run always.
	 *
	 * By default, hidden row size calculations are only done on the first onLayout event
	 * for performance reasons.
	 * Passing ```true``` here will cause calculations to run on every onLayout event.
	 * You may want to do this if your rows' sizes can change.
	 * One case is a SwipeListView with rows of different heights and an options to delete rows.
	 */
	recalculateHiddenLayout: PropTypes.bool,
	/**
	 * Called when the ListView ref is set and passes a ref to the ListView
	 * e.g. listViewRef={ ref => this._swipeListViewRef = ref }
	 */
	listViewRef: PropTypes.func,
	/**
	 * Should the first SwipeRow do a slide out preview to show that the list is swipeable
	 */
	previewFirstRow: PropTypes.bool,
	/**
	 * Should the specified rowId do a slide out preview to show that the list is swipeable
	 * Note: This ID will be passed to this function to get the correct row index
	 * https://facebook.github.io/react-native/docs/listviewdatasource.html#getrowidforflatindex
	 */
	previewRowIndex: PropTypes.number,
	/**
	 * Duration of the slide out preview animation (milliseconds)
	 */
	previewDuration: PropTypes.number,
  /**
	 * Duration of the slide out swipe animation (milliseconds)
	 */
	swipeDuration: PropTypes.number,
	/**
	 * TranslateX value for the slide out preview animation
	 * Default: 0.5 * props.rightOpenValue
	 */
	previewOpenValue: PropTypes.number,
	/**
	 * The dx value used to detect when a user has begun a swipe gesture
	 */
	directionalDistanceChangeThreshold: PropTypes.number,
	/**
	 * What % of the left/right openValue does the user need to swipe
	 * past to trigger the row opening.
	 */
	swipeToOpenPercent: PropTypes.number,
}

SwipeListView.defaultProps = {
	leftOpenValue: 0,
	rightOpenValue: 0,
	disableLeftSwipe: false,
	disableRightSwipe: false,
	previewFirstRow: false,
	recalculateHiddenLayout: false,
	directionalDistanceChangeThreshold: 2,
	swipeToOpenPercent: 50
}

export default SwipeListView;
