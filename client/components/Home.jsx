import React from 'react';
// react hook that gives you access to the array of browser paths
import { useHistory } from 'react-router-dom';


const handleClick = () => {
  return(
    ['hey', 'hi', 'yeet', 'boi']
  )
  // make fetch request
  // get returned data
}

const Home = () => {

  // update songs state when handleClick to then iterate through songs and render 
    // each Song component
  // const [ songs, setSongs ] = useState({

  // })

  let history = useHistory();
  const songs = [];
  // for (let i = 0; i < , i++)

  
  return(
    <div>
      <h1>u are home c:</h1>
      <button onClick={handleClick()}>GET LISTENED SONGS</button>
    
      {/* // song react component that renders dynamically on click */}
      {songs}
    </div>

    

  )
}


const Song = () => {
  return(
    <div>
      <h1>This is a song.</h1>
    </div>
  )
}
//   render() {
//     const voteBoxes = [];
//       for (let i = 0; i < this.state.submissions.length; i++) {
//         voteBoxes.push(<VoteBox 
//           key={i} 
//           id={i+1} 
//           count={i+1} 
//           clicker={() => {updateVote(i+1)}} 
//           submission={this.state.submissions[i]}/>)
//       };
    
//     return(
//       <div style={{fontSize:'30px'}}>
//         Please vote here
//         <div onLoad={getSubmissions()}>
//           {voteBoxes}

// class VoteBox extends Component {
  
//   render() {
//     return(
//       <div style={{fontSize:'20px'}}>
//         <button id={this.props.id} style={{height: 50, fontSize:'30px'}}  onClick={this.props.clicker}>
//           Vote for Option {this.props.count}
//         </button>
//           <br />
//           {this.props.submission}
//         <br /><br /><br />
//       </div>
//     );
//   }
// }



export default Home;