import { useEffect } from "react"
import { useDispatch } from "react-redux";
import AppSettingSlice from "../redux/AppSetting";

const NotFound = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AppSettingSlice.actions.setIs404(true));

        return () => {
            dispatch(AppSettingSlice.actions.setIs404(false));
        }
    }, [])

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <h1 className="h1">NotFound | 404</h1>
        </div>
    )
}

export default NotFound