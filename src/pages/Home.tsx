import { useDispatch } from "react-redux";
import snackBarSlice from "../redux/snackBarSlice"
import Image from "../components/Image";
const icon = "/assets/favicon.png"
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from '@mui/icons-material/Category';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from "@mui/material";
import TaskItem from "../components/TaskItem";
import { useEffect, useState } from "react";
import PopupMenu from "../components/PopupMenu";
import CircleIcon from '@mui/icons-material/Circle';
import DeleteModal from "../components/DeleteModal";
import AddTaskModal from "../components/AddTaskModal";
import { openDB } from 'idb';

type TaskType = {
  id: number,
  title: string,
  description: string,
  category: string,
  isDone: boolean,
}

const Home = () => {
  const dispatch = useDispatch();

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const openDatabase = async () => {
      const db = await openDB('todo', 1, {
        upgrade(db) {
          db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        },
      });

      const initialTasks = await db.getAll('tasks');
      setTasks(initialTasks);
    };

    openDatabase();
  }, []);

  // dispatch(snackBarSlice.actions.setSnackBar({
  //   isOpen: true,
  //   message: 'لطفا کد تایید را صحیح وارد نمایید.',
  //   type: 'error',
  // }))

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickCategory = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (item: string) => {
    if (item == 'نظرات') {
      console.log('test 1')
    }
  };

  const handleClickDeleteAll = () => {
    setOpenDeleteModal(true)
  }

  const handleDeleteAll = () => {
    setOpenDeleteModal(false)
    //delete all task from db
  }

  const handleClickAddTask = () => {
    setOpenAddTaskModal(true)
  }

  const handleAddTask = async (title: string, description: string, category: string) => {
    setOpenAddTaskModal(false)

    const db = await openDB('todo', 1);
    const newTaskObj: TaskType = {
      id: Date.now(),
      title: title,
      description: description,
      category: category,
      isDone: false,
    };
    await db.add('tasks', newTaskObj);
    setTasks([...tasks, newTaskObj]);
  }

  const handleClickTasks = async () => {
    const db = await openDB('todo', 1, {
      upgrade(db) {
        db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
      },
    });

    const initialTasks = await db.getAll('tasks');
    setTasks(initialTasks);
  }

  const handleUpdateCheckedTask = async (isChecked: boolean, editingTodo: TaskType) => {
    const db = await openDB('todo', 1);
    const updatedTask: TaskType = { ...editingTodo, isDone: isChecked };
    await db.put('tasks', updatedTask);
    const updatedTasks = tasks.map((task) =>
      task.id === editingTodo.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="w-full h-screen flex flex-row overflow-hidden">
      <PopupMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        menuItems={
          [
            { title: 'اولویت خیلی کم', icon: <CircleIcon className="text-red-500" /> },
            { title: 'اولویت کم', icon: <CircleIcon className="text-orange" /> },
            { title: 'اولویت متوسط', icon: <CircleIcon className="text-amber-500" /> },
            { title: 'اولویت بالا', icon: <CircleIcon className="text-lime-500" /> },
            { title: 'اولویت خیلی بالا', icon: <CircleIcon className="text-teal-500" /> },
            { title: 'همه', icon: <CircleIcon className="text-green-500" /> },
          ]
        }
        onClickMore={(item) => handleCloseMenu(item)}
      />

      <DeleteModal
        title="هشدار"
        description="آیا از حذف تمام کارها اطمینان دارید؟"
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        yesBtnOnClick={handleDeleteAll}
      />

      <AddTaskModal
        title="افزودن کار جدید"
        description="آیا از حذف تمام کارها اطمینان دارید؟"
        open={openAddTaskModal}
        setOpen={setOpenAddTaskModal}
        submitBtnOnClick={(title, description, category) => handleAddTask(title, description, category)}
      />

      <div className="flex-1 h-full flex flex-col items-center justify-start bg-slate-200">
        <h1 className="text-5xl font-bold px-8 py-4 animated rubberBand">
          مدیریت کارها
        </h1>

        {/* Filters */}
        <div className="w-full flex flex-row items-center justify-between mt-16 px-8 py-4">
          <div className="flex flex-row gap-4 items-center justify-center">
            <Button
              variant="outlined"
              sx={{
                fontFamily: 'vazir-medium'
              }}
            >
              انجام نشده
            </Button>
            <Button
              variant="outlined"
              sx={{
                fontFamily: 'vazir-medium'
              }}
            >
              انجام شده
            </Button>
            <Button
              variant="contained"
              sx={{
                fontFamily: 'vazir-medium'
              }}
            >
              همه
            </Button>
          </div>
          <h2 className="text-4xl">
            کارها
          </h2>
        </div>

        <span className="w-full h-px bg-slate-500 shadow-2xl rounded-full my-4" />

        {/* Tasks Items */}
        <div className="w-full overflow-y-auto px-8 py-4 mt-4">
          <div className="w-full flex flex-col items-center justify-center gap-6">
            {
              tasks.map((item, index) => {
                return (
                  <TaskItem
                    key={index}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    checked={item.isDone}
                    setChecked={(isChecked) => handleUpdateCheckedTask(isChecked, item)}
                    onDeleteClick={handleClickDeleteAll}
                    onEditClick={handleClickAddTask}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="h-full flex flex-col items-center justify-between bg-slate-100 px-8 py-4">
        <Image
          url={icon}
          alt="Icon"
          className="animated tada size-[200px] rounded-full border-2 border-purple-500 border-solid"
        />
        <div className="w-full flex-1 flex items-center justify-center flex-col gap-8">
          <div
            className="w-full flex flex-row items-center justify-end gap-4 cursor-pointer hover:bg-purple-200 rounded-2xl px-4 py-2 group transition-all duration-150"
            onClick={handleClickTasks}
          >
            <h3 className="text-2xl group-hover:text-purple-500">کارها</h3>
            <TaskAltIcon className="group-hover:text-purple-500" />
          </div>
          <div
            className="w-full flex flex-row items-center justify-end gap-4 cursor-pointer hover:bg-purple-200 rounded-2xl px-4 py-2 group transition-all duration-150"
            onClick={handleClickAddTask}
          >
            <h3 className="text-2xl group-hover:text-purple-500">افزودن کار</h3>
            <AddTaskIcon className="group-hover:text-purple-500" />
          </div>
          <div
            className="w-full flex flex-row items-center justify-end gap-4 cursor-pointer hover:bg-purple-200 rounded-2xl px-4 py-2 group transition-all duration-150"
            onClick={handleClickCategory}
          >
            <h3 className="text-2xl group-hover:text-purple-500">دسته بندی ها</h3>
            <CategoryIcon className="group-hover:text-purple-500" />
          </div>
          <div
            className="w-full flex flex-row items-center justify-end gap-4 cursor-pointer hover:bg-purple-200 rounded-2xl px-4 py-2 group transition-all duration-150"
            onClick={handleClickDeleteAll}
          >
            <h3 className="text-2xl group-hover:text-purple-500">پاک کردن همه</h3>
            <DeleteIcon className="group-hover:text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home