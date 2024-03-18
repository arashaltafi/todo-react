import EditIcon from '@mui/icons-material/Edit';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

interface TaskItemProps {
    title: string,
    description: string,
    category: string,
    checked: boolean,
    setChecked: (isChecked: boolean) => void,
    onDeleteClick: () => void,
    onEditClick: () => void
}

const TaskItem = (props: TaskItemProps) => {
    return (
        <div dir='rtl' className="bg-slate-100 w-full flex flex-row items-center justify-start gap-6 p-6 shadow-lg shadow-slate-500 rounded-2xl">

            <div onClick={props.onDeleteClick} className='cursor-pointer'>
                <DeleteIcon className="text-slate-500 hover:text-purple-500 transition-all" />
            </div>
            <div onClick={props.onEditClick} className='cursor-pointer'>
                <EditIcon className="text-slate-500 hover:text-purple-500 transition-all" />
            </div>

            <div className="flex-1 flex flex-col items-start justify-center gap-2 mr-4">
                <h2 className="text-xl font-bold">{props.title}</h2>
                <p className="text-md text-justify line-clamp-2">{props.description}</p>
                <div className='w-full flex flex-row items-center justify-end mt-8 gap-2'>
                    {
                        <CircleIcon className={`${props.category === 'اولویت خیلی کم' ? 'text-red-500' :
                            props.category === 'اولویت کم' ? 'text-orange' :
                                props.category === 'اولویت متوسط' ? 'text-amber-500' :
                                    props.category === 'اولویت بالا' ? 'text-lime-500' :
                                        props.category === 'اولویت خیلی بالا' ? 'text-green-500' : 'text-slate-500'
                            }`} />
                    }
                    <h4 className="text-sm">{props.category}</h4>
                </div>
            </div>

            <span className="h-36 w-px bg-slate-500 rounded-full" />

            <Checkbox
                icon={<RadioButtonUncheckedIcon className="text-slate-500" />}
                checkedIcon={<RadioButtonCheckedIcon className="text-purple-500" />}
                checked={props.checked}
                onChange={(e) => props.setChecked(e.target.checked)}
            />
        </div>
    )
}

export default TaskItem