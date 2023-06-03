import './App.css';

import { CameraComponent } from "./pages/camera";
import { Header } from './components/header';
import { Title } from './components/title';

function App() {
  return (
    <div>
      <Header/>
      <Title 
        text='AIが見つける! あなたに似ているノーベル賞受賞者は誰だ？'
        smallText='AI finds out! Who are the Nobel Prize winners that look like you?'
      />
      <CameraComponent />
    </div>
  );
}

export default App;
