
import './App.css';

function App() {
  return (
    <div className="App">
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" id="file" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
