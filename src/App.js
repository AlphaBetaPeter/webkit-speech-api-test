import React, { Component } from 'react';

const recognition = new window.webkitSpeechRecognition();

class App extends Component {

  state = {
	  transcription: ""
  };

  initSpeechApi = () => {
      const _this = this;

	  recognition.stop()

	  recognition.continuous = true;

	  recognition.onresult = (event) => {
	      console.log('res', event);
		  for (let i = event.resultIndex; i < event.results.length; ++i) {
			  let resultChunk = event.results[i][0].transcript;
			  if (event.results[i].isFinal) {
			    console.log('final', resultChunk);
				  let transcription = this.state.transcription += resultChunk;
				  _this.setState({
                      transcription
                  })
			  }
		  }
	  };
	  recognition.start();
  };



  render() {
    return (
      <div className="App">
        <div style={{minWidth: "100px", minHeight: "200px", border: "1px solid gold"}}>
	        {this.state.transcription}
        </div>
	      <button onClick={this.initSpeechApi}>start</button>
	      <button onClick={() => recognition.stop()}>stop</button>
      </div>
    );
  }
}

export default App;
