import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAZ1H3k1Thv_buC8vGfZr4nRLVZIaibRGc';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = { videos: [],
			selectedVideo: null
		};

		this.videoSearch('pbs spacetime');
		

		// YTSearch({key: API_KEY, term: 'surf'}, (videos) => {
		// this.setState({ videos });
		// });
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, function(videos){
			this.setState({ 
				videos:videos,
				selectedVideo: videos[0] 
			});
		}.bind(this));
	}

	render(){
		const videoSearch = _.debounce((term)=>{this.videoSearch(term) },300);
		//console.log(this.state.videos);
			return (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={selectedVideo=>this.setState({selectedVideo}) }
					videos={this.state.videos} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));