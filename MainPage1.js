import {createStackNavigator, createAppContainer} from 'react-navigation';
/*import ScreenCreateNote from './ScreenCreateNote';
import ScreenCreateRecipe from './ScreenCreateRecipe';
import ScreenMainNote from './ScreenMainNote';
import App123 from './Page2P2';
import ScreenShowRecipe from './ScreenShowRecipe'
import ScreenEditRecipe from './ScreenEditRecipe'
import DoctorFlatList from './DoctorFlatList'*/
import App123 from './Page2P2';
import LoginPatient from './LoginPatient';
import Signup_Login from './SignUp_Login';
import SignUpPatient from './SignUpPatient';
import ScreenEditPP from './ScreenEditPP';
const MainPage0 = createStackNavigator(
  {
    Signup_Login:{screen:Signup_Login},
    App123 :{screen:App123},
    
    SignUpPatient:{screen:SignUpPatient},
    LoginPatient : {screen:LoginPatient},
    //ScreenEditPP: {screen:ScreenEditPP}
    // DoctorFlatList:{screen:DoctorFlatList}
  },
  {
    headerMode: 'none',
  },
);

const MainPage1 = createAppContainer(MainPage0);
export default MainPage1;
