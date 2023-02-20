import { Pages, StyledApp } from "./components/pages/Pages"
import "./App.css";
import { MainInfo } from "./components/pages/MainInfo";
import { Auth } from "./components/pages/Auth";
const App = () => {
    return (
        <StyledApp>
           {/* <Auth/> */}
           <MainInfo />
           {/* <Pages/> */}
        </StyledApp>
    )
}

export default App