import {calendar_height, item_height} from "./Calendar";

// TODO move to separate file
const colorShade = (col, amt) => {
    col = col.replace(/^#/, '')
    if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]

    let [r, g, b] = col.match(/.{2}/g);
    ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])

    r = Math.max(Math.min(255, r), 0).toString(16)
    g = Math.max(Math.min(255, g), 0).toString(16)
    b = Math.max(Math.min(255, b), 0).toString(16)

    const rr = (r.length < 2 ? '0' : '') + r
    const gg = (g.length < 2 ? '0' : '') + g
    const bb = (b.length < 2 ? '0' : '') + b

    return `#${rr}${gg}${bb}`
}

function Entry({event, column_count, column_index, column_span, update_pos}) {
    let start_minutes = event.start.getHours() * 60 + event.start.getMinutes();
    let end_minutes = event.end.getHours() * 60 + event.end.getMinutes();
    let height_p_min = calendar_height / 1440;
    let top_px = start_minutes * height_p_min;
    let height_px = (end_minutes - start_minutes) * height_p_min;

    let span = 100 / column_count;
    let left = span * column_index;
    let width = column_span * span;

    let style = {
        top: top_px + 'px',
        height: height_px + 'px',
        left: left + '%',
        width: width + '%'
    }

    let style2 = {
        borderLeftColor: colorShade(event.color, -40),
        borderLeftWidth: '5px',
        backgroundColor: event.color
    };

    return (
        <div className="w-full absolute border-b border-b-transparent box-border" style={style}>
            <div className="w-full rounded-md h-full text-xs text-neutral-800 p-1 box-border cursor-pointer overflow-hidden" style={style2} onClick={(e) => {
                e.stopPropagation();
                let rect = e.currentTarget.getBoundingClientRect();

                let x = (rect.right + window.scrollX + 350) > window.innerWidth ? rect.left - 350 - 5 : rect.right + 5;

                update_pos({
                    top: rect.top + 5,
                    right: x,
                    event: event,
                })
            }}>
                <div className="font-bold truncate">Termin</div>
                <div className="truncate overflow-hidden">Description</div>
            </div>
        </div>
    );
}

function createEvents(events, update_pos) {

    let sorted = events.sort((a,b) => {
       if (a.start > b.start) {
           return 1;
       }
       if (a.start < b.start) {
           return -1;
       }
       if (a.end > b.end) {
           return -1;
       }
       if (a.end < b.end) {
           return 1;
       }
       return 0;
    });

    let list = [];
    let last = undefined;
    let arr = [];

    for (let i = 0; i < sorted.length; ++i) {
        let current = sorted[i];

        if (last <= current.start) {
            last = undefined;
            list.push(arr);
            arr = [];
        }

        arr.push(current);
        if (last === undefined || current.end > last) {
            last = current.end;
        }
    }
    list.push(arr);

    let items = [];

    list.forEach((events) => {
        let columns = [];

        for (let i = 0; i < events.length; ++i) {
            let placed = false;
            let event = events[i];

            for (let j = 0; j < columns.length; ++j) {
                let column = columns[j];
                let last = column[column.length - 1];

                if (last.end <= event.start) {
                    column.push(event);
                    placed = true;
                    break;
                }
            }

            if (!placed) {
                columns.push([event]);
            }
        }

        for (let i = 0; i < columns.length; ++i) {
            columns[i].forEach((event) => {
                let col_count = get_col_count(event, i, columns);
                items.push(
                    <Entry key={event.start.valueOf() + '-' + i} event={event} column_count={columns.length} column_index={i} column_span={col_count} update_pos={update_pos}/>
                );
            });
        }
    });

    return items;
}

function get_col_count(event, col, columns) {
    let col_count = 1;
    for (let i = col + 1; i < columns.length; i++) {
        let column = columns[i];
        for (let j = 0; j < column.length; ++j) {
            let e = column[j];
            if (event.start < e.end && event.end > e.start) {
                return col_count;
            }
        }
        col_count++;
    }
    return col_count;
}

export default function CalendarColumn({update_pos}) {
    let background_image = 'linear-gradient(0deg, rgb(64 64 64) 2%, transparent 2%, transparent 100%)';
    let background_size = item_height + 'px ' + item_height + 'px';
    let style = {backgroundImage: background_image, backgroundSize: background_size, height: calendar_height};

    let items = [];

    let colors = ['#bdda87',
        '#ec938b',
        '#8cbbd2',
        '#d7ca8f'];

    for (let i = 0; i < 4; ++i) {
        let s_hour = i * 2;
        let s_minutes = (i % 2) * 30;
        let e_hour = s_hour + i;
        let e_minutes = ((i + 1) % 2) * 30;

        items.push({
            start: new Date(2023, 2, 1, s_hour, s_minutes, 0),
            end: new Date(2023, 2, 1, e_hour, e_minutes, 0),
            color: colors[i]
        });
    }

    let array = createEvents(items, update_pos);

    return (
        <div className="grow border-l border-neutral-700 pr-3" style={style}>
            <div className="h-full w-full relative">
                {array}
            </div>
        </div>
    );
}