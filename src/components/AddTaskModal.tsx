import { Box, Fade, FormControl, Modal, TextField } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import { Dispatch, SetStateAction, useState } from 'react';

interface AddTaskModalProps {
    open: boolean,
    title: string,
    description: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
    submitBtnOnClick?: () => void
}

const AddTaskModal = (props: AddTaskModalProps) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleCancel = () => {
        setTitle('')
        setDescription('')
        props.setOpen(false)
    }

    const handleSubmit = () => {
        setTitle('')
        setDescription('')
        props.submitBtnOnClick && props.submitBtnOnClick()
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
            className='bg-slate-500/50'
        >
            <Fade in={props.open}>
                <Box
                    dir='rtl'
                    className='bg-slate-700 text-white px-8 py-4 w-[90%] md:w-[70%] lg:w-[50%] xl:w-[30%] m-auto rounded-xl absolute left-1/2 top-1/2 border border-solid border-black shadow-xl shadow-slate-900 dark:shadow-slate-100 -translate-x-1/2 -translate-y-1/2'
                >
                    <div id='transition-modal-title'>
                        <h2 className='text-3xl font-bold pt-2'>{props.title}</h2>
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
                        <div className='flex flex-row items-center justify-center mt-8'>
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