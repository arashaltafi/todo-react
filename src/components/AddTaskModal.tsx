import { Box, Fade, FormControl, Modal, TextField, Tooltip } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch } from 'react-redux';
import snackBarSlice from '../redux/snackBarSlice';

interface AddTaskModalProps {
    open: boolean,
    titleModal: string,
    id: number,
    title: string,
    description: string,
    category: string,
    isDone: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    submitBtnOnClick?: (id: number, title: string, description: string, category: string, isDone: boolean) => void
}

const AddTaskModal = (props: AddTaskModalProps) => {
    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const dispatch = useDispatch();

    useEffect(() => {
        setId(props.id)
        setTitle(props.title)
        setDescription(props.description)
        setCategory(props.category)
    }, [props.open])

    const handleCancel = () => {
        setId(0)
        setTitle('')
        setDescription('')
        props.setOpen(false)
    }

    const handleSubmit = () => {
        if (title === '') {
            dispatch(snackBarSlice.actions.setSnackBar({
                isOpen: true,
                message: 'لطفا عنوان را تکمیل کنید',
                type: 'error'
            }))
        } else if (description === '') {
            dispatch(snackBarSlice.actions.setSnackBar({
                isOpen: true,
                message: 'لطفا توضیحات را تکمیل کنید',
                type: 'error'
            }))
        } else if (category === '') {
            dispatch(snackBarSlice.actions.setSnackBar({
                isOpen: true,
                message: 'لطفا دسته بندی را انتخاب کنید',
                type: 'error'
            }))
        } else {
            setId(0)
            setTitle('')
            setDescription('')
            setCategory('')
            props.submitBtnOnClick && props.submitBtnOnClick(id, title, description, category, props.isDone)
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={handleCancel}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            className='bg-slate-500/50 select-none'
        >
            <Fade in={props.open}>
                <Box
                    dir='rtl'
                    className='bg-slate-700 text-white px-8 py-4 w-[90%] md:w-[70%] lg:w-[50%] xl:w-[30%] m-auto rounded-xl absolute left-1/2 top-1/2 border border-solid border-black shadow-xl shadow-slate-900 dark:shadow-slate-100 -translate-x-1/2 -translate-y-1/2'
                >
                    <div id='transition-modal-title'>
                        <h2 className='text-3xl font-bold pt-2'>{props.titleModal}</h2>
                    </div>
                    <div id='transition-modal-description' className='mt-6'>
                        <div className='w-[90%] mx-auto flex items-center justify-center mt-8'>
                            <FormControl
                                component="form"
                                sx={{
                                    marginTop: 6,
                                    width: "100%",
                                    textAlign: 'center',
                                    '.MuiInputLabel-root': {
                                        backgroundColor: '#F1F5F9',
                                        color: '#0F172A',
                                        fontFamily: 'vazir-normal',
                                        fontSize: '18px',
                                        paddingRight: '12px',
                                        paddingLeft: '12px',
                                        borderRadius: '10px'
                                    },
                                    '.MuiInputBase-root': {
                                        '&.Mui-focused': {
                                            '& fieldset': {
                                                borderColor: '#0EA5E9',
                                            }
                                        },
                                        '&:hover .MuiInputLabel-root': {
                                            color: '#0EA5E9',
                                        }
                                    },
                                    '.MuiInputBase-input': {
                                        textAlign: 'center',
                                        color: '#F1F5F9',
                                        padding: '16px',
                                        paddingTop: '22px',
                                        fontSize: '22px',
                                        fontFamily: 'vazir-normal'
                                    },
                                    '& fieldset': {
                                        borderColor: '#F1F5F9',
                                        borderRadius: '10px',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#0EA5E9',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#0EA5E9',
                                    },
                                    '.MuiOutlinedInput-root': {
                                        borderColor: '#F1F5F9',
                                        '&:hover fieldset': {
                                            borderColor: '#0EA5E9',
                                        },
                                    },
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#F1F5F9',
                                    },
                                    '.MuiOutlinedInput-input': {
                                        color: '#F1F5F9',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0EA5E9',
                                    },
                                    '&:active .MuiOutlinedInput-root, &:active .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0EA5E9',
                                    },
                                    '&:focus-within .MuiOutlinedInput-root, &:focus-within .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0EA5E9',
                                    },
                                    '@media (max-width: 768px)': {
                                        '.MuiInputBase-input': {
                                            padding: '8px',
                                            paddingTop: '16px',
                                            fontSize: '20px'
                                        },
                                        '.MuiInputLabel-root': {
                                            fontSize: '16px',
                                            paddingRight: '10px',
                                            paddingLeft: '10px',
                                        }
                                    },
                                    '@media (max-width: 640px)': {
                                        '.MuiInputBase-input': {
                                            padding: '6px',
                                            paddingTop: '8px',
                                            fontSize: '16px'
                                        },
                                        '.MuiInputLabel-root': {
                                            fontSize: '14px',
                                            paddingRight: '6px',
                                            paddingLeft: '6px',
                                        }
                                    },
                                    '@media (max-width: 480px)': {
                                        '.MuiInputBase-input': {
                                            padding: '6px',
                                            paddingTop: '6px',
                                            fontSize: '14px'
                                        },
                                        '.MuiInputLabel-root': {
                                            fontSize: '12px',
                                            paddingRight: '4px',
                                            paddingLeft: '4px',
                                        }
                                    },
                                }}
                                noValidate
                                variant="outlined"
                                autoComplete="off"
                            >
                                <TextField
                                    className='w-full'
                                    label="عنوان"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type='text'
                                    multiline
                                    autoComplete="off"
                                    rows={1}
                                    inputProps={{
                                        maxLength: 30
                                    }}
                                />

                                <TextField
                                    className='w-full'
                                    label="توضیحات"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type='text'
                                    multiline
                                    autoComplete="off"
                                    rows={10}
                                    inputProps={{
                                        maxLength: 200
                                    }}
                                    sx={{
                                        marginTop: 2
                                    }}
                                />
                            </FormControl>
                        </div>
                        <div className='flex flex-row items-center justify-center mt-6 gap-3'>
                            <Tooltip TransitionComponent={Fade} title='اولویت خیلی کم' placement="top">
                                <div onClick={() => setCategory('اولویت خیلی کم')}>
                                    <CircleIcon
                                        className={`text-red-500 cursor-pointer p-0.5 rounded-full border-purple-500 border-solid ${category === 'اولویت خیلی کم' ? 'border' : 'border-0'}`}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip TransitionComponent={Fade} title='اولویت کم' placement="top">
                                <div onClick={() => setCategory('اولویت کم')}>
                                    <CircleIcon
                                        className={`text-orange cursor-pointer p-0.5 rounded-full border-purple-500 border-solid ${category === 'اولویت کم' ? 'border' : 'border-0'}`}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip TransitionComponent={Fade} title='اولویت متوسط' placement="top">
                                <div onClick={() => setCategory('اولویت متوسط')}>
                                    <CircleIcon
                                        className={`text-amber-500 cursor-pointer p-0.5 rounded-full border-purple-500 border-solid ${category === 'اولویت متوسط' ? 'border' : 'border-0'}`}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip TransitionComponent={Fade} title='اولویت بالا' placement="top">
                                <div onClick={() => setCategory('اولویت بالا')}>
                                    <CircleIcon
                                        className={`text-lime-500 cursor-pointer p-0.5 rounded-full border-purple-500 border-solid ${category === 'اولویت بالا' ? 'border' : 'border-0'}`}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip TransitionComponent={Fade} title='اولویت خیلی بالا' placement="top">
                                <div onClick={() => setCategory('اولویت خیلی بالا')}>
                                    <CircleIcon
                                        className={`text-green-500 cursor-pointer p-0.5 rounded-full border-purple-500 border-solid ${category === 'اولویت خیلی بالا' ? 'border' : 'border-0'}`}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                </div>
                            </Tooltip>
                        </div>
                        <div className='flex flex-row items-center justify-center mt-12'>
                            <button className='w-full mx-2 btn-primary text-slate-100 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg md:rounded-xl hover:no-underline' onClick={handleSubmit}>ثبت</button>
                            <button className='w-full mx-2 btn-error text-slate-100 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg md:rounded-xl hover:no-underline' onClick={handleCancel}>انصراف</button>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    )
}

export default AddTaskModal