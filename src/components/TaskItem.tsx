import EditIcon from '@mui/icons-material/Edit';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from "@mui/material";
import { Dispatch, SetStateAction } from 'react';

interface TaskItemProps {
    title: string,
    description: string,
    category: string,
    checked: boolean,
    setChecked: Dispatch<SetStateAction<boolean>>
}

const TaskItem = (props: TaskItemProps) => {
    return (
        <div dir='rtl' className="bg-slate-100 w-full flex flex-row items-center justify-start gap-6 p-6 shadow-lg shadow-slate-500 rounded-2xl">

            <DeleteIcon className="text-slate-500 hover:text-purple-500 cursor-pointer transition-all" />
            <EditIcon className="text-slate-500 hover:text-purple-500 cursor-pointer transition-all" />

            <div className="flex-1 flex flex-col items-start justify-center gap-2 mr-4">
                <h2 className="text-xl font-bold">{props.title}</h2>
                <p className="text-md text-justify line-clamp-2">{props.description}</p>
                <h4 className="text-sm self-end mt-8">{props.category}</h4>
            </div>

            <span className="h-36 w-px bg-slate-500 rounded-full" />

            <Checkbox
                icon={<RadioButtonUncheckedIcon className="text-slate-500" />}
                checkedIcon={<RadioButtonCheckedIcon className="text-purple-500" />}
            />
        </div>
    )
}

export default TaskItem