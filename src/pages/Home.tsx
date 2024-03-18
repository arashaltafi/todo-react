import Image from "../components/Image";
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from '@mui/icons-material/Category';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button } from "@mui/material";
import TaskItem from "../components/TaskItem";
import { useEffect, useState } from "react";
import PopupMenu from "../components/PopupMenu";
import CircleIcon from '@mui/icons-material/Circle';
import DeleteModal from "../components/DeleteModal";
import AddTaskModal from "../components/AddTaskModal";
import { openDB } from 'idb';
import BottomSheet from "../components/BottomSheet";
import Exit from '../assets/images/block_install.png'
const icon = "/assets/favicon.png"

type TaskType = {
  id: number,
  title: string,
  description: string,
  category: string,
  isDone: boolean,
}

enum StateSort {
  All,
  Done,
  NotDone
}

const Home = () => {
  const [stateSortItem, setStateSortItem] = useState<StateSort>(StateSort.All);
  const [categorySelected, setCategorySelected] = useState<string>('');

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [openBottomSheetDelete, setOpenBottomSheetDelete] = useState(false);

  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const [itemTitleModal, setItemTitleModal] = useState<string>('');
  const [editItemTitle, setEditItemTitle] = useState<string>('');
  const [editItemDescription, setEditItemDescription] = useState<string>('');
  const [editItemCategory, setEditItemCategory] = useState<string>('');
  const [editItemId, setEditItemId] = useState<number>(0);
  const [editItemIsDone, setEditItemIsDone] = useState<boolean>(false);

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickCategory = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (item: string) => {
    setCategorySelected(item)
  }

  useEffect(() => {
    if (categorySelected == '') return

    const getAllByCategory = async () => {
      const db = await openDB('todo', 1);
      const initialTasks = await db.getAll('tasks');

      let state = '';
      if (stateSortItem == StateSort.Done) {
        state = 'Done';
      } else if (stateSortItem == StateSort.NotDone) {
        state = 'NotDone';
      } else {
        state = 'All'
      }

      setTasks(
        initialTasks.filter((task) => {
          if (categorySelected == 'همه' && state != 'All') {
            return task.isDone == (state == 'Done' ? true : false)
          } else if (state == 'All' && categorySelected != 'همه') {
            return task.category == categorySelected
          } else if (state != 'All' && categorySelected != 'همه') {
            return task.category == categorySelected && task.isDone == (state == 'Done' ? true : false)
          } else {
            return initialTasks
          }
        })
      )
    }

    getAllByCategory()
  }, [categorySelected])

  const handleClickDeleteAll = () => {
    setOpenDeleteModal(true)
  }

  const handleDeleteAll = async () => {
    setOpenDeleteModal(false)
    const db = await openDB('todo', 1);
    db.clear('tasks');
    setTasks([]);
  }

  const handleClickAddTask = () => {
    setItemTitleModal('افزودن کار جدید')
    setEditItemTitle('')
    setEditItemDescription('')
    setEditItemCategory('')
    setEditItemId(0)
    setEditItemIsDone(false)
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

  const handleUpdateTask = async (id: number, title: string, description: string, category: string, isDone: boolean) => {
    setOpenAddTaskModal(false)

    setEditItemTitle('')
    setEditItemDescription('')
    setEditItemCategory('')
    setEditItemId(0)
    setEditItemIsDone(false)

    const db = await openDB('todo', 1);
    const updatedTask: TaskType = { id: id, title: title, description: description, category: category, isDone: isDone };
    await db.put('tasks', updatedTask);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );
    setTasks(updatedTasks);
  }

  const handleClickTasks = async () => {
    const db = await openDB('todo');
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

  const handleItemSort = async (state: StateSort) => {
    setStateSortItem(state)

    const db = await openDB('todo', 1);
    const initialTasks = await db.getAll('tasks');

    let stateSort = '';
    if (state == StateSort.Done) {
      stateSort = 'Done';
    } else if (state == StateSort.NotDone) {
      stateSort = 'NotDone';
    } else {
      stateSort = 'All'
    }

    const categoryState = categorySelected == '' ? 'همه' : categorySelected

    setTasks(
      initialTasks.filter((task) => {
        if (categoryState == 'همه' && stateSort != 'All') {
          return task.isDone == (stateSort == 'Done' ? true : false)
        } else if (stateSort == 'All' && categoryState != 'همه') {
          return task.category == categoryState
        } else if (stateSort != 'All' && categoryState != 'همه') {
          return task.category == categoryState && task.isDone == (stateSort == 'Done' ? true : false)
        } else {
          return initialTasks
        }
      })
    )
  }

  return (
    <div className="w-full h-screen flex flex-row overflow-hidden">
      <PopupMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        menuItems={
          [
            { title: 'اولویت خیلی کم', icon: <CircleIcon className={`text-red-500 p-0.5 rounded-full border-purple-500 border-solid ${categorySelected === 'اولویت خیلی کم' ? 'border' : 'border-0'}`} /> },
            { title: 'اولویت کم', icon: <CircleIcon className={`text-orange p-0.5 rounded-full border-purple-500 border-solid ${categorySelected === 'اولویت کم' ? 'border' : 'border-0'}`} /> },
            { title: 'اولویت متوسط', icon: <CircleIcon className={`text-amber-500 p-0.5 rounded-full border-purple-500 border-solid ${categorySelected === 'اولویت متوسط' ? 'border' : 'border-0'}`} /> },
            { title: 'اولویت بالا', icon: <CircleIcon className={`text-lime-500 p-0.5 rounded-full border-purple-500 border-solid ${categorySelected === 'اولویت بالا' ? 'border' : 'border-0'}`} /> },
            { title: 'اولویت خیلی بالا', icon: <CircleIcon className={`text-teal-500 p-0.5 rounded-full border-purple-500 border-solid ${categorySelected === 'اولویت خیلی بالا' ? 'border' : 'border-0'}`} /> },
            { title: 'همه', icon: <CircleIcon className={`text-green-500 p-0.5 rounded-full border-purple-500 border-solid ${categorySelected === 'همه' ? 'border' : 'border-0'}`} /> },
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
        id={editItemId}
        titleModal={itemTitleModal}
        title={editItemTitle}
        description={editItemDescription}
        category={editItemCategory}
        isDone={editItemIsDone}
        open={openAddTaskModal}
        setOpen={setOpenAddTaskModal}
        submitBtnOnClick={(id, title, description, category, isDone) => {
          if (editItemTitle == '' || editItemDescription == '' || editItemCategory == '' || editItemId == 0) {
            handleAddTask(title, description, category)
          } else {
            handleUpdateTask(id, title, description, category, isDone)
          }
        }}
      />

      <BottomSheet
        id={deleteItemId}
        icon={<Image url={Exit} alt='logout-icon' className='size-[50px] sm:size-[70px] md:size-[90px] lg:size-[110px]' />}
        title='آیا از حذف این کار اطمینان دارید؟'
        open={openBottomSheetDelete}
        setOpen={setOpenBottomSheetDelete}
        yesBtnText='بله'
        yesBtnOnClick={async (id) => {
          setOpenBottomSheetDelete(false)
          setDeleteItemId(0);
          const db = await openDB('todo', 1);
          await db.delete('tasks', id);
          const updatedTasks = tasks.filter((task) => task.id !== id);
          setTasks(updatedTasks);
        }}
        noBtnText='خیر'
        noBtnOnClick={() =>
          setOpenBottomSheetDelete(false)
        }
        canDismiss={true}
      />

      <div className="flex-1 h-full flex flex-col items-center justify-start bg-slate-200">
        <h1 className="text-5xl font-bold px-8 py-4 animated rubberBand">
          مدیریت کارها
        </h1>

        {/* Filters */}
        <div className="w-full flex flex-row items-center justify-between mt-16 px-8 py-4">
          <div className="flex flex-row gap-4 items-center justify-center">
            <Button
              variant={`${stateSortItem == StateSort.NotDone ? 'contained' : 'outlined'}`}
              sx={{
                fontFamily: 'vazir-medium'
              }}
              onClick={() => handleItemSort(StateSort.NotDone)}
            >
              انجام نشده
            </Button>
            <Button
              variant={`${stateSortItem == StateSort.Done ? 'contained' : 'outlined'}`}
              sx={{
                fontFamily: 'vazir-medium'
              }}
              onClick={() => handleItemSort(StateSort.Done)}
            >
              انجام شده
            </Button>
            <Button
              variant={`${stateSortItem == StateSort.All ? 'contained' : 'outlined'}`}
              sx={{
                fontFamily: 'vazir-medium'
              }}
              onClick={() => handleItemSort(StateSort.All)}
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
                    onDeleteClick={() => {
                      setDeleteItemId(item.id)
                      setOpenBottomSheetDelete(true)
                    }}
                    onEditClick={() => {
                      setItemTitleModal('بروزرسانی کار مورد نظر')
                      setEditItemTitle(item.title)
                      setEditItemDescription(item.description)
                      setEditItemCategory(item.category)
                      setEditItemId(item.id)
                      setEditItemIsDone(item.isDone)
                      setOpenAddTaskModal(true)
                    }}
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