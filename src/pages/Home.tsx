import { useDispatch } from "react-redux";
import snackBarSlice from "../redux/snackBarSlice"

const Home = () => {
  const dispatch = useDispatch();

  dispatch(snackBarSlice.actions.setSnackBar({
    isOpen: true,
    message: 'لطفا کد تایید را صحیح وارد نمایید.',
    type: 'error',
  }))

  return (
    <div className="text-white h1">Home</div>
  )
}

export default Home