import { SwipeableDrawer } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

interface BottomSheetProps {
    id: number,
    anchor?: 'bottom' | 'top' | 'left' | 'right'
    title: string
    icon?: JSX.Element
    yesBtnText?: string
    yesBtnOnClick: (id: number) => void
    noBtnText?: string
    noBtnOnClick: () => void
    children?: React.ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    canDismiss?: boolean
}

const BottomSheet = (props: BottomSheetProps) => {

    const handleClose = () => {
        //close
        props.canDismiss && props.setOpen(false)
    }

    const handleOpen = () => {
        //open
    }

    return (
        <SwipeableDrawer
            anchor={props.anchor || 'bottom'}
            open={props.open}
            onClose={handleClose}
            onOpen={handleOpen}
        >
            {
                props.children
                    ? props.children
                    :
                    <div className='pt-4 pb-8 w-full flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-700'>
                        {props.icon && props.icon}
                        <h2 className='mt-5 sm:mt-6 md:mt-8 text-sm sm:text-lg md:text-xl lg:text-2xl text-black dark:text-white'>{props.title}</h2>
                        <div className='py-4 mt-3 sm:mt-4 md:mt-6 lg:mt-8 flex w-full items-center justify-center gap-4 text-center overflow-hidden'>
                            {
                                props.noBtnText &&
                                <button className='w-full mx-2 btn-error text-slate-100 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg md:rounded-xl hover:no-underline' onClick={props.noBtnOnClick}>
                                    {props.noBtnText}
                                </button>
                            }
                            {
                                props.yesBtnText &&
                                <button className='w-full mx-2 btn-primary text-slate-100 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg md:rounded-xl hover:no-underline' onClick={() => props.yesBtnOnClick(props.id)}>
                                    {props.yesBtnText}
                                </button>
                            }
                        </div>
                    </div>
            }
            {props.children}
        </SwipeableDrawer>
    )
}

export default BottomSheet