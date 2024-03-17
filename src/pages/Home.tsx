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
import { useState } from "react";
import PopupMenu from "../components/PopupMenu";

const Home = () => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState<boolean>(false)

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

  }

  const handleClickAddTask = () => {

  }

  return (
    <div className="w-full h-screen flex flex-row overflow-hidden">
      <PopupMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        menuItems={['نظرات']}
        onClickMore={(item) => handleCloseMenu(item)}
      />

      <div className="flex-1 h-full flex flex-col items-center justify-start bg-slate-200">
        <h1 className="text-5xl font-bold px-8 py-4">
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
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                return (
                  <TaskItem
                    key={index}
                    title={`عنوان ${item}`}
                    description={`لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. ${item}`}
                    category={`دسته بندی ${item}`}
                    checked={checked}
                    setChecked={setChecked}
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
          className="size-[200px] rounded-full border-2 border-purple-500 border-solid"
        />
        <div className="w-full flex-1 flex items-center justify-center flex-col gap-8">
          <div className="w-full flex flex-row items-center justify-end gap-4 cursor-pointer hover:bg-purple-200 rounded-2xl px-4 py-2 group transition-all duration-150">
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