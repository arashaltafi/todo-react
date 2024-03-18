import { Box, Fade, Modal } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import { Dispatch, SetStateAction } from 'react';

interface DeleteModalProps {
    open: boolean,
    title: string,
    description: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
    yesBtnOnClick?: () => void
}

const DeleteModal = (props: DeleteModalProps) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={() => props.setOpen(false)}
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
                        <h2 className='text-3xl font-bold'>{props.title}</h2>
                    </div>
                    <div id='transition-modal-description' className='mt-8'>
                        <h5 className='text-lg'>{props.description}</h5>

                        <div className='flex flex-row items-center justify-center mt-4'>
                            <button className='w-full mx-2 btn-primary text-slate-100 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg md:rounded-xl hover:no-underline' onClick={props.yesBtnOnClick}>بله</button>
                            <button className='w-full mx-2 btn-error text-slate-100 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg md:rounded-xl hover:no-underline' onClick={() => props.setOpen(false)}>خیر</button>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    )
}

export default DeleteModal