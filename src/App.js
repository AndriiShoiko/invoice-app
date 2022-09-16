import './styles/App.scss';
import ButtonDelete from './UI/Buttons/ButtonDelete/ButtonDelete';
import ButtonEdit from './UI/Buttons/ButtonEdit/ButtonEdit';
import ButtonMark from './UI/Buttons/ButtonMark/ButtonMark';
import ButtonNew from './UI/Buttons/ButtonNew/ButtonNew';
import ButtonNewItem from './UI/Buttons/ButtonNewItem/ButtonNewItem';
import ButtonSave from './UI/Buttons/ButtonSave/ButtonSave';

function App() {
  return (
    <div className="App">
      <ButtonNew>New invoice</ButtonNew>
      <ButtonMark>Mark as Paid</ButtonMark>
      <ButtonDelete>Delete</ButtonDelete>
      <ButtonNewItem>+ Add New Item</ButtonNewItem>
      <ButtonSave>Save as Draft</ButtonSave>
      <ButtonEdit>Edit</ButtonEdit>
    </div>
  );
}

export default App;
