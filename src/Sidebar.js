import {
    CalendarDays,
    FileBadge,
    GraduationCap,
    HelpCircle,
    Inbox,
    Settings,
    Terminal,
} from 'lucide-react'
import { animated, useTransition } from 'react-spring'
import IconButton from "./inputs/button/IconButton";

export default function Sidebar({ opened, set_panel }) {
    const transition = useTransition(opened, {
        from: {
            width: '0',
        },
        enter: {
            width: '13rem',
        },
        leave: {
            width: '0',
        },
        config: {
            tension: 287,
            friction: 30,
            precision: 0.005,
        },
    })

    return (
        <div
            className={
                'h-full flex flex-shrink-0 overflow-hidden transition duration-200 ' +
                (opened ? 'bg-dp-04' : '')
            }
        >
            <div className="h-full w-11 border-r border-dp-12 z-20 text-neutral-300 flex flex-col items-center gap-2 py-2">
                <IconButton onClick={() => set_panel(1)}>
                    <Inbox size={18} />
                </IconButton>
                <IconButton onClick={() => set_panel(2)}>
                    <GraduationCap size={18} />
                </IconButton>
                <IconButton onClick={() => set_panel(3)}>
                    <CalendarDays size={18} />
                </IconButton>
                <IconButton onClick={() => set_panel(4)}>
                    <Terminal size={18} />
                </IconButton>
                <IconButton onClick={() => set_panel(5)}>
                    <FileBadge size={18} />
                </IconButton>
                <div className="grow" />
                <IconButton>
                    <HelpCircle size={18} />
                </IconButton>
                <IconButton>
                    <Settings size={18} />
                </IconButton>
            </div>

            {transition((style, item) =>
                item ? (
                    <animated.div
                        style={style}
                        className={
                            'overflow-hidden items-center gap-5 h-full border-r border-dp-12 z-50 text-neutral-300 flex flex-col ' +
                            (opened ? '' : 'border-opacity-0')
                        }
                    ></animated.div>
                ) : (
                    ''
                )
            )}
        </div>
    )
}
